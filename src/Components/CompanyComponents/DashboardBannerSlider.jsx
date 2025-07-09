const DashboardBannerSlider = () => {
  return (
    <div className="flex items-center justify-center px-6 bg-gray-100">
      <div className="relative z-10 max-w-2xl p-10 text-center backdrop-blur-md rounded-2xl">
        <h1 className="text-5xl font-bold sm:text-6xl text-[#2128BD]">
          Welcome to Your Dashboard
        </h1>
        <h2 className="mt-2 text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
          Manage Internships & Applications
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          Track posted internships, monitor application status, and engage with your future team — all in one place.
        </p>
      </div>
    </div>
  );
};

export default DashboardBannerSlider;
