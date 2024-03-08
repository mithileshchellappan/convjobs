import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import About from "./pages/about/about";
import Welcome from "./pages/welcome/welcome";
import Dashboard from "./pages/dashboard/dashboard";

export default function App() {
  return (
    <div className="w-full flex flex-col gap-8 bg-white">
      <Authenticated>
      <Welcome />
        <Dashboard />
        <About />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </div>
  );
}


