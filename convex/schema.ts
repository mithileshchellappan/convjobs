// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    resumes: defineTable({
      name: v.string(),
      url: v.string(),
      uploadedUser: v.string(),
      storageId: v.id("_storage"),
      embeddingId: v.optional(v.id("resumeEmbeddings"))
    }).index("byUser",["uploadedUser"] )
      .index("byEmbedding",["embeddingId"])
    ,
    resumeEmbeddings: defineTable({
      embedding: v.array(v.number()),
      text: v.string()
    }).vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
    }),
    messages: defineTable({
      sessionId: v.string(),
      message: v.object({
        type: v.string(),
        data: v.object({
          content: v.string(),
          role: v.optional(v.string()),
          name: v.optional(v.string()),
          additional_kwargs: v.optional(v.any()),
        }),
      }),
    }).index("bySessionId", ["sessionId"]),   
  },
  { schemaValidation: true }
);
