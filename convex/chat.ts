import { v } from "convex/values";
import { action, internalAction, mutation, query } from "./_generated/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { internal } from "./_generated/api";
import { BufferMemory } from "langchain/memory";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";
import { ConversationChain, ConversationalRetrievalQAChain } from "langchain/chains";

export const listMessages = query({
  args:{
      sessionId: v.string()
  },
  handler: async (ctx, {sessionId}) => {
      const messages = await ctx.db.query("messages").filter(q=>q.eq(q.field("sessionId"),sessionId)).collect()
      const returnMessages = messages.map((message: any) => {
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
  args:{
    sessionId: v.string(),
    message: v.string(),
    resumeId: v.id("resumes")
  },
  handler: async (ctx, {sessionId, message, resumeId}) => {
    const resumeEmbeddingId = await ctx.db.query("resumes").filter(q=>q.eq(q.field("_id"),resumeId)).first()
    if(resumeEmbeddingId && resumeEmbeddingId.embeddingId){
      await ctx.scheduler.runAfter(0, internal.chat.answer, {sessionId, message,resumeId})
    }
  }
})

export const answer = internalAction({
    args: {
      sessionId: v.string(),
      message: v.string(),
      resumeId: v.id("resumes"),
    },
    handler: async (ctx, { sessionId, message,resumeId }) => {

      const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
      const chatHistory = new ConvexChatMessageHistory({ sessionId, ctx })
  
      const memory = new BufferMemory({
        chatHistory,
        memoryKey: "chat_history",
        inputKey:"question",
        returnMessages: true,
      });
        const resumeText = await ctx.runQuery(internal.resume.getResumeText, { resumeId })
      const chatPrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a helpful bot that guides people on questions asked on a individual's resume. If asked for details on the resume, you will provide the details or say the details are unavailable. If the questions are asked about their github page, fetch the github link from the resume and search for the details asked on the resume's github link. Do not go overboard. Never say that you are unable to do a function because you are an AI. Try to figure out as much as possible or give an generic answer. Try to keep the responses as short as possible.`
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
        llm:model,
        prompt: chatPrompt,
        memory 
    }
      );
      await chain.invoke({ question: message });
    },
  });
