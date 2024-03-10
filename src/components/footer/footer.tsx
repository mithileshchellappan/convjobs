const MyFooter: React.FC = () => {
    return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-dark-background dark:border-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
        © 2024 
        <a href="https://flowbite.com/" className="hover:underline mx-1">
          ConvJobs.
        </a>
        All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="/about" className="hover:underline me-4 md:me-6 cursor-pointer">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6 cursor-pointer">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6 cursor-pointer">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline cursor-pointer">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default MyFooter;
