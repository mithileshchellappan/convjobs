import React from "react";
import { Fade } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import MyFooter from "@/components/footer/footer";
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";

interface AboutItem {
  title: string;
  subheading?: string;
  content: string;
  subContent: string;
  position: "left" | "right";
  image: string;
}

const aboutItems: AboutItem[] = [
  {
    title: "What actually is ConvJobs?",
    content:
      "If you are seeking a job or seeking a candidate the internet right now is polluted with lots of websites for it, where you need to enter like a 100 fields each time.",
    subContent: "ConvJobs elminates this by utilizing the predominatory source of information, the resume. We use Convex to analyze the resume and provide a seamless experience for the user to find the right job or the right candidate.",
    position: "left",
    image: one,
  },
  {
    title: "How it works?",
    content:
      "Candidates submit your resume to ConvJobs, and we tokenize it and store it in our database. As a recruiter you can search for your listing with the keywords and the skills that you look for.",
    subContent: "We then produce a list of the perfect candidates from all the resumes that our users have submitted. They are ranked based on the skills and the experience that they have and the recruiter has searched for. Our AI powered chatbot enables the recruiter to chat with the resume for more details and provides with insights on the resume.",
    position: "right",
    image: two,
  },
  {
    title: "How does it help as a candidate?",
    content:
      "As a candidate, you can submit your resume to us and that will be the only source of information that you need to provide. The more detailed the resume, the better the chances of getting hired.",
    subContent: "We will match your resume with the keywords that the recruiter has searched for and provide you with the best matches. You can receive insights on the resume submitted and you can use it to improve your resume even more. You can access the chat history of the recruiter interacting with your resume using our AI powered chatbot.",

    position: "left",
    image: three,
  },
  {
    title: "How is Convex used?",
    content:
      "Convex sits at the forefront of ConvJobs. We store the resumes in the object storage provided by Convex and utilize Convex-Langchain to tokenize the resume and store it. Utilizing Vector Search provided by Convex enables recruiters to be matched with the most eligible candidates.",
    subContent: "Using Convex's integration with Langchain we are able to seamlessly connect the resume and OpenAI's GPT enabling recruiters to chat with the candidate's resume. Since everything is handled by Convex we don't feel a need to utilize any Websockets for instant updates.  ",
    position: "right",
    image: four,
  },
  {
    title: "What's next?",
    subheading: "We have so much in plan for the future of ConvJobs!",
    content: "・Starting with an inhouse resume generator adhering to the industry standards of resumes \n.・AI based tests for the candidate to check their skills.",
    subContent: "・Using Convex's scheduler to send periodic updates to candidates. \n・Live Chat between the recruiter and the candidate.",
    position: "left",
    image: four,
  },
];


const About: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="text-white">
        <h2 className="m-16 text-center text-4xl ">About <span className="text-primary-foreground text-4xl font-bold">ConvJobs</span> and the use of <span className="text-primary-foreground text-4xl font-bold">Convex</span></h2>

        <Fade in={true} timeout={1000}>
          <section className="p-0">
            {aboutItems.map((item, index) => (
              <div
                key={index}
                className={`mb-16 flex flex-wrap bg-dark-background p-12 ${item.position === "left" ? "flex-row" : "flex-row-reverse"
                  }`}
              >
                <div className="w-1/2 flex justify-center items-center">
                  <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                    <img src={item.image} className="w-full" />
                  </div>
                </div>

                <div className="w-6/12 p-12 flex flex-col">
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <div className="flex text-neutral-300 items-center text-sm font-medium">{item.subheading} </div>
                  <p className="mb-6 text-neutral-300"></p>
                  <p className="text-neutral-500 text-xl">{item.content}</p>
                  <br></br>

                  <p className="text-neutral-500 text-xl">{item.subContent}</p>
                </div>
              </div>
            ))}
          </section>
        </Fade>
        <MyFooter />
      </div>
    </>
  );
};

export default About;
