import { useUser } from "@clerk/clerk-react";
import { Modal, Box, Typography, Fade } from "@mui/material";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyFooter from "@/components/footer/footer";

const MyProfile: React.FC = () => {
  const { user } = useUser();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const generateUploadUrl = useMutation(api.utils.generateUploadUrl);
  const addResume = useMutation(api.resume.addResume);
  const getUserResumes =
    useQuery(api.resume.getResumesOfUser, {
      user: user?.primaryEmailAddress?.emailAddress || "",
    }) || [];

  // TODO - Fetch user resume and display it in the bottom
  // The getUserResumes displays all the resume, fetch the resume of user alone and display it

  const [myResume, setMyResume] = useState<boolean>(false);
  useEffect(() => {
    console.log(getUserResumes);
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#19191A",
    border: "0.2px solid #fefefe",
    borderRadius: "6px",
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Navbar />
      <Fade in={true} timeout={1000}>
        <div className="container">
          <div className="my-8">
            <h1>{user?.firstName}'s Profile</h1>
          </div>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">My Chats</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    View your account details here and change the uploaded
                    resume if needed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
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
                  <div className="space-y-1 pt-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.fullName!} disabled />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Email</Label>
                    <Input
                      id="username"
                      defaultValue={user?.primaryEmailAddress?.emailAddress}
                      disabled
                    />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Chats</CardTitle>
                  <CardDescription>
                    View all the resume chats over here
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-2">
                  <h3>No Chats</h3>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              className="flex flex-col gap-2 justify-around items-start"
            >
              <div className="mt-4">
              <Typography id="modal-modal-title" variant="h5" component="h2" >
                Upload Resume
              </Typography>

              </div>
              
              <p className="my-4"> {selectedFile && selectedFile!.name}</p>
              <div className="flex justify-end self-end">
                <button className="text-white bg-gray-700 transition hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Close
                </button>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800  transition focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                      addResume({
                        name: selectedFile.name,
                        url: postUrl,
                        uploadedUser:
                          user?.primaryEmailAddress?.emailAddress ?? "",
                        storageId,
                      }).then(() => {
                        setOpen(false);
                      });
                    }
                  }}
                >
                  Upload
                </button>
              </div>
            </Box>
          </Modal>

          <div className="fixed bottom-0 w-full left-0">
            <MyFooter />
          </div>
        </div>
      </Fade>
    </>
  );
};

export default MyProfile;
