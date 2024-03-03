import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { embedPDF } from "./pdf";
import { internal } from "./_generated/api";
import { embedTexts } from "./ingest/embed";

export const addResume = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    uploadedUser: v.string(),
    storageId: v.id("_storage")
  },
  handler: async (ctx, {name, url, uploadedUser, storageId}) => {
    // const preExistingResume = await ctx.db.query("resumes")
    //                                       .filter(q=>q.eq(q.field("uploadedUser"),uploadedUser))
    //                                       .collect()
    const result = await ctx.db.insert("resumes", {name, url, uploadedUser, storageId});
    await ctx.scheduler.runAfter(0, internal.resume.generateAndAddEmbedding, {
        resumeId: result,
        storageId
      });
  }
});

export const getResumesOfUser = query({
  args:{
    user: v.string()
  },
  handler: async (ctx, {user}) => {
    var resumes = await ctx.db
    .query("resumes")
    .filter(q => q.eq(q.field("uploadedUser"),user))
    .collect()
    
    await Promise.all(
      resumes.map(async (resume:typeof resumes[0]) => {
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
  handler: async (ctx, {query}) => {
      const embed = await embedTexts(query)
      const results = await ctx.vectorSearch("resumeEmbeddings","by_embedding",{
          vector: embed[0],
          limit: 16
      })
      const rows = await ctx.runQuery(internal.resume.fetchSearchResult, {results})
      rows.sort((a,b) => b._score - a._score)
      console.log("rows",rows)
  }
})

export const generateAndAddEmbedding = internalAction({
    args: { resumeId: v.id("resumes"),storageId: v.id("_storage")},
    handler: async (ctx, args) => {
      const {embeddings, texts} = await ctx.runAction(internal.pdf.embedPDF,{storageId: args.storageId})
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

  export const fetchSearchResult = internalQuery({
    args: {
        results: v.array(v.object({ _id: v.id("resumeEmbeddings"), _score: v.float64() })),
      },
      handler: async (ctx, args) => {
        const out = []
        for(const result of args.results){
            const doc = await ctx.db.query("resumes").withIndex("byEmbedding", (q) => 
            q.eq("embeddingId", result._id)
            ).first()
            if(!doc) continue;
            out.push({
                _id: doc._id,
                _score: result._score,
                // uploadedUser: doc.uploadedUser,
                // storageId: doc.storageId,
                // url: doc.url,
                name: doc.name,
            })
         }
         return out
      }
  })

  export const getResumeText = internalQuery({
    args: {
      resumeEmbeddingId: v.id("resumeEmbeddings")
    },
    handler: async (ctx, {resumeEmbeddingId}) => {
      const embedding = await ctx.db.get(resumeEmbeddingId)
      return embedding ? embedding.text : ""
    }
  })
