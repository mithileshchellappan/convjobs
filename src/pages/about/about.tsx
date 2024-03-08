import React from "react";
import placeholder from "../../assets/placeholder.jpg";
import { Fade } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";

const About: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="text-black">
        <h2 className="m-16 text-center text-4xl ">HEADING OF APPLICATION</h2>

        <Fade in={true} timeout={1000}>
          <section className="p-0">
            <div className="mb-16 flex flex-wrap bg-custom-white p-12">
              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={placeholder} className="w-full" />
                </div>
              </div>

              <div className="w-6/12 p-12 flex flex-col">
                <h3 className="mb-4 text-2xl font-bold">Heading</h3>
                <div className="flex items-center text-sm font-medium">
                  Subheading
                </div>
                <p className="mb-6 text-neutral-500"></p>
                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <br></br>

                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi
                </p>
              </div>
            </div>

            <div className="mb-16 flex flex-wrap bg-custom-white p-12">
              <div className="w-6/12 p-12 flex flex-col">
                <h3 className="mb-4 text-2xl font-bold">Heading</h3>
                <div className="flex items-center text-sm font-medium">
                  Subheading
                </div>
                <p className="mb-6 text-neutral-500"></p>
                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <br></br>

                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{" "}
                </p>
              </div>

              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={placeholder} className="w-full" />
                </div>
              </div>
            </div>

            <div className="mb-16 flex flex-wrap bg-custom-white p-12">
              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={placeholder} className="w-full" />
                </div>
              </div>
              <div className="w-6/12 p-12 flex flex-col">
                <h3 className="mb-4 text-2xl font-bold">Heading</h3>
                <div className="flex items-center text-sm font-medium">
                  Subheading
                </div>
                <p className="mb-6 text-neutral-500"></p>
                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <br></br>
                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="mb-16 flex flex-wrap bg-custom-white p-12">
              <div className="w-6/12 p-12 flex flex-col">
                <h3 className="mb-4 text-2xl font-bold">Heading</h3>
                <div className="flex items-center text-sm font-medium">
                  Subheading
                </div>
                <p className="mb-6 text-neutral-500"></p>
                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>

                <br></br>

                <p className="text-neutral-500 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={placeholder} className="w-full" />
                </div>
              </div>
            </div>
          </section>
        </Fade>
      </div>
    </>
  );
};

export default About;
