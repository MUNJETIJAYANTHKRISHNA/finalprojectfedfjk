// FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, description, icon, iconColor = '#00BFFF', onClick }) => {
  return (
    <button
      className="feature-card"
      onClick={onClick}
      type="button"
      aria-label={title}
    >
      <div className="feature-inner">
        <div className="feature-icon-wrap" style={{ '--icon-color': iconColor }}>
          <div className="feature-icon-bg" aria-hidden="true" />
          <div className="feature-icon">{icon}</div>
        </div>

        <div className="feature-content">
          <h3 className="feature-title">{title}</h3>
          <p className="feature-desc">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .feature-card {
          display: block;
          width: 100%;
          text-align: left;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
          border-radius: 14px;
          padding: 26px 22px;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 18px 40px rgba(3,10,18,0.6);
          cursor: pointer;
          transition: transform 260ms cubic-bezier(.2,.9,.25,1), box-shadow 260ms, border-color 260ms;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .feature-card:focus {
          outline: none;
          box-shadow: 0 20px 46px rgba(0,140,255,0.12);
          border-color: rgba(0,191,255,0.22);
        }

        .feature-inner {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .feature-icon-wrap {
          position: relative;
          width: 78px;
          height: 78px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          transform: translateZ(0);
        }

        /* soft rim gradient that uses the provided icon color */
        .feature-icon-bg {
          position: absolute;
          inset: -6px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.02));
          pointer-events: none;
          filter: blur(8px);
          z-index: 0;
        }

        .feature-icon {
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 10px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
          border: 3px solid rgba(0,0,0,0.6);
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
          color: var(--icon-color);
          font-size: 1.6rem;
          transition: transform 260ms, box-shadow 260ms, filter 260ms;
        }

        .feature-title {
          margin: 0 0 8px 0;
          font-size: 1.28rem;
          font-weight: 800;
          color: #f7fcff;
          letter-spacing: -0.2px;
        }

        .feature-desc {
          margin: 0;
          color: #aebbca;
          line-height: 1.45;
          font-size: 0.95rem;
        }

        /* hover & focus tilt / lift */
        .feature-card:hover {
          transform: translateY(-12px) rotateX(2deg) rotateY(-1.2deg) scale(1.01);
          box-shadow: 0 36px 78px rgba(0,120,220,0.10);
          border-color: rgba(0,191,255,0.14);
          z-index: 4;
        }
        .feature-card:active {
          transform: translateY(-4px) scale(0.997);
        }

        /* icon micro-interaction */
        .feature-card:hover .feature-icon {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 18px 40px rgba(0,0,0,0.5);
          filter: drop-shadow(0 6px 18px rgba(0,140,255,0.06));
        }

        /* subtle bottom rim */
        .feature-card::after {
          content: "";
          position: absolute;
          inset: auto 16px 14px 16px;
          height: 6px;
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(0,191,255,0.06), rgba(139,195,74,0.04));
          pointer-events: none;
          opacity: 0.85;
        }

        /* responsive */
        @media (max-width: 600px) {
          .feature-inner { gap: 12px; }
          .feature-icon-wrap { width: 64px; height: 64px; }
          .feature-icon { width: 52px; height: 52px; font-size: 1.35rem; border-radius: 10px; }
          .feature-title { font-size: 1.12rem; }
          .feature-desc { font-size: 0.92rem; }
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .feature-card, .feature-card:hover, .feature-card:active {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </button>
  );
};

export default FeatureCard;
