import { Id } from "convex/_generated/dataModel";

interface UserResult {
    _id: Id<"resumes">;
    _creationTime: number;
    embeddingId?: Id<"resumeEmbeddings"> | undefined;
    name: string;
    url: string;
    uploadedUser: string;
    storageId: Id<"_storage">;
  }

  export default UserResult;