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
      "If you are a job seeker searching for the right job or a recruiter looking for the right candidate the internet right now might not be the ideal place for it as it is polluted with lots of websites, where you are required to enter multiple fields which feels like an endless chore, and job seekers might not necessarily find your ideal job and recruiters may have to choose between endless candidates, who might not be the ideal job - candidate fit.",
    subContent:"ConvJobs eliminates this by utilizing the predominantory source of information, the user’s resume. We use Convex to analyze the resume and provide a seamless experience for the users aka you to find the right job or the right candidate.",
      position: "left",
    image: one,
  },
  {
    title: "How it works?",
    content:
      "As Job seekers/Candidates you can submit your resumes to ConvJobs, and we tokenise and store it in our database. As a recruiter, you can search for your ideal candidate by listing the relevant keywords and skills that you are looking for.",
       subContent: "Once you as a recruiter have searched for a role, we produce a list of the perfect/ ideal candidates fit for the role based on their resumes submitted into the database, the candidates are ranked based on their skills and experiences and things relevant to the job search, once as a recruiter you choose a candidate, our application’s built-in AI-powered chatbot helps you interact with the resume for details and insights about the candidate given by our chatbot based off the resume.",
       position: "right",
    image: two,
  },
  {
    title: "How does it help as a candidate?",
    subContent:
      "As a candidate you also receive insights on the resumes submitted which you can use to enhance and further improve your resume, you can also access the chat history i.e. when the recruiter has interacted with your resume using our app’s AI chatbot.",
    content: "Your resume is the forefront for data about you. Recruiters can search for you based on your skills and experiences..",

    position: "left",
    image: three,
  },
  {
    title: "How is Convex used?",
    content:
      "Convex sits at the forefront of ConvJobs. our system stores the resumes in the object storage provided by Convex and utilizes Convex-Langchain to tokenize the resume. Utilizing Vector Search provided by Convex enables recruiters to be matched with the most eligible candidates.",
      subContent: "Using Convex's integration with Langchain we can seamlessly connect the resume and OpenAI's GPT enabling recruiters to chat with the candidate's resume. Since everything is handled by Convex there is no need for any Websockets for instant updates.",
      position: "right",
    image: four,
  },
  {
    title: "What's next?",
    subheading: "We have a lot going forward for the future of ConvJobs!",
    content: "・Starting with an in-house resume generator that adheres to the industry standards of resumes \n.・AI based tests for the candidate to check their skillsets.",
    subContent: "・Using Convex's scheduler to send periodic updates and insights to candidates. \n・Live Chat between the recruiter and the candidate.",
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
