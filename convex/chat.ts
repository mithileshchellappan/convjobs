import { v } from "convex/values";
import { internalAction, mutation, query } from "./_generated/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { internal } from "./_generated/api";
import { BufferMemory } from "langchain/memory";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";
import { ConversationChain } from "langchain/chains";

export const listSessionsWithResumeId = query({
  args: {
    resumeId: v.optional(v.id("resumes"))
  },
  handler: async (ctx, { resumeId }) => {
    try {
      const resumeMessages = await ctx.db.query("messageResumes").filter(q => q.eq(q.field("resumeId"), resumeId)).collect()
      const returnMessages = resumeMessages.map((message: any) => {
        return {
          sessionId: message.sessionId,
          resumeId: message.resumeId,
          createdAt: message._creationTime
        }
      })
      return returnMessages.toReversed()
    } catch (e) {
      return []
    }
  }
})

export const listMessages = query({
  args: {
    sessionId: v.string()
  },
  handler: async (ctx, { sessionId }) => {
    const messages = await ctx.db.query("messages").filter(q => q.eq(q.field("sessionId"), sessionId)).collect()
    const returnMessages: {
      sessionId: string,
      message: string,
      type: string
    }[]
      = messages.map((message: any) => {
        return {
          sessionId: message.sessionId,
          message: message.message.data.content,
          type: message.message.type
        }
      })
    return returnMessages
  }
})

export const chatWithResume = mutation({
  args: {
    sessionId: v.string(),
    message: v.string(),
    resumeId: v.id("resumes")
  },
  handler: async (ctx, { sessionId, message, resumeId }) => {
    const resumeEmbeddingId = await ctx.db.query("resumes").filter(q => q.eq(q.field("_id"), resumeId)).first()
    if (resumeEmbeddingId && resumeEmbeddingId.embeddingId) {
      const resumeMessages = await ctx.db.query("messageResumes").filter(q => q.eq(q.field("sessionId"), sessionId)).collect()
      console.log(resumeMessages)
      if (resumeMessages.length <= 0) {
        await ctx.db.insert("messageResumes", { sessionId, resumeId, isRead: false })
      }
      await ctx.scheduler.runAfter(0, internal.chat.answer, { sessionId, message, resumeId })
    }
  }
})

export const analyzeGithub = internalAction({
  args: {
    githubLink: v.string(),
  },
  handler: async (_, { githubLink }) => {
    const headers = {
      "User-Agent": "convjobs"
    };
    const repos = await fetch(`https://api.github.com/users/${githubLink.split("/")[3]}/repos`, { headers });
    const reposJson = await repos.json()
    var repoData = reposJson.map((repo: any) => {
      return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        watchers: repo.watcher_count,
        license: repo.license,
        isFork: repo.fork,
        stars: repo.stargazers_count,
      }
    })
    repoData = repoData.filter((repo: any) => !repo.isFork)
    return repoData
  }
})


export const answer = internalAction({
  args: {
    sessionId: v.string(),
    message: v.string(),
    resumeId: v.id("resumes"),
  },
  handler: async (ctx, { sessionId, message, resumeId }) => {

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chatHistory = new ConvexChatMessageHistory({ sessionId, ctx })

    const memory = new BufferMemory({
      chatHistory,
      memoryKey: "chat_history",
      inputKey: "question",
      returnMessages: true,
    });
    const resumeText = await ctx.runQuery(internal.resume.getResumeText, { resumeId })
    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a helpful bot that guides people on questions asked on a individual's resume. If asked for details on the resume, you will provide the details or say the details are unavailable. If the questions are asked about their github page, fetch the github link from the resume and search for the details asked on the resume's github link. Do not go overboard. Never say that you are unable to do a function because you are an AI. Try to figure out as much as possible or give an generic answer. Try to keep the responses as short as possible. Use next line (/\n) as much as possible`
      ],
      [
        "system",
        `The resume of the person in text form is "${resumeText.replace(/\n/g, " ")}"`
      ],
      [
        "human",
        "{question}"
      ]
    ])
    const chain = new ConversationChain({
      llm: model,
      prompt: chatPrompt,
      memory
    });
    if(message.startsWith("ANALYZE GITHUB {")){
      const githubLink = message.split("{")[1].split("}")[0]
      const githubData = await ctx.runAction(internal.chat.analyzeGithub, { githubLink })
      await chain.invoke({ question: "Analyze the user's github "+JSON.stringify(githubData) });
    }else{
    await chain.invoke({ question: message });
    }
  },
});
