import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../../convex/_generated/api";
import { Authenticated, useQuery } from "convex/react";
import ResumeCard from "./components/resume-cards";
import UserResult from "@/interface/UserResume";
import ChatBox from "./components/chat-box";
import { Fade } from "@mui/material";

const Dashboard: React.FC = () => {
  const { user } = useUser();

  // TODO - Search implementation for the Dashboard
  let [searchResult, setSearchResult] = useState<[]>();

  const getUserResumes =
    useQuery(api.resume.getResumesOfUser, {
      user: user?.primaryEmailAddress?.emailAddress || "",
    }) || [];

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
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </div>

            {searchResult ? (
              getUserResumes.map((resume: UserResult) => {
                return <ResumeCard resume={resume} />;
              })
            ) : (
              <div className="text-center h-96 flex justify-center items-center px-4 py-8">
                <h2>
                  Search for users based on your requirement to filter out
                  resumes{" "}
                </h2>
              </div>
            )}

            <ChatBox />
          </div>
        </Fade>
      </div>
    </Authenticated>
  );
};

export default Dashboard;
