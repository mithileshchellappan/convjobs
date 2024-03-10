import { useEffect, useState } from "react";
import { BeakerIcon } from "@heroicons/react/24/solid";
import MyIcon from "../../../assets/aiicon.png";

const ChatBox: React.FC = () => {
  const [hideChat, setHideChat] = useState<boolean>(true);

  return (
    <div className="w-1/3 flex flex-col border bg-dark-background border-x-gray-700 border-top-gray-700 rounded-sm shadow-md  absolute end-0 bottom-0">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center">
          <img
            className="rounded-full w-7 mr-2"
            src={MyIcon}
/>
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
            className="inline-flex hover:bg-indigo-50 rounded-full p-2"
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
          {/* Chat box area */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <div className="flex items-center mb-4">
              <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                <img
                  className="rounded-full w-10 h-10"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <a href="#" className="block text-xs hover:underline">
                  John Doe
                </a>
              </div>
              <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>

                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              </div>
            </div>

            <div className="flex items-center flex-row-reverse mb-4">
              <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                <img
                  className="rounded-full w-10 h-10"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <a href="#" className="block text-xs hover:underline">
                  Jesse
                </a>
              </div>
              <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit.
                </div>

                <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                <img
                  className="rounded-full w-10 h-10"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <a href="#" className="block text-xs hover:underline">
                  John Doe
                </a>
              </div>
              <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>

                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              </div>
            </div>
          </div>
          {/* Input Area */}
          <div className="flex items-center border-t p-2">
            <div>
              <button
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full mx-2">
              <input
                className="w-full rounded-full border border-gray-200"
                type="text"
                value=""
                placeholder="Aa"
                autoFocus
              />
            </div>

            <div>
              <button
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
