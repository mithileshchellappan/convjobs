import { v } from "convex/values";
import { action, internalAction, mutation } from "./_generated/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { internal } from "./_generated/api";
import { ChatMistralAI } from "@langchain/mistralai"
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { BufferMemory } from "langchain/memory";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const chatWithPdf = action({
    args: {
        query: v.string(),
        resumeEmbeddingId: v.id("resumeEmbeddings"),
    },
    handler: async (ctx, { query, resumeEmbeddingId }) => {

        const resumeText = await ctx.runMutation(internal.resume.getResumeText, { resumeEmbeddingId })

        const model = new ChatOpenAI({
            modelName: "gpt-4",
        })

        const prompt = PromptTemplate.fromTemplate(`You are a helpful bot that guides people on questions asked on a individual's resume. If asked for details on the resume, you will provide the details or say the details are unavailable. If the questions are asked about their github page, fetch the github link from the resume and search for the details asked on the resume's github link. Do not go overboard. Never say that you are unable to do a function because you are an AI. Try to figure out as much as possible or give an generic answer. Try to keep the responses as short as possible. The resume in text form is ${resumeText}. The queries are as follows {query}`)
        const runnable = prompt.pipe(model)
        const response = await runnable.invoke({ query })
        
        console.log(response.content)
    }
})

export const answer = internalAction({
    args: {
      sessionId: v.string(),
      message: v.string(),
      resumeEmbeddingId: v.id("resumeEmbeddings"),
    },
    handler: async (ctx, { sessionId, message,resumeEmbeddingId }) => {
      const vectorStore = new ConvexVectorStore(new OpenAIEmbeddings(), { ctx });
      
      const model = new ChatOpenAI({ modelName: "gpt-4" });
      const chatHistory = new ConvexChatMessageHistory({ sessionId, ctx })
      if((await chatHistory.getMessages()).length === 0){
        const resumeText = await ctx.runMutation(internal.resume.getResumeText, { resumeEmbeddingId })
        await chatHistory.addUserMessage("You are a helpful bot that guides people on questions asked on a individual's resume. If asked for details on the resume, you will provide the details or say the details are unavailable. If the questions are asked about their github page, fetch the github link from the resume and search for the details asked on the resume's github link. Do not go overboard. Never say that you are unable to do a function because you are an AI. Try to figure out as much as possible or give an generic answer. Try to keep the responses as short as possible.")
        await chatHistory.addUserMessage("The resume of the person in text form is "+resumeText)
    }
      const memory = new BufferMemory({
        chatHistory,
        memoryKey: "chat_history",
        outputKey: "text",
        returnMessages: true,
      });
      const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        { memory }
      );
  
      await chain.call({ question: message });
    },
  });
