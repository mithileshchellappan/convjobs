import { useUser } from "@clerk/clerk-react";
import { Modal, Box, Typography, Fade, Divider, Skeleton } from "@mui/material";
import { api } from "../../../convex/_generated/api";
import { useAction, useMutation, useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MyIcon from "../../assets/aiicon.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyFooter from "@/components/footer/footer";
import { useNavigate } from "react-router-dom";
import { Id } from "convex/_generated/dataModel";
import { SessionResume, UserResult } from "@/interface/UserResume";
import { CardsChat } from "../dashboard/components/chat-window";

const MyProfile: React.FC = () => {
  const signedInUser = useUser();
  const { user } = signedInUser;
  let navigate = useNavigate();
  useEffect(() => {
    if (!signedInUser.isSignedIn) {
      navigate('/login')
    }
  }, []);
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [insightData, setInsightData] = useState<any>(null)
  const [selectedChat, setSelectedChat] = useState<SessionResume | undefined>();
  const [myResume, setMyResume] = useState<UserResult | undefined>();
  const [leftPanelViewType, setLeftPanelViewType] = useState<"chats" | "resumes">("resumes");
  const [openInsight, setOpenInsight] = useState(false);

  const generateUploadUrl = useMutation(api.utils.generateUploadUrl);
  const addResume = useAction(api.resume.addResume);
  const getUserResumes =
    useQuery(api.resume.getResumesOfUser, {
      user: user?.primaryEmailAddress?.emailAddress || "",
    }) || [];
  const getResumeInsights = useAction(api.resume.getResumeInsights);
  const getSessionsWithResumeId = useQuery(api.chat.listSessionsWithResumeId, { resumeId: myResume?._id });

  useEffect(() => {
    console.log(getUserResumes, user?.primaryEmailAddress?.emailAddress)
    if (getUserResumes.length > 0) {
      setMyResume(getUserResumes[0]);
    }
  }, [getUserResumes]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Navbar />
      <Fade in={true} timeout={1000}>
        <div className="container">
          {/*ROOT*/}
          <div className="flex">
            <div>
              <div className="my-8">
                <h1>{user?.firstName}'s Profile</h1>
              </div>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account" onClick={() => setLeftPanelViewType("resumes")}>Account</TabsTrigger>
                  <TabsTrigger value="password" onClick={() => setLeftPanelViewType("chats")}>My Chats</TabsTrigger>
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
                      {AddResumeButton()}
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
                        Select a chat below to view the messages
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-2">
                      {
                        getSessionsWithResumeId && getSessionsWithResumeId?.length > 0 ? getSessionsWithResumeId?.map((session: SessionResume , index: number) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSelectedChat(session);
                            }}
                            className="mb-4 grid grid-cols-[25px_1fr]  overflow-y-scroll no-scrollbar items-start pb-4 last:mb-0 last:pb-0 cursor-pointer"
                          >
                            <span className={`flex h-2 w-2 translate-y-1 rounded-full ${session.sessionId === selectedChat?.sessionId ? "bg-sky-500" : ""}`} />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {`Chat on ${new Date(session.createdAt).toLocaleDateString()}`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Unread
                              </p>
                            </div>
                          </div>

                            )) : (<p>No Chats Found</p>)
                      }
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

            </div>
            <div className="mt-[110px] mx-10 w-[110vh] h-[70vh]">
              {leftPanelViewType === "resumes" && (
              
                myResume ? (
                  <UserResumeCard />
                ) :
                    <div className="flex flex-col w-[100%] h-[60%] items-center justify-center">
                      <h1 className="text-l font-medium leading-none">
                        No Resume Found
                      </h1>
                      <h2 className="text-m text-muted-foreground">
                        Please add a resume to your profile
                      </h2>
                    </div>              
              )}
              {
                leftPanelViewType === "chats" && (
                  (
                    selectedChat ? myResume && (<CardsChat session={selectedChat} resume={myResume} isProfileView />) : <div className="flex flex-col w-[100%] h-[60%] items-center justify-center">
                    <h1 className="text-l font-medium leading-none">
                      No chat selected
                    </h1>
                    <h2 className="text-m text-muted-foreground">
                      Select a chat to view the messages
                    </h2>
                  </div> 
                )
                )
              }
            </div>
          </div>

          <div className="fixed bottom-0 w-full left-0">
            <MyFooter />
          </div>
        </div>
      </Fade>
    </>
  );

  function AddResumeButton() {
    return <div className="space-y-1">
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
        } } />
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
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
        Add Resume
      </label>
    </div>;
  }

  function UserResumeCard(): React.ReactNode {
    return <Card className="w-[100%] h-[100%]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h2>Your Resume</h2>
            <Dialog open = {openInsight} onOpenChange={setOpenInsight}>
              <DialogTrigger>
                <button
                  className="flex gap-2 text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 transition duration-500 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                  type="button"
                  onClick={async () => {
                    setOpenInsight(true);
                    const resumeInsights = await getResumeInsights({ resumeId: myResume!._id  });
                    setInsightData(resumeInsights);
                  } }
                >
                  <img src={MyIcon} className="w-6" />
                  Get Resume Insights
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[50%] p-x-10" >
                <DialogHeader>
                  <DialogTitle>Resume Insights</DialogTitle>
                  <DialogDescription>
                    Use these insights to level up your resume!
                  </DialogDescription>
                </DialogHeader>
                {insightData ? insightData?.improvements.map((improvement: { emoji: string; content: string; }) => (
                  <p>{improvement.emoji} {improvement.content}</p>
                )
                ) : <div className="flex items-center justify-center space-x-4">
                  <Skeleton className="h-[20px] w-[250px]">Loading</Skeleton>
                </div>
                  }
              </DialogContent>
            </Dialog>


          </div>
        </CardTitle>
        <iframe className="rounded max-h" src={myResume?.url + "#toolbar=0"} width="100%" height="550px">
        </iframe>
      </CardHeader>
    </Card>;
  }
};

export default MyProfile;


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