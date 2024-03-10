import React from "react";
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";

import { Fade } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import MyFooter from "@/components/footer/footer";

const About: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="text-white">
        <h2 className="m-16 text-center text-4xl ">HEADING OF APPLICATION</h2>

        <Fade in={true} timeout={1000}>
          <section className="p-0">
            <div className="mb-16 flex flex-wrap bg-dark-background p-12">
              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={one} className="w-full" />
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

            <div className="mb-16 flex flex-wrap bg-dark-background p-12">
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
                  <img src={two} className="w-full" />
                </div>
              </div>
            </div>

            <div className="mb-16 flex flex-wrap bg-dark-background p-12">
              <div className="w-1/2 flex justify-center items-center">
                <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                  <img src={three} className="w-full" />
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

            <div className="mb-16 flex flex-wrap bg-dark-background p-12">
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
                  <img src={four} className="w-full" />
                </div>
              </div>
            </div>
          </section>
        </Fade>
        <MyFooter />
      </div>
    </>
  );
};

export default About;
