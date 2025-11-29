import React from "react";

const FeatureCard = ({ title, description, icon, iconColor, onClick }) => {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="icon-wrapper" style={{ color: iconColor }}>
        {React.cloneElement(icon, {
          style: {
            color: iconColor,
            width: "2.8rem",
            height: "2.8rem",
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.25))",
          },
        })}
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>

      {/* Modern Animated Styling */}
      <style jsx>{`
        .feature-card {
          position: relative;
          padding: 26px;
          border-radius: 18px;
          cursor: pointer;

          /* GLASSY BACKGROUND */
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px) saturate(130%);

          /* BORDER + NEON GLOW */
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);

          /* 3D animation */
          transform-style: preserve-3d;
          transition: 
            transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.35s ease,
            border 0.35s ease,
            background 0.35s ease;
        }

        /* Floating idle animation */
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }

        .feature-card {
          animation: floatCard 6s ease-in-out infinite;
        }

        .feature-card:hover {
          transform: translateY(-14px) scale(1.03);
          box-shadow: 
            0 14px 40px rgba(0, 0, 0, 0.65),
            0 0 18px rgba(0, 191, 255, 0.12);
          border: 1px solid rgba(0, 191, 255, 0.35);
          background: rgba(255, 255, 255, 0.07);
        }

        /* GLOW RING when hovered */
        .feature-card:hover::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.3);
        }

        /* glow effect */
        .feature-card::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 180%;
          height: 180%;
          background: radial-gradient(
            circle,
            rgba(0, 191, 255, 0.15),
            rgba(0, 191, 255, 0) 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
          transition: 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }

        .icon-wrapper {
          margin-bottom: 16px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .icon-wrapper {
          transform: translateY(-4px) scale(1.05);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.35));
        }

        .card-title {
          font-size: 1.55rem;
          margin: 0;
          margin-bottom: 8px;
          color: #ffffff;
          font-weight: 700;
        }

        .card-description {
          color: #b6c8d8;
          line-height: 1.45;
          font-size: 1rem;
          margin: 0;
        }

        @media (max-width: 600px) {
          .feature-card {
            padding: 22px;
          }
          .card-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureCard;
