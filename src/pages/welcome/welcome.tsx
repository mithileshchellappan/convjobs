import React from "react";
import { Fade } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="pl-24 pr-24 pt-12 max-h-screen ">
        <Fade in={true} timeout={1000}>
          <div>
            <div className="bg-dark-background bg-opacity-90 border border-gray-800 px-4 py-8 mb-2 rounded-lg">
              <h1 className=" w-fit border-b-[1px] border-b-gray-700  mb-6">
                Welcome to ConvJobs
              </h1>
              <p className="mt-4 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>

            <h1 className="mt-4 p-12 text-center ">Choose your role</h1>
            <div className="two-cards flex justify-around items-center container">
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-dark-background cursor-pointer rounded-xl m-4 border border-gray-700 hover:bg-sky-600 transition duration-700"
                onClick={() => navigate("/dashboard")}
              >
                <h1 className="">Job Seeker</h1>
                <p className=" text-lg mt-4 w-2/3 text-center">
                  Upload your resume and look let the job finders contact you
                  for your desired role
                </p>
              </div>
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-dark-background cursor-pointer rounded-xl m-4 border border-gray-700 hover:bg-sky-600 transition duration-700"
                onClick={() => navigate("/dashboard")}
              >
                <h1 className="">Hire People</h1>
                <p className=" text-lg mt-4 w-2/3 text-center">
                  Find millions of users with your suitable role and knowledge
                  you require
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Welcome;
