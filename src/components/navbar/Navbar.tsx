import { useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import { useClerk } from "@clerk/clerk-react";

const Header = () => {
  let navigate = useNavigate();
  const {signOut} = useClerk()

  return (
    <div className="p-4 pl-24 pr-24 flex justify-between items-center bg-black text-red">
      <div onClick={() => navigate("/dashboard")}>
        <Logo />
      </div>

      <div className="flex gap-12">
        <a
          href="#"
          className="group  transition duration-300"
          onClick={() => navigate("/profile")}
        >
          Profile
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
        </a>

        <a
          href="#"
          className="group  transition duration-300"
          onClick={() => navigate("/about")}
        >
          How it works?
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
        </a>

        {/* TODO - Implement Logout Logic */}
        <button
          className="group  transition duration-300"
          // onClick={() => signOut(() => navigate("/"))}
          onClick={() => {
            signOut().then(() => navigate("/login"))
          }}
        >
          Logout
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-400"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
