import React from "react";
import {
    FaChevronLeft,
    FaChartLine,
    FaArrowUp,
    FaUsers,
    FaCheckCircle,
} from "react-icons/fa";

const PerformanceAnalyticsPage = ({ onGoBack }) => {
    return (
        <div className="analytics-container">
            {/* ---- Animated Background Layers ---- */}
            <div className="bg-animated">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="stars" />
            </div>

            <header className="analytics-header">
                <button onClick={onGoBack} className="back-button">
                    <FaChevronLeft /> Back to Control Panel
                </button>

                <h1>
                    <FaChartLine /> Performance Analytics
                </h1>
            </header>

            <main className="analytics-main">
                {/* -------- KPI GRID -------- */}
                <section className="kpi-grid">
                    <div className="kpi-card">
                        <FaCheckCircle className="kpi-icon booking-icon" />
                        <h3>Bookings (30 Days)</h3>
                        <p className="kpi-value">42</p>
                        <span className="trend positive">
                            <FaArrowUp /> 8% vs Last Month
                        </span>
                    </div>

                    <div className="kpi-card">
                        <FaUsers className="kpi-icon client-icon" />
                        <h3>New Clients</h3>
                        <p className="kpi-value">15</p>
                        <span className="trend positive">
                            <FaArrowUp /> 25% vs Last Month
                        </span>
                    </div>

                    <div className="kpi-card">
                        <FaChartLine className="kpi-icon revenue-icon" />
                        <h3>Revenue (30 Days)</h3>
                        <p className="kpi-value">₹45,500</p>
                        <span className="trend positive">
                            <FaArrowUp /> 12% vs Last Month
                        </span>
                    </div>
                </section>

                {/* -------- Trend Chart -------- */}
                <section className="section-block">
                    <h2>Engagement and Trend Data</h2>
                    <p>
                        Detailed charts showing hourly and daily peak booking
                        times (Placeholder Chart).
                    </p>
                    <div className="placeholder-chart">
                        Chart visualization here.
                    </div>
                </section>
            </main>

            <style jsx>{`
                /* -------------------------------------------------
                   MAIN CONTAINER
                --------------------------------------------------- */
                .analytics-container {
                    min-height: 100vh;
                    position: relative;
                    overflow-x: hidden;
                    color: #e9faff;
                    font-family: "Inter", system-ui;
                    padding: 30px;
                    background: linear-gradient(
                        180deg,
                        #050a14,
                        #0b1424 40%,
                        #0a1322 100%
                    );
                }

                /* -------------------------------------------------
                   BACKGROUND ANIMATION LAYERS
                --------------------------------------------------- */
                .bg-animated {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }

                .blob {
                    position: absolute;
                    filter: blur(55px);
                    mix-blend-mode: screen;
                    opacity: 0.8;
                }

                .blob-1 {
                    width: 520px;
                    height: 520px;
                    left: -10%;
                    top: -8%;
                    background: radial-gradient(
                        circle,
                        rgba(0, 191, 255, 0.25),
                        transparent 60%
                    );
                    animation: blobFloat 18s infinite ease-in-out;
                }

                .blob-2 {
                    width: 650px;
                    height: 650px;
                    right: -15%;
                    top: 10%;
                    background: radial-gradient(
                        circle,
                        rgba(255, 140, 0, 0.22),
                        transparent 60%
                    );
                    animation: blobFloat 24s infinite ease-in-out reverse;
                }

                .blob-3 {
                    width: 450px;
                    height: 450px;
                    left: 25%;
                    bottom: -10%;
                    background: radial-gradient(
                        circle,
                        rgba(0, 255, 170, 0.22),
                        transparent 60%
                    );
                    animation: blobFloat 30s infinite ease-in-out;
                }

                @keyframes blobFloat {
                    0% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(20px, -30px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }

                .stars {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(
                            rgba(255, 255, 255, 0.03) 1px,
                            transparent 1px
                        ),
                        radial-gradient(
                            rgba(255, 255, 255, 0.02) 1px,
                            transparent 1px
                        );
                    background-size: 120px 120px, 200px 200px;
                    animation: moveStars 60s linear infinite;
                }

                @keyframes moveStars {
                    from {
                        transform: translateY(0px);
                    }
                    to {
                        transform: translateY(-80px);
                    }
                }

                /* -------------------------------------------------
                   HEADER
                --------------------------------------------------- */
                .analytics-header {
                    position: relative;
                    text-align: center;
                    margin-bottom: 40px;
                    z-index: 2;
                }

                .back-button {
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding: 10px 14px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: #9fe4ff;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    font-weight:700;
                    backdrop-filter: blur(6px);
                    transition: 0.25s ease;
                }
                .back-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 24px rgba(0, 191, 255, 0.2);
                }

                .analytics-header h1 {
                    font-size: 2.5rem;
                    color: #ff9d28;
                    text-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 14px;
                }

                /* -------------------------------------------------
                   MAIN CONTENT
                --------------------------------------------------- */
                .analytics-main {
                    max-width: 1200px;
                    margin: auto;
                    position: relative;
                    z-index: 2;
                }

                /* -------------------------------------------------
                   KPI CARDS
                --------------------------------------------------- */
                .kpi-grid {
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fit,
                        minmax(300px, 1fr)
                    );
                    gap: 22px;
                    margin-bottom: 40px;
                }

                .kpi-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 26px;
                    border-radius: 18px;
                    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.45);
                    transition: 0.3s ease;
                    animation: floatCard 7s ease-in-out infinite;
                }

                @keyframes floatCard {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                .kpi-card:hover {
                    transform: translateY(-14px) scale(1.03);
                    box-shadow: 0 12px 40px rgba(255, 140, 0, 0.15),
                        0 6px 20px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 140, 0, 0.4);
                }

                .kpi-icon {
                    font-size: 2.2rem;
                    margin-bottom: 12px;
                }

                .booking-icon {
                    color: #4cff9a;
                }
                .client-icon {
                    color: #00c8ff;
                }
                .revenue-icon {
                    color: #ffdf70;
                }

                .kpi-card h3 {
                    color: #b6c8d6;
                    font-size: 1.1rem;
                }

                .kpi-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                    margin-top: 5px;
                }

                .trend {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.9rem;
                    margin-top: 8px;
                }

                .positive {
                    color: #4cff9a;
                }

                /* -------------------------------------------------
                   CHART BOX
                --------------------------------------------------- */
                .section-block {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 30px;
                    border-radius: 18px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.4);
                }

                .section-block h2 {
                    color: white;
                    font-size: 1.8rem;
                    margin-bottom: 12px;
                    padding-bottom: 6px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                }

                .placeholder-chart {
                    height: 300px;
                    border-radius: 12px;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px dashed rgba(255, 255, 255, 0.15);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #b8c8d8;
                }
            `}</style>
        </div>
    );
};

export default PerformanceAnalyticsPage;
