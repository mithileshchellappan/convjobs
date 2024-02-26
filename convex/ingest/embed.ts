import OpenAI from "openai";


export async function embedTexts(texts: string) {
    const openai = new OpenAI();
    
    const { data } = await openai.embeddings.create({
      input: texts,
      model: "text-embedding-3-small",
    });
    return data.map(({ embedding }) => embedding);
  }