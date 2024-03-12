import { useEffect, useState } from "react";
import { BeakerIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import MyIcon from "../../../assets/aiicon.png";

const ChatBox: React.FC = () => {
  const [hideChat, setHideChat] = useState<boolean>(true);
  const [chatInput, setChatInput] = useState<string>();

  let handleInput = (e: any) => {
    setChatInput(e.target.value);
  };

  let _handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      console.log("do validate");
      setChatInput(" ");
    }
  };

  return (
    <div className="w-1/3 flex flex-col border bg-dark-background border-x-gray-700 border-top-gray-700 rounded-sm shadow-md  absolute end-0 bottom-0">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center">
          <img className="rounded-full w-7 mr-2" src={MyIcon} />
          <div className="pl-2">
            <div className="font-semibold">
              <a className="hover:underline" href="#">
                Baalavignesh Resume
              </a>
            </div>
            <div className="text-xs text-gray-600">Resume Chat</div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="inline-flex hover:bg-gray-700 transition rounded-full p-2"
            type="button"
            onClick={() => setHideChat(!hideChat)}
          >
            {hideChat ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {!hideChat && (
        <div className="min-h-96">
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {/* TODO - AI RESPONSE HERE */}
            <>
              <div className="flex flex-col justify-start items-start mb-4">
                <div className="flex-none flex justify-center items-center mr-4 pb-2">
                  <img className="rounded-full w-7 mr-2" src={MyIcon} />
                  <p className="text-sm">Convex AI Bot</p>
                </div>
                <div className="flex-1 bg-sky-600 text-white p-2 rounded-lg mb-2 rounded-tl-none">
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </div>
                </div>
              </div>
            </>

            {/* TODO - USER INPUT HERE */}
            <>
              <div className="flex flex-col justify-start items-end mb-4">
                <div className="flex-none flex justify-center items-center mr-4 pb-2">
                  <p className="text-sm mr-4">Baalavignesh A</p>

                  <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-8 h-8 text-gray-400 p-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 bg-sky-100 p-2 rounded-lg mb-2 rounded-tr-none text-black">
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="flex items-center border-t">
            <label
              htmlFor="email"
              className="relative text-gray-400 focus-within:text-gray-600 block w-full"
            >
              <PaperAirplaneIcon className="pointer-events-none w-6 h-6 absolute top-3 right-4 text-sky-500 cursor-pointer " />

              <input
                className="w-full rounded-none text-white p-3 border placeholder-white  focus:rounded-none border-gray-700  bg-dark-background  focus:outline-none focus:ring-0 transition duration-700"
                type="text"
                value={chatInput}
                onChange={handleInput}
                onKeyDown={_handleKeyDown}
                placeholder="Ask insights about the resume"
                autoFocus
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
