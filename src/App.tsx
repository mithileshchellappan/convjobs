import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useAction,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { useRef, useState } from "react";

export default function App() {
  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Convex + React (Vite) + Clerk Auth
      </h1>
      <Authenticated>
        <SignedIn />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </main>
  );
}

function uploadImage() {

}

function SignedIn() {
  const {user} = useUser()
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const generateUploadUrl = useMutation(api.utils.generateUploadUrl);
  const addResume = useMutation(api.resume.addResume);
  const getUserResumes = useQuery(api.resume.getResumesOfUser, {user: user?.primaryEmailAddress?.emailAddress || ""}) || []

  return (
    <>
      <p>Welcome {user?.firstName}!</p>
      <p className="flex gap-4 items-center text-white">
        This is you:
        {user?.emailAddresses[0].emailAddress}
      </p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <input 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="file" id="file" ref={inputFile} onChange={(event) => {
       if(event.target && event.target.files) {
        event.stopPropagation();
        event.preventDefault();
         setSelectedFile(event.target.files[0]);
        }}} />
        
      </p>
      <p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!selectedFile}
        onClick={async () => {
          if (selectedFile) {
            const postUrl = await generateUploadUrl();
            const response = await fetch(postUrl, {
              method: "POST",
              headers: { "Content-Type": selectedFile.type },
              body: selectedFile,
            });
            const {storageId} = await response.json()
            console.log("storageId",storageId)
            await addResume({
              name: selectedFile.name,
              url: postUrl,
              uploadedUser: user?.primaryEmailAddress?.emailAddress ?? "",
              storageId
            })
          }
        }}
      >
        Upload
      </button>
      </p>
      {
        getUserResumes.map((resume:any) => {
          return (
            <div key={resume.storageId} className="flex gap-4 items-center">
              <a href={resume.url} target="_blank" rel="noreferrer">{resume.name}</a>
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={resume.url} target="_blank" rel="noreferrer"
              >👁️</a>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  await fetch(resume.url, {
                    method: "DELETE"
                  });
                }}
              >
                🗑️
              </button>
            </div>
          )
        })
      }
    </>
  );
}
