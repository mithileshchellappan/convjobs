import React, { useEffect } from "react";
import { Button, Fade } from "@mui/material";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useNavigate } from "react-router-dom";
import MyFooter from "@/components/footer/footer";
import ConvLogo from "../../assets/logo.png";

const Login: React.FC = () => {
  let navigate = useNavigate();
  const user = useUser()
  useEffect(() => {
    console.log(user.isSignedIn, user.isLoaded)
    if (user.isSignedIn && user.isLoaded) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <Unauthenticated>
      <div className="flex justify-center min-h-screen max-h-screen relative overflow-hidden">
        <Fade in={true} timeout={1000}>
          <div className="container flex justify-center items-center">
            <img
              src={ConvLogo}
              className="h-56 opacity-25 absolute -right-12 -top-12"
            />

            <div className="w-1/2 ">
              <p className="text-7xl">Find your Job</p>
              <p className="mt-12 text-xl text-gray-400">
                A perfect place to explore millions of profile to<br></br> pick
                the right fit for your job
              </p>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center bg-dark-background py-12 rounded-lg font-light">
              <h3 className="my-4 text-center w-96">
                Signin to access millions of profiles with instant search using
                AI
              </h3>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-gray-900 bg-white border mt-4 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-light rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Sign in
                </button>
              </SignInButton>
            </div>
          </div>
        </Fade>
        <div className="fixed bottom-0 w-full left-0">
          <MyFooter />
        </div>
      </div>
    </Unauthenticated>
  );
};

export default Login;
