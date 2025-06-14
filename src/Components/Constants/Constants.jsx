import { FaRegUser,FaSearch,FaShoppingBag } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { RiUserSearchLine } from "react-icons/ri";
import { IoMegaphone } from "react-icons/io5";

export const cardContents1 = [
    { title: "Find Opportunities", content: "Search and filter through hundreds of internship opportunities that match your skills and interests", icon: <FaSearch /> },
    { title: "Manage Your Profile", content: "Create a standout profile highlighting your skills, experience, and educational background", icon: <FaRegUser /> },
    { title: "Track Applications", content: "Save your favorite internships and keep track of application deadlines and status", icon: <FaShoppingBag /> },
  ];

  export const cardContents2 = [
    { title: "Post Internships", content: "Easily create and share internship listings to connect with students who match your role requirements and organizational goals", icon: <FiFilePlus /> },
    { title: "Browse Candidate Profiles", content: "Search and filter through student profiles to find candidates with the skills, interests, and backgrounds that align with your openings", icon: <RiUserSearchLine /> },
    { title: "Promote Your Brand", content: "Showcase your company culture, values, and opportunities to attract motivated students who align with your mission", icon: <IoMegaphone /> },
  ];