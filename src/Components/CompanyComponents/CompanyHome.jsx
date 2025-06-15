import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompanyHome = () => {
  const navigate=useNavigate();

  
  return (
  <div className='min-h-screen mt-0'>
      {/* Title */}
      <div className="relative flex flex-col items-center w-full mt-3">
        <h1 className="text-6xl font-bold text-center text-white">
          Fuel Your Future Team
        </h1>
        {/* Title shadow */}
        <h1 className="-mt-2 text-6xl font-bold text-center text-white transform pointer-events-none opacity-20 blur-sm rotate-x-12 sm:disabled:">
          Fuel Your Future Team
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex justify-center pt-3">
        <button
          className="flex items-center justify-center w-40 px-6 py-3 font-semibold text-center text-white transition-colors border rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30"
          onClick={()=>navigate('/internships')}
        >
          Get Started
        </button>

        <button
          className="flex items-center justify-center w-40 px-6 py-3 ml-6 font-semibold text-center text-white transition-colors border rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30"
          onClick={()=>navigate('/profile')}
        >
          My Profile
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 mt-16 ml-4 mr-4 md:flex-row md:ml-10 md:mr-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <div className="p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
            <h2 className="mb-2 overflow-hidden text-2xl font-bold">
              <span className="block marquee">Quick Stats</span>
            </h2>
            <p className="text-white/90">
              Join hundreds of forward-thinking companies and thousands of aspiring interns already using our platform.
              With over 500 internships posted and 2,000+ active student profiles, we help bridge the gap between fresh talent and real-world opportunities.
              Whether you're looking to recruit bright minds or kickstart your career, our growing community is the perfect place to connect.
            </p>
          </div>

          <div className="p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
            <h2 className="mb-2 overflow-hidden text-2xl font-bold">
              <span className="block marquee">Left Card 2</span>
            </h2>
            <p className="text-white/90">
              Content for the second left-side card.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6 text-white border shadow-md rounded-xl bg-white/10 backdrop-blur-md border-white/30 md:shadow-lg">
          <h2 className="mb-2 overflow-hidden text-2xl font-bold text-center">
            <span className="block">Big Right Card</span>
          </h2>
          <p className="text-white/90">
            This bigger card covers the remaining space of the row, expanding to fill available width.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompanyHome
