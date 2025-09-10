import React from "react";

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

export const AdTestimonials = () => {
  return (
    <section className="px-6 py-20 bg-[#f9fafb]">
      <h2 className="mb-6 text-3xl font-bold text-center text-[#0b2545]">
        Success Stories
      </h2>
      <p className="max-w-3xl mx-auto mb-16 text-center text-gray-600">
        Our platform has helped countless students and companies build valuable
        connections. See how InternSpark transforms internship journeys.
      </p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col p-8 text-center transition-transform transform bg-white border border-gray-200 shadow-md rounded-2xl w-80 hover:scale-105 hover:shadow-lg"
          >
            <p className="mb-4 italic text-gray-700">"{item.quote}"</p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="font-semibold text-[#0b2545]">
                {item.name}, {item.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdTestimonials;
