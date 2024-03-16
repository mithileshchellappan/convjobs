
"use node"
import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import { embedTexts } from "./ingest/embed";

export const embedPDF = internalAction({
    args:{
        storageId: v.id("_storage")
    },
    handler: async (ctx, {storageId}) => {
        const pdf = await ctx.storage.get(storageId)
        console.log(pdf)
        const loader = new PDFLoader(pdf!,{splitPages:false})
        const docs = await loader.load()
        console.log("length",docs.length)
        const texts = docs.map(doc => doc.pageContent)
        const embeddings = await embedTexts(texts.join("\n"))
        return {embeddings, texts: texts.join("\n")}
    }

})