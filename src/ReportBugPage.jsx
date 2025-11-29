import React from "react";
import { FaChevronLeft, FaBug, FaExclamationTriangle } from "react-icons/fa";

const ReportBugPage = ({ onGoBack }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Bug Report Received. Thank you for helping us improve!");
        onGoBack();
    };

    return (
        <div className="bug-container">

            {/* ---- Animated Background ---- */}
            <div className="bg-animated">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="stars" />
            </div>

            {/* ---- Header ---- */}
            <header className="bug-header">
                <button onClick={onGoBack} className="back-button">
                    <FaChevronLeft /> Back to Support
                </button>

                <h1>
                    <FaBug /> Report a Bug
                </h1>
            </header>

            {/* ---- Main Content ---- */}
            <main className="bug-main">
                <p className="intro-text">
                    Found an error? Please provide as much detail as possible
                    to help us fix it quickly.
                </p>

                <form onSubmit={handleSubmit} className="bug-form">

                    <div className="form-group">
                        <label htmlFor="location">Where did the bug occur?</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="e.g., On the Dashboard during search"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="severity">Severity Level</label>
                        <select id="severity" required>
                            <option value="">-- Select --</option>
                            <option value="critical">
                                Critical (Crash/Security issue)
                            </option>
                            <option value="high">
                                High (Major feature broken)
                            </option>
                            <option value="medium">
                                Medium (Minor feature issue)
                            </option>
                            <option value="low">Low (Cosmetic/Typo)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="steps">Steps to Reproduce</label>
                        <textarea
                            id="steps"
                            rows="6"
                            placeholder="1. Go to... 2. Click... 3. Error shows..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        <FaExclamationTriangle /> Submit Bug Report
                    </button>
                </form>
            </main>

            {/* ---- Styles ---- */}
            <style jsx>{`
                /* ---------------------------------------------------
                   Container
                ----------------------------------------------------- */
                .bug-container {
                    min-height: 100vh;
                    padding: 40px;
                    position: relative;
                    font-family: "Inter", system-ui;
                    color: #e9faff;
                    background: linear-gradient(
                        180deg,
                        #040811,
                        #0a1526 40%,
                        #081320 100%
                    );
                    overflow-x: hidden;
                }

                /* ---------------------------------------------------
                   Animated Background Layers
                ----------------------------------------------------- */
                .bg-animated {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .blob {
                    position: absolute;
                    filter: blur(55px);
                    mix-blend-mode: screen;
                    opacity: 0.8;
                }

                .blob-1 {
                    width: 480px;
                    height: 480px;
                    left: -10%;
                    top: -8%;
                    background: radial-gradient(
                        rgba(255, 69, 0, 0.25),
                        transparent 60%
                    );
                    animation: blobFloat 18s infinite;
                }

                .blob-2 {
                    width: 620px;
                    height: 620px;
                    right: -18%;
                    top: 10%;
                    background: radial-gradient(
                        rgba(255, 150, 50, 0.25),
                        transparent 60%
                    );
                    animation: blobFloat 22s infinite reverse;
                }

                .blob-3 {
                    width: 420px;
                    height: 420px;
                    left: 20%;
                    bottom: -10%;
                    background: radial-gradient(
                        rgba(255, 0, 80, 0.25),
                        transparent 60%
                    );
                    animation: blobFloat 25s infinite;
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
                    animation: starMove 60s linear infinite;
                }
                @keyframes starMove {
                    from {
                        transform: translateY(0px);
                    }
                    to {
                        transform: translateY(-80px);
                    }
                }

                /* ---------------------------------------------------
                   Header
                ----------------------------------------------------- */
                .bug-header {
                    position: relative;
                    text-align: center;
                    z-index: 2;
                    margin-bottom: 40px;
                }

                .bug-header h1 {
                    font-size: 2.5rem;
                    color: #ff5722;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    text-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
                }

                /* Floating Back Button */
                .back-button {
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding: 10px 14px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    border-radius: 10px;
                    color: #9fe4ff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    backdrop-filter: blur(6px);
                    z-index: 9999;
                    transition: 0.25s;
                }
                .back-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(0, 191, 255, 0.18);
                }

                /* ---------------------------------------------------
                   Main Form Container
                ----------------------------------------------------- */
                .bug-main {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    position: relative;
                    z-index: 2;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(12px);
                    border-radius: 18px;
                    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.45);
                    animation: floatCard 7s ease-in-out infinite;
                }

                @keyframes floatCard {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                    100% { transform: translateY(0); }
                }

                .intro-text {
                    color: #c6d6e6;
                    margin-bottom: 25px;
                    text-align: center;
                }

                /* ---------------------------------------------------
                   Form Inputs
                ----------------------------------------------------- */
                .bug-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group label {
                    font-weight: 600;
                    margin-bottom: 6px;
                    color: #e4f4ff;
                }

                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    background: rgba(5, 12, 22, 0.7);
                    padding: 14px;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #e9faff;
                    font-size: 1rem;
                    transition: 0.25s;
                }

                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    border-color: #ff7043;
                    box-shadow: 0 0 12px rgba(255, 112, 67, 0.4);
                    outline: none;
                }

                /* ---------------------------------------------------
                   Submit Button
                ----------------------------------------------------- */
                .submit-button {
                    background: linear-gradient(
                        135deg,
                        #ff7043,
                        #ff3d00
                    );
                    padding: 15px;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    color: #fff;
                    cursor: pointer;
                    font-size: 1.1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 10px 28px rgba(255, 61, 0, 0.3);
                    transition: 0.25s;
                }
                .submit-button:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 14px 38px rgba(255, 61, 0, 0.45);
                }
                .submit-button:active {
                    transform: translateY(1px);
                }

                @media (max-width: 768px) {
                    .bug-container {
                        padding: 18px;
                    }
                    .bug-main {
                        padding: 22px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReportBugPage;
