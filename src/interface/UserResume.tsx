import { Id } from "convex/_generated/dataModel";

export interface UserResult {
    _id: Id<"resumes">;
    _creationTime: number;
    embeddingId?: Id<"resumeEmbeddings"> | undefined;
    name: string;
    url: string;
    uploadedUser: string;
    storageId: Id<"_storage">;
    tags?: string[] | undefined;
    linkedin?: string | undefined;
    github?: string | undefined;
  }

export interface SessionResume {
  resumeId: Id<"resumes">,
  sessionId: string,
  createdAt: Date,
}