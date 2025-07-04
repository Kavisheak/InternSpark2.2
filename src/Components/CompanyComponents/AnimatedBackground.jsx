import React, { useEffect } from "react";

const shapes = [
  { size: 40, top: "10%", left: "15%", delay: "0s" },
  { size: 60, top: "30%", left: "75%", delay: "4s" },
  { size: 30, top: "60%", left: "25%", delay: "2s" },
  { size: 50, top: "80%", left: "65%", delay: "6s" },
  { size: 25, top: "45%", left: "50%", delay: "8s" },
];

export default function AnimatedBackground() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0.4;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 1;
        }
      }
      .animate-float {
        animation: float 12s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10"
      style={{ pointerEvents: "none" }}
    >
      {shapes.map(({ size, top, left, delay }, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float bg-[#5f1313]"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top,
            left,
            animationDelay: delay,
            opacity: 0.5,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}
