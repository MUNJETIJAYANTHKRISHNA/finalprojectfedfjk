import React from 'react';
import FeatureCard from './FeatureCard';
import { FaUserEdit, FaLock, FaCreditCard, FaBell } from 'react-icons/fa';
V
const settingsData = [
    { 
        title: "Edit Profile", 
        description: "Update your name, contact details, and location.", 
        icon: <FaUserEdit />, 
        iconColor: '#00BFFF', 
        action: () => alert('Navigating to Profile Edit')
    },
    { 
        title: "Security & Login", 
        description: "Change your password and manage two-factor authentication.", 
        icon: <FaLock />, 
        iconColor: '#FFD700', 
        action: () => alert('Navigating to Security Settings')
    },
    { 
        title: "Payment Methods", 
        description: "Manage credit/debit cards and billing preferences.", 
        icon: <FaCreditCard />, 
        iconColor: '#3CB371', 
        action: () => alert('Navigating to Payment Settings')
    },
    { 
        title: "Notifications", 
        description: "Customize alerts for appointments and reviews.", 
        icon: <FaBell />, 
        iconColor: '#FF69B4', 
        action: () => alert('Navigating to Notification Settings')
    },
];


const SettingsPage = () => {
    return (
        <div className="settings-container">
            <h1>Account Settings</h1>
            
            <div className="features-grid">
                {settingsData.map((item, index) => (
                    <FeatureCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        onClick={item.action}
                    />
                ))}
            </div>

            {/* General Page Styles for SettingsPage */}
            <style jsx>{`
                .settings-container {
                    min-height: 100vh;
                    background: radial-gradient(circle at center, #1b2631 0%, #0d1217 100%); 
                    color: white;
                    padding: 40px;
                    font-family: system-ui, sans-serif;
                }
                h1 {
                    color: #00BFFF;
                    text-align: center;
                    margin-bottom: 40px;
                    font-size: 2.5rem;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    max-width: 900px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;