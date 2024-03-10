import UserResult from "@/interface/UserResume";
import MyIcon from "../../../assets/aiicon.png";
interface ResumeCardProps {
  resume: UserResult; // Assuming UserResult is the correct type for your resumes
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  return (
    <div
      key={resume.storageId}
      className="flex gap-4 justify-between items-center bg-dark-background border-gray-700 border p-4 rounded-lg my-4"
    >
      <a
        href={resume.url}
        target="_blank"
        rel="noreferrer"
        className="font-normal text-xl ml-4"
      >
        {resume.name}
      </a>

      <div className="flex flex-end gap-4">

      <div className="flex gap-4 justify-end">
          <a
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-1.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            href={resume.url}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          {/* <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              await fetch(resume.url, {
                method: "DELETE",
              });
            }}
          >
            🗑️
          </button> */}
        </div>

        
        <button
          className="flex gap-2 text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 transition duration-500 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          type="button"
        >
          <img src={MyIcon} className="w-6" />
          Chat with Resume
        </button>


      </div>
    </div>
  );
};

export default ResumeCard;
