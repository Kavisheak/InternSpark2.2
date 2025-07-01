import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiUser } from "react-icons/fi";
import CompanyNavbar from "./CompanyNavbar";
import "./Company.css";
import "./CompanyHome.css";
import Footer from "./Footer";
import ForCompanies from "./ForCompanies";
import TalktoUs from "./TalktoUs";
const CompanyHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen all-bg">
      <CompanyNavbar />
      <div className="min-h-screen mt-48">
        {/* Title */}
        <div className="flex flex-col w-full mt-6 ">
          <p className="pl-16 mb-6 text-2xl font-semibold text-white">
            Welcome !
          </p>
          <h1 className="relative z-10 text-6xl font-bold text-white pl-14 md:text-7xl">
            Build Powerful Teams, <br />
            <p className="pt-4 text-5xl ">Drive Real Impact.</p>
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex pt-3 pl-16 mt-10 mb-64">
          <button
            className="flex items-center justify-center w-40 px-6 py-4 font-semibold text-white transition-colors border rounded-lg backdrop-blur-md bg-white/20 hover:bg-white/30 border-white/40"
            onClick={() => navigate("/company/internships")}
          >
            Get Started
            <FiArrowRight className="ml-2" />
          </button>

          <button
            className="flex items-center justify-center w-40 px-6 py-3 ml-10 font-semibold text-white transition-colors border rounded-lg backdrop-blur-md bg-white/20 hover:bg-white/30 border-white/40"
            onClick={() => navigate("/company/profile")}
          >
            <FiUser className="mr-2" />
            My Profile
          </button>
        </div>

        <div className="flex w-full h-screen ">
          {/* Left Side - White Background */}
          <div className="flex items-center justify-center w-1/2 p-10 bg-white">
           
            <div className="max-w-3xl px-6 py-20 bg-white">
              <p className="mb-3 text-lg font-semibold tracking-wider text-blue-800 uppercase">
                Intern Spark
              </p>
              <h2 className="mb-6 text-6xl font-extrabold leading-tight text-gray-900">
                Empower your company with top student talent
              </h2>
              <p className="text-lg text-gray-500">
                Discover a pool of skilled, motivated interns ready to
                contribute to your organization. Post internships, manage
                applications, and connect with future professionals — all from
                one place.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-1/2 h-full">
            <img
              src="https://bouqs.com/blog/wp-content/uploads/2024/10/shutterstock_2239596681.jpg"
              alt="Team"
              className="object-cover w-full h-full"
            />
            {/* Optional black overlay */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        </div>

        {/* for companies */}
        <ForCompanies/>

        <div className="flex w-full h-screen">
          {/* Left Side - Image */}
          <div className="relative w-1/2 h-full">
            <img
              src="https://i.pinimg.com/736x/1a/14/81/1a1481072f6dc7b125b7fa5676b1261a.jpg"
              alt="Team"
              className="object-cover w-full h-full"
            />
            {/* Optional black overlay */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>

          {/* Right Side - White Background */}
          <div className="flex items-center justify-center w-1/2 p-10 bg-white">
            <div class="px-6 py-16 bg-gray-50">
              <p class="text-sm font-semibold tracking-widest text-blue-800 uppercase mb-2">
                About
              </p>
              <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                We help companies connect with <br />
                talented and motivated interns.
              </h1>
              <p class="mt-6 text-lg text-gray-600 max-w-3xl">
                Internship Hub simplifies your hiring process by providing
                access to a pool of skilled students and recent graduates.
                Whether you’re a startup or a large enterprise, we help you find
                interns who are eager to contribute, learn, and grow with your
                company. Post openings, review applications, and onboard
                candidates — all in one platform designed to support your team's
                growth.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center h-screen mt-0 bg-transparent my-gradient-div d-bg">
          <h1 className="text-5xl font-bold leading-tight text-center text-white">
            Empowering Futures with Exceptional <br />
            Internship Opportunities...
          </h1>

          <p className="absolute w-full px-4 text-xl text-center text-white bottom-24">
            "Start your journey with us today"
          </p>
        </div>
           
           {/* Talk To Us */}
           <TalktoUs/>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyHome;
