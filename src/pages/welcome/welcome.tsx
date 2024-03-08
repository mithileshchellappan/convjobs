import React from "react";
import placeholder from "../../assets/placeholder.jpg";
import { Fade } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pl-24 pr-24 pt-12 h-screen text-black ">
        <Fade in={true} timeout={1000}>
          <div>
            <div className="bg-secondary bg-opacity-90   p-4 mb-2 rounded">
              <h1 className=" w-fit border-b-[1px] mb-6">
                Welcome to FindWork
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

            <h1 className="mt-4 p-12 text-center border-t-2 border-gray-200">Choose your role</h1>
            <div className="two-cards flex justify-around items-center container">
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
                onClick={() => console.log("hios")}
              >
                <h1 className="">Job Seeker</h1>
                <p className=" text-lg mt-4 w-2/3 text-center">
                  Upload your resume and look let the job finders contact you
                  for your desired role
                </p>
              </div>
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
                onClick={() => console.log("hi")}
              >
                <h1 className="">Hire People</h1>
                <p className=" text-lg mt-4 w-2/3 text-center">
                  Find millions of users with your suitable role and knowledge you require
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
