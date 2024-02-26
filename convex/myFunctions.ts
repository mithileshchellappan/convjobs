import { v } from "convex/values";
import { query, mutation, action, internalQuery } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";
import { embedTexts } from "./ingest/embed";

// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// export const addResume = mutation({
//   args: {
//     name: v.string(),
//     url: v.string(),
//     uploadedUser: v.string(),
//     storageId: v.id("_storage")
//   },
//   handler: async (ctx, {name, url, uploadedUser, storageId}) => {
//     const preExistingResume = await ctx.db.query("resumes")
//                                           .filter(q=>q.eq(q.field("uploadedUser"),uploadedUser))
//                                           .collect()
//     const result = await ctx.db.insert("resumes", {name, url, uploadedUser, storageId});

    
//   }
// });

export const embedPDF = action({
  args:{
    storageId: v.id("_storage")
  },
  handler: async (ctx, {storageId}) => {
    const embeddings: any = await ctx.runAction(internal.pdf.embedPDF, {storageId})
    return embeddings
  }
})


// export const getResumesOfUser = query({
//   args:{
//     user: v.string()
//   },
//   handler: async (ctx, {user}) => {
//     var resumes = await ctx.db
//     .query("resumes")
//     .filter(q => q.eq(q.field("uploadedUser"),user))
//     .collect()
    
//     Promise.all(
//       resumes.map(async (resume:typeof resumes[0]) => {
//         resume.url = await ctx.storage.getUrl(resume.storageId) || ""
//       })
//     )

//     console.log("resumes",resumes)
//     return resumes;
//   }
// })

// export const resumeSearch = action({
//   args:{
//     query: v.string()
//   },
//   handler: async (ctx, {query}) => {
//     // console.log("response",response)
//     const [embedding] = await embedTexts(query)
//     // console.log(embedding)
//     const results = await ctx.vectorSearch("documents","byEmbedding",{
//       vector: embedding,
//       limit:16,
//     })
//     console.log("results",results)
//     const rows = await ctx.runQuery(internal.myFunctions.fetchResults, {results})
//     console.log("rows",rows)
//   }
// })

// export const fetchResults = internalQuery({
//   args: {
//     results: v.array(v.object({ _id: v.id("documents"), _score: v.float64() })),
//   },
//   handler: async (ctx, { results }) => {
//     const out = []
//     for (const result of results) {
//       const doc = await ctx.db.get(result._id);
//       if (!doc) {
//         continue;
//       }
//       out.push(doc._id);
//       console.log(doc._id);
     
//     }
//     return out
//   }
// });