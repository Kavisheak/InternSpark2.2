import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiUser } from "react-icons/fi";
import "./CompanyHome.css";
import emp1 from "../../../assets/emp1.png";
import girlemp from "../../../assets/grl.png";
import CompanyNavbar from "../CompanyNavbar";
import ForCompanies from "./ForCompanies";
import ImageSlider from "./ImageSlider";
import TalktoUs from "./TalktoUs";
import Footer from "../Footer";

const CompanyHome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen font-sans text-gray-900 bg-white ">
      <CompanyNavbar />

      <main className="px-4 md:px-0 mt-44 fade-in-up ">
        {/* Title Section */}

        <section className="relative px-4 mx-auto mb-20 -mt-16 md:mb-20 max-w-7xl sm:px-0">
          {/* Image */}
          <div className="absolute right-0 hidden -mt-20 translate-x-10 md:block">
            
            
            <div className="overflow-hidden w-fit h-fit">
              <img
                src={emp1}
                alt="Team"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="max-w-2xl pt-0 -mt-32 md:mt-0">
            
            <div className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-orange-500 bg-orange-100 rounded-full">
              #1 Internship Platform
            </div>
            <p className="mb-3 text-lg font-medium text-gray-600">
              Your growth partner
            </p>
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-[#01165A] md:text-6xl">
              Build Powerful Teams,
              <br />
              <span className="block mt-2 text-4xl font-bold text-orange-500 md:text-5xl">
                Drive Real Impact.
              </span>
            </h1>
            <p className="mb-10 text-lg text-gray-700">
              Discover and manage top internship candidates that fit your
              company’s mission and culture.
            </p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition bg-[#ED6A2C] rounded-lg shadow-md animate-pulse hover:bg-[#cf4f14]"
                onClick={() => navigate("/company/internships")}
              >
                Get Started <FiArrowRight size={20} />
              </button>
              <button
                className="flex items-center gap-2 px-8 py-4 font-semibold text-[#01165A] bg-white border border-[#01165A] rounded-lg hover:bg-[#f5f7fb]"
                onClick={() => navigate("/company/profile")}
              >
                <FiUser size={20} />
                My Profile
              </button>
            </div>
            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-[#01165A]">50K+</h3>
                <p className="text-gray-600">Active Students</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#01165A]">2K+</h3>
                <p className="text-gray-600">Partner Companies</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#01165A]">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Left-Right Content Block 1 */}
        <section className="flex flex-col-reverse items-center justify-center py-20 mx-auto -mb-2 bg-white md:flex-row md:px-0 max-w-7xl">
          {/* Right - Image */}
          <div className="relative h-full overflow-hidden md:w-1/2 group">
            <img
              src={girlemp}
              alt="GirlEmployee"
              className="object-cover w-full h-full transition-transform duration-500 transform "
            />
          </div>
          {/* Left - Text */}
          <div className="flex flex-col justify-center p-10 bg-white md:w-1/2">
            <p className="mb-3 text-lg font-extrabold tracking-widest text-orange-500 uppercase">
              | Intern Spark
            </p>
            <h2 className="mb-5 text-4xl font-extrabold leading-snug text-oxfordblue">
              Empower your company with top student talent
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Discover a pool of skilled, motivated interns ready to contribute
              to your organization. Post internships, manage applications, and
              connect with future professionals — all from one place.
            </p>
          </div>
        </section>

        <ForCompanies />

        {/* Left-Right Content Block 2 */}
        <section className="flex flex-col items-center justify-between gap-12 px-6 mx-auto mb-20 md:flex-row max-w-7xl">
          {/* Left - Image */}
          <div className="relative overflow-hidden shadow-xl rounded-3xl md:w-1/2 h-96 group">
            <img
              src="https://i.pinimg.com/736x/1a/14/81/1a1481072f6dc7b125b7fa5676b1261a.jpg"
              alt="Team"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 transition-opacity duration-300 bg-black/10 group-hover:bg-black/20 rounded-3xl"></div>
          </div>

          {/* Right - Text Content */}
          <div className="flex flex-col justify-center w-full px-6 py-10 shadow-lg rounded-3xl md:px-12 md:w-1/2 bg-gradient-to-br from-sky-50 to-white">
            <p className="mb-2 text-sm font-bold tracking-widest text-orange-500 uppercase">
              | About
            </p>
            <h2 className="mb-6 text-4xl font-extrabold leading-tight text-oxfordblue">
              We help companies connect with talented and motivated interns.
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Internship Hub simplifies your hiring process by providing access
              to a pool of skilled students and recent graduates. Whether you're
              a startup or a large enterprise, we help you find interns who are
              eager to contribute, learn, and grow with your company. Post
              openings, review applications, and onboard candidates — all in one
              platform designed to support your team's growth.
            </p>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="max-w-4xl px-8 py-20 mx-auto mb-10 text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-oxfordblue to-oxfordblue/80">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Empowering Futures with Exceptional <br />
            Internship Opportunities...
          </h2>
          <p className="text-lg italic">Start your journey with us today</p>
        </section>

        <ImageSlider />

        {/* Talk to Us Section */}
        <TalktoUs />
      </main>

      <Footer />
    </div>
  );
};

export default CompanyHome;
