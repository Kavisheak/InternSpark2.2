import React, { useEffect } from 'react';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#00CED1', '#FFC0CB'];

const shapes = ['circle', 'square', 'triangle', 'hexagon', 'pentagon', 'diamond'];

const generateRandom = () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${20 + Math.random() * 30}px`,
  color: colors[Math.floor(Math.random() * colors.length)],
  shape: shapes[Math.floor(Math.random() * shapes.length)],
  duration: `${6 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
});

const AnimatedShapes = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes drift {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
        50% { transform: translate(30px, -30px) rotate(180deg); opacity: 1; }
        100% { transform: translate(-20px, 20px) rotate(360deg); opacity: 0.7; }
      }

      .drifting-shape {
        animation: drift infinite ease-in-out;
        position: absolute;
        opacity: 0.6;
        z-index: 0;
        pointer-events: none;
      }

      .circle {
        border-radius: 50%;
      }

      .square {
        border-radius: 6px;
      }

      .triangle {
        width: 0 !important;
        height: 0 !important;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 20px solid red;
        background: none !important;
      }

      .hexagon {
        width: 30px;
        height: 17px;
        background: red;
        position: relative;
      }
      .hexagon:before,
      .hexagon:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
      }
      .hexagon:before {
        bottom: 100%;
        border-bottom: 9px solid red;
      }
      .hexagon:after {
        top: 100%;
        border-top: 9px solid red;
      }

      .diamond {
        transform: rotate(45deg);
      }

      .pentagon {
        width: 0;
        border-style: solid;
        border-width: 0 20px 30px 20px;
        border-color: transparent transparent red transparent;
        position: relative;
      }
      .pentagon:after {
        content: "";
        position: absolute;
        top: -18px;
        left: -20px;
        width: 0;
        border-style: solid;
        border-width: 18px 40px 0 40px;
        border-color: red transparent transparent transparent;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const shapeElements = Array.from({ length: 40 }).map((_, i) => {
    const { top, left, size, color, shape, duration, delay } = generateRandom();

    if (shape === 'triangle') {
      return (
        <span
          key={i}
          className="drifting-shape triangle"
          style={{
            top,
            left,
            animationDuration: duration,
            animationDelay: delay,
            borderBottomColor: color,
          }}
        />
      );
    }

    if (shape === 'hexagon') {
      return (
        <div
          key={i}
          className="drifting-shape hexagon"
          style={{
            top,
            left,
            backgroundColor: color,
            animationDuration: duration,
            animationDelay: delay,
            transform: `scale(${parseFloat(size) / 30})`,
          }}
        />
      );
    }

    if (shape === 'pentagon') {
      return (
        <div
          key={i}
          className="drifting-shape pentagon"
          style={{
            top,
            left,
            animationDuration: duration,
            animationDelay: delay,
          }}
        />
      );
    }

    if (shape === 'diamond') {
      return (
        <span
          key={i}
          className="drifting-shape diamond square"
          style={{
            top,
            left,
            width: size,
            height: size,
            backgroundColor: color,
            animationDuration: duration,
            animationDelay: delay,
          }}
        />
      );
    }

    return (
      <span
        key={i}
        className={`drifting-shape ${shape}`}
        style={{
          top,
          left,
          width: size,
          height: size,
          backgroundColor: color,
          animationDuration: duration,
          animationDelay: delay,
        }}
      />
    );
  });

  return (
    <div className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      {shapeElements}
    </div>
  );
};

export default AnimatedShapes;
