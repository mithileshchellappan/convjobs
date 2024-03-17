import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../../convex/_generated/api";
import { Authenticated, useAction, useQuery } from "convex/react";
import ResumeCard from "./components/resume-cards";
import {UserResult} from "@/interface/UserResume";
import ChatBox from "./components/chat-box";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const signedInUser = useUser();
  let navigate = useNavigate();
  useEffect(() => {
    if(!signedInUser.isSignedIn){
      navigate('/login')
    }
  }, []);
  const {user} = signedInUser;

  // TODO - Search implementation for the Dashboard
  let [searchResult, setSearchResult] = useState<[]>();
  let [searchQuery, setSearchQuery] = useState<string | null>("");

  const getUserResumes =
    useQuery(api.resume.getResumesOfUser, {
      user: user?.primaryEmailAddress?.emailAddress || "",
    }) || [];

  const searchResumes = useAction(api.resume.searchResume)

  const [resume, setResume] = useState<UserResult | null>(null);

  useEffect(() => {
    console.log(user?.emailAddresses[0].emailAddress);
  }, []);

  return (
    <Authenticated>
      <div className="min-h-screen ">
        <Navbar />
        <Fade in={true} timeout={1000}>
          <div className="my-12 container">
            <h1>Welcome {user?.firstName}</h1>
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
                  className="block w-full p-4 my-8 ps-10 text-sm  border border-gray-700 rounded-lg bg-dark-background focus:border-gray-200 focus:outline-none focus:ring-0 transition duration-700"
                  placeholder="Search Resumes, Users, Techstacks..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log(searchQuery)
                      if (searchQuery && searchQuery?.length > 0) {
                        searchResumes({ query: searchQuery })
                          .then((resumes) => {
                            console.log(resumes.length,resumes)
                            setSearchResult(resumes)
                          })
                      }
                    }
                  }}
                  required
                />
                <button
                  type="submit"
                  className="cursor-pointer text-white absolute end-2.5 bottom-2.5 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 font-medium rounded-lg text-sm px-4 py-2 "
                  onClick={async () => {
                    console.log(searchQuery)
                    if (searchQuery && searchQuery?.length > 0) {
                      const resumes = await searchResumes({ query: searchQuery })
                      setSearchResult(resumes)
                    }
                  }}
                  disabled={!searchQuery || searchQuery.length === 0}
                >
                  Search
                </button>
              </div>
            </div>
            {searchResult ? (
              getUserResumes.map((resume: UserResult) => {
                return <ResumeCard resume={resume} setResume={setResume} />;
              })
            ) : (
              <div className="text-center flex-col h-96 flex justify-center items-center px-4 py-8">
                <h3>
                  Search for users based on your requirement to filter out
                </h3>
                <p className="text-sm text-muted-foreground">
                  Search for terms like "Full Stack Developer", "Business Analyst"
                </p>
              </div>
            )}

            {
              resume && (
                <div className="fixed bottom-0 left-0 right-0">
                  <ChatBox resume={resume} />
                </div>
              )
            }
          </div>
        </Fade>
      </div>
    </Authenticated>
  );
};

export default Dashboard;
