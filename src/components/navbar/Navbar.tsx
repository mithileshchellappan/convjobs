const Header = () => {
  //   let navigate = useNavigate();

  return (
    <div className="p-4 pl-24 pr-24 flex justify-between items-center bg-black text-red">
      <h2 onClick={() => console.log()} className="cursor-pointer">
        FindWork
      </h2>
      <h4 onClick={() => console.log()} className="cursor-pointer">
        How it works?
      </h4>
    </div>
  );
};

export default Header;
