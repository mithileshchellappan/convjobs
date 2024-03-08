import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Modal, Box, Typography, Button } from "@mui/material";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const generateUploadUrl = useMutation(api.utils.generateUploadUrl);
  const addResume = useMutation(api.resume.addResume);
  const getUserResumes =
    useQuery(api.resume.getResumesOfUser, {
      user: user?.primaryEmailAddress?.emailAddress || "",
    }) || [];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="min-h-screen ">
      <Navbar />

      <div className="text-black my-12 container">
        <div className="flex justify-between">
          <h1>
            Welcome {user?.firstName}, {user?.emailAddresses[0].emailAddress}!
          </h1>
          <input
            className="hidden"
            type="file"
            id="file"
            ref={inputFile}
            onChange={(event) => {
              if (event.target && event.target.files) {
                event.stopPropagation();
                event.preventDefault();
                setSelectedFile(event.target.files[0]);
                handleOpen();
              }
            }}
          />
          <label
            htmlFor="file"
            className="flex gap-4 justify-center items-center focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            Add Resume
          </label>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="text-black "
        >
          <Box sx={style} className="flex flex-col gap-2 justify-around items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Resume
            </Typography>

            <p className="my-4">{selectedFile && selectedFile!.name}</p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={!selectedFile}
                onClick={async () => {
                  if (selectedFile) {
                    const postUrl = await generateUploadUrl();
                    const response = await fetch(postUrl, {
                      method: "POST",
                      headers: { "Content-Type": selectedFile.type },
                      body: selectedFile,
                    });
                    const { storageId } = await response.json();
                    console.log("storageId", storageId);
                    await addResume({
                      name: selectedFile.name,
                      url: postUrl,
                      uploadedUser:
                        user?.primaryEmailAddress?.emailAddress ?? "",
                      storageId,
                    });
                  }
                }}
              >
                Upload
              </button>
          </Box>
        </Modal>
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 my-8 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-gray-50  "
              placeholder="Search Resumes, Users, Techstacks..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </div>

        {getUserResumes.map((resume: any) => {
          return (
            <div key={resume.storageId} className="flex gap-4 items-center">
              <a href={resume.url} target="_blank" rel="noreferrer">
                {resume.name}
              </a>
              <a
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                href={resume.url}
                target="_blank"
                rel="noreferrer"
              >
                👁️
              </a>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  await fetch(resume.url, {
                    method: "DELETE",
                  });
                }}
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
