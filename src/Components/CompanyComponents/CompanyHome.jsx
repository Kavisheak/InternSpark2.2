import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiUser } from 'react-icons/fi';

const CompanyHome = () => {
  const navigate=useNavigate();

  
  return (
  <div className='min-h-screen mt-48'>
      {/* Title */}
  <div className="flex flex-col w-full mt-6 ">
  <p className='pl-16 mb-6 text-2xl font-semibold text-white'>Welcome !</p>
  <h1 className="relative z-10 text-6xl font-bold text-white pl-14 md:text-7xl">
    Build Powerful Teams,  <br/><p className='pt-4 text-5xl '>Drive Real Impact.</p>
  </h1>
</div>


      {/* Buttons */}
      <div className="flex pt-3 pl-16 mt-10 mb-64">
        <button
          className="flex items-center justify-center w-40 px-6 py-4 font-semibold text-white transition-colors border rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30"
          onClick={()=>navigate('/company/internships')}
        >          
          Get Started
          <FiArrowRight className='ml-2'/>
        </button>

        <button
          className="flex items-center justify-center w-40 px-6 py-3 font-semibold text-center text-white transition-colors border rounded-lg ml-9 backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30"
          onClick={()=>navigate('/company/profile')}
        >
          <FiUser className='mr-2'/>
          My Profile
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 mt-5 ml-4 mr-4 mb-96 md:flex-row md:ml-10 md:mr-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <div className="p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
            <h3 className="mb-3 text-xl font-bold">Quick Stats</h3>
            <div className="mb-4 space-y-2">
              <div>🚀 <strong>500+</strong> internships posted across various industries</div>
              <div>👥 <strong>2,000+</strong> active student profiles</div>
              <div>🌐 Companies from all across the country</div>
              <div>⏱️ Average posting-to-hire time: <strong>3 days</strong></div>
              <div>📈 Growing community of both fresh and experienced talent</div>
            </div>
          </div>

          <div className="p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
                <h3 className="mb-3 text-xl font-bold">What You Can Do</h3>
                <ul className="space-y-2 list-inside ">
                  <li>📝 Post new internship opportunities in seconds</li>
                  <li>🔍 Filter and search through applications easily</li>
                  <li>📬 Receive real-time application notifications</li>
                  <li>💬 Message applicants directly within the platform</li>
                  <li>📊 Track performance of each internship listing</li>
                </ul>

          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
       <h2 className="mb-4 text-2xl font-bold text-center">Welcome to Your Internship Hiring Hub</h2>
  <p className="mb-2">
    Hiring interns shouldn't be a hassle—and with our platform, it never will be. Whether you're an innovative startup or a well-established enterprise, we offer a powerful, user-friendly environment to attract, manage, and recruit top student talent from across the country.
  </p>
  <p className="mb-2">
    With hundreds of internship opportunities already posted and thousands of verified student profiles, you're joining a thriving ecosystem designed to bridge the gap between education and employment.
  </p>
  <h3 className="mt-6 mb-2 text-xl font-semibold">🌟 Key Features to Supercharge Your Hiring Process</h3>
  <ul className="space-y-3 list-disc list-inside">
    <li>
      <span className="font-semibold">Intelligent Candidate Matching –</span> Our AI-driven algorithms analyze profiles and requirements to recommend the best-fit candidates.
    </li>
    <li>
      <span className="font-semibold">Streamlined Hiring Workflow –</span> Post internships, manage applicants, and track progress with a clean and efficient interface.
    </li>
    <li>
      <span className="font-semibold">Custom Company Profile –</span> Showcase your organization, values, and culture to attract ideal candidates.
    </li>
    <li>
      <span className="font-semibold">Insightful Analytics & Reporting –</span> Monitor engagement, improve listings, and make data-driven hiring decisions.
    </li>
  </ul>
  <p className="mt-6 italic">“Find the perfect intern. Reduce time-to-hire. Grow your team with confidence.”</p>
        </div>
      </div>
    
     <div className="w-full h-screen">
      <div className="relative w-full h-full">
        <div className="absolute bottom-0 left-0 w-full h-screen bg-black" />
        
        <div className="relative z-10 flex items-center justify-center h-1/2 mt-[-40px]">
          <img
            src="https://media.istockphoto.com/id/1346125184/photo/group-of-successful-multiethnic-business-team.jpg?s=612x612&w=0&k=20&c=5FHgRQZSZed536rHji6w8o5Hco9JVMRe8bpgTa69hE8=" // Replace with your URL
            alt="Centered Team"
            className="w-[90%] max-w-6xl rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>

      <div className='h-screen bg-transparent mt-36'></div>
    </div>
  )
}

export default CompanyHome
