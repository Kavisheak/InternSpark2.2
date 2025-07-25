
const TalktoUs = () => {
  return (
    <div className="flex flex-col w-full mb-10 md:mb-0 md:flex-row">
      {/* Left Side - Image */}
      <div className="w-full h-64 md:w-1/2 md:h-auto">
        <img
          src="https://www.bifma.org/resource/resmgr/images2/Young-Professionals-Webinar.png"
          alt="Company Professional"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex items-center justify-center w-full px-6 py-10 md:w-1/2 bg-oxfordblue md:px-10">
        <div className="text-center md:text-left">
          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            What can we help you
            <br className="hidden md:block" />
            overcome?
          </h1>
          <p className="mb-8 text-base text-white md:text-lg">
            We help companies stay ahead in a rapidly
            <br className="hidden md:block" />
            changing world.
          </p>
          <button className="w-full px-4 py-3 text-sm font-semibold text-black transition bg-orange-400 sm:w-48 hover:bg-orange-500 rounded-xl">
            TALK TO US
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalktoUs;
