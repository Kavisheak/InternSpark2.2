import React from "react";

// Sample testimonials (you can move this to Constants if you wish).
const testimonials = [
  {
    name: "Alice Johnson",
    role: "Intern at TechCorp",
    quote: "This platform made my internship search effortless!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Mike Peterson",
    role: "Company Manager",
    quote: "We filled all our positions quickly with great talent!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Sarah Lee",
    role: "Student at University",
    quote: "I applied to multiple companies in just minutes!",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

// AdTestimonials Component
export const AdTestimonials = () => {
  return (
    <div className="flex flex-col items-center px-6 mb-10">
      <h2 className="mb-4 text-3xl font-semibold text-gray-100">
        Success Stories
      </h2>
      <h3 className="mx-auto mb-16 text-sm font-normal text-center text-gray-200 max-w-7xl">
         Our platform has helped numerous students and companies build valuable connections through a simple and efficient internship process. Students can quickly find and apply to internships that match their skills and goals, while companies can easily discover motivated talent to grow their teams. These success stories reflect real experiences of how our platform has made internship searching and hiring faster, more transparent, and more rewarding for everyone involved. Join the community and see how we are shaping futures and fueling career growth every day.
      </h3>


      <div className="grid grid-cols-1 gap-y-8 gap-x-16 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col p-8 transition-transform transform border shadow-md bg-white/10 backdrop-blur-lg border-white/20 w-80 rounded-2xl hover:scale-105 hover:shadow-xl"
          >
            <p className="mb-4 italic text-gray-300">
              "{item.quote}"
            </p>
            <div className="flex items-center">
              <img src={item.avatar} alt="" className="w-12 mr-4 rounded-full" />
              <span className="font-semibold text-gray-100">
                {item.name}, {item.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default AdTestimonials;
