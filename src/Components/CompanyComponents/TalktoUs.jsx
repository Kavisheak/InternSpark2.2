import React from 'react'

const TalktoUs = () => {
  return (
      <div className="flex w-full h-screen">
          {/* Left Side - Image */}
          <div className="w-1/2 h-full">
            <img
              src="https://www.bifma.org/resource/resmgr/images2/Young-Professionals-Webinar.png"
              alt="Company Professional"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side - Blue Background with Content */}
          <div className="flex flex-col justify-center w-1/2 h-full px-10 bg-blue-950">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white">
              What can we help you
              <br />
              overcome?
            </h1>
            <p className="mb-8 text-lg text-white">
              We help companies stay ahead in a rapidly
              <br />
              changing world.
            </p>
            <button className="w-48 px-4 py-3 text-sm font-semibold text-black transition bg-white hover:bg-gray-100">
              TALK TO US
            </button>
          </div>
        </div>
  )
}

export default TalktoUs
