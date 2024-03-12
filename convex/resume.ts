import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { embedTexts } from "./ingest/embed";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createOpenAIFnRunnable, createStructuredOutputRunnable } from "langchain/chains/openai_functions";
import { ChatPromptTemplate } from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

export const addResume = action({
  args: {
    name: v.string(),
    url: v.string(),
    uploadedUser: v.string(),
    storageId: v.id("_storage")
  },
  handler: async (ctx, { name, url, uploadedUser, storageId }) => {
    // const preExistingResume = await ctx.db.query("resumes")
    //                                       .filter(q=>q.eq(q.field("uploadedUser"),uploadedUser))
    //                                       .collect()
    const result = await ctx.runMutation(internal.resume.insertResume, { name, url, uploadedUser, storageId });
    await ctx.runAction(internal.resume.generateAndAddEmbedding, {
      resumeId: result,
      storageId
    });
    await ctx.runAction(internal.resume.generateAndAddTags, { resumeId: result })
  }
});

export const insertResume = internalMutation({
  args: {
    name: v.string(),
    url: v.string(),
    uploadedUser: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { name, url, uploadedUser, storageId }) => {
    return await ctx.db.insert("resumes", { name, url, uploadedUser, storageId });
  },
});

export const getResumeInsights = action({
  args:{
    resumeId: v.id("resumes")
  },
  handler: async (ctx, {resumeId}) => {
    const resumeText = await ctx.runQuery(internal.resume.getResumeText, {resumeId})
    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });

    const chatPrompt = ChatPromptTemplate.fromTemplate("You are a helpful bot that guides people on how to improve their resume. You can provide feedback on the resume, suggest improvements, and answer questions about the resume. You can also provide general advice on how to improve a resume. Provide in json format with the following keys 'improvements':['emoji':'','content':'']. Provide only json do not provide any identations. Your output should be able to be passed through a JSON parser. Do not use any escape characters. Provide emoji without fail each one should be unique. The user's resume text is {resume}")

    const chain = chatPrompt.pipe(model)

    const response = await chain.invoke({resume: resumeText})
    console.log(JSON.parse(response.content as string))
  }
})


export const getResumesOfUser = query({
  args: {
    user: v.string()
  },
  handler: async (ctx, { user }) => {
    var resumes = await ctx.db
      .query("resumes")
      .filter(q => q.eq(q.field("uploadedUser"), user))
      .collect()

    await Promise.all(
      resumes.map(async (resume: typeof resumes[0]) => {
        resume.url = await ctx.storage.getUrl(resume.storageId) || ""
      })
    )
    return resumes;
  }
})

export const searchResume = action({
  args: {
    query: v.string()
  },
  handler: async (ctx, { query }) => {
    const embed = await embedTexts(query)
    const results = await ctx.vectorSearch("resumeEmbeddings", "by_embedding", {
      vector: embed[0],
      limit: 16
    })
    const rows: any = await ctx.runQuery(internal.resume.fetchSearchResult, { results })
    rows.sort((a: any, b: any) => b._score - a._score)
    return rows
  }
})

export const generateAndAddEmbedding = internalAction({
  args: { resumeId: v.id("resumes"), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const { embeddings, texts } = await ctx.runAction(internal.pdf.embedPDF, { storageId: args.storageId })
    await ctx.runMutation(internal.resume.addEmbedding, {
      resumeId: args.resumeId,
      embedding: embeddings[0],
      text: texts
    });
  },
});

export const addEmbedding = internalMutation({
  args: { resumeId: v.id("resumes"), embedding: v.array(v.number()), text: v.string() },
  handler: async (ctx, args) => {
    const resume = await ctx.db.get(args.resumeId);
    if (resume === null) {
      // No movie to update
      return;
    }
    const embeddingId = await ctx.db.insert("resumeEmbeddings", {
      embedding: args.embedding,
      text: args.text
    });
    await ctx.db.patch(args.resumeId, {
      embeddingId,
    });
  },
});

export const generateAndAddTags = internalAction({
  args: { resumeId: v.id("resumes") },
  handler: async (ctx, { resumeId }) => {
    const response: any = await ctx.runAction(internal.resume.generateTags, { resumeId })
    if(response.linkedin.length > 0 && !response.linkedin.startsWith('https://')) response.linkedin = "https://" + response.linkedin
    if(response.github.length > 0 && !response.github.startsWith('https://')) response.github = "https://" + response.github
    if(response.tags.length > 0 && response.linkedin && response.github){
      await ctx.runMutation(internal.resume.addTags, { resumeId, tags: response.tags, linkedin: response.linkedin, github: response.github })
      return
    }else{
      await ctx.scheduler.runAfter(0, internal.resume.generateAndAddTags, { resumeId })
    }
  }
})

export const addTags = internalMutation({
  args: {resumeId: v.id("resumes"), tags: v.array(v.string()),linkedin: v.string(),github: v.string() },
  handler: async (ctx, { resumeId, tags,linkedin,github }) => {
    await ctx.db.patch(resumeId, { tags,linkedin,github })
  }
})

export const generateTags = internalAction({
  args: { resumeId: v.id("resumes"), },
  handler: async (ctx, { resumeId }) => {
    const resumeText = await ctx.runQuery(internal.resume.getResumeText, { resumeId })
    const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const jsonSchema = {
      type: "object",
      properties: {
        github: {
          title: "The GitHub link from the resume",
          description: "The GitHub link from the resume. Empty string if not available. Do not provide with N/A or other strings. Only empty string if not available.",
          type: "string",
        },
        linkedin: {
          title: "The LinkedIn link from the resume",
          description: "The LinkedIn link from the resume.Empty string if not available. Do not provide with N/A or other strings. Only empty string if not available.",
          type: "string",
        },
        tags: {
          title: "The tags from the resume",
          description: "Intelligent tags in array format based on the resume. For example a person is based on finance provide tags like 'Accounting', 'Finance', 'Banking' etc based on their resume. Only from their resume not autogenerated. Limited to top 4.",
          type: "array",
          items:{
            type:"string"
          }
        },
      },
      required:["tags","github","linkedin"]
    }

    const openAISchema = {
      name: "get_resume_tags_and_details",
      description: "Get tags and details from a resume",
      parameters: jsonSchema
    }

    const outputParser = new JsonOutputFunctionsParser();
    const prompt = ChatPromptTemplate.fromMessages([
      ["human", "Resume in text format: {resumeText}"],
    ])

    const runnable = createOpenAIFnRunnable({
      functions: [openAISchema],
      llm,
      prompt,
      outputParser,
    })

    const result = await runnable.invoke({ resumeText })
    return result
  }
})

export const fetchSearchResult = internalQuery({
  args: {
    results: v.array(v.object({ _id: v.id("resumeEmbeddings"), _score: v.float64() })),
  },
  handler: async (ctx, args) => {
    const out = []
    for (const result of args.results) {
      const doc = await ctx.db.query("resumes").withIndex("byEmbedding", (q) =>
        q.eq("embeddingId", result._id)
      ).first()
      if (!doc) continue;
      out.push({
        _id: doc._id,
        _score: result._score,
        uploadedUser: doc.uploadedUser,
        storageId: doc.storageId,
        url: await ctx.storage.getUrl(doc.storageId),
        name: doc.name,
        tags: doc.tags,
        linkedin: doc.linkedin,
        github: doc.github
      })
    }
    return out
  }
})

export const getResumeText = internalQuery({
  args: {
    resumeId: v.id("resumes")
  },
  handler: async (ctx, { resumeId }) => {
    const resumeEmbeddingId = (await ctx.db.get(resumeId))?.embeddingId 
    if(!resumeEmbeddingId) return ""
    const embedding = await ctx.db.get(resumeEmbeddingId)
    return embedding ? embedding.text : ""
  }
})
