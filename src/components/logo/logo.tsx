import ConvLogo from "../../assets/logo.png";


const Logo: React.FC = () => {
    return (
        <div className="flex gap-4 justify-center items-center">
              <img src={ConvLogo} className="h-10 cursor-pointer"  ></img>
      <h2 className="cursor-pointer mb-1">
        ConvJobs
      </h2>
        </div>
    )
}

export default Logo;