import React from 'react';
import { FaChevronLeft, FaPencilAlt, FaLock, FaCreditCard, FaCalendarCheck, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

// Data structure (unchanged)
const userData = {
  name: "Jayanth Krishnam",
  email: "jayanthkrishnam@gmail.com",
  location: "Bengaluru, Karnataka",
  memberSince: "October 2023",
  profilePic: "profile-pic.jpg" // put under public/images/profile-pic.jpg (or leave to fallback)
};

// Profile options (unchanged data shape)
const profileOptions = [
  {
    title: "Edit Personal Info",
    description: "Update contact details, bio, and profile picture.",
    icon: <FaPencilAlt />,
    iconColor: '#00BFFF',
    actionType: 'edit-profile'
  },
  {
    title: "Security Settings",
    description: "Change password and set up two factor authentication.",
    icon: <FaLock />,
    iconColor: '#FF69B4',
    actionType: 'security-settings'
  },
  {
    title: "Billing & Payments",
    description: "Manage payment methods and view billing history.",
    icon: <FaCreditCard />,
    iconColor: '#3CB371',
    actionType: 'billing-payments'
  },
  {
    title: "Your Bookings",
    description: "View, modify, or cancel your scheduled appointments.",
    icon: <FaCalendarCheck />,
    iconColor: '#FFD700',
    actionType: 'bookings'
  }
];

const ProfilePage = ({ onGoBack, onNavigateToBookings, onNavigateToEditProfile, onNavigateToSecurity, onNavigateToBilling, onLogout }) => {

  // Simulated quick stats (you can wire these to real data)
  const quickStats = {
    totalBookings: 12,
    upcomingBooking: '2025-12-05 10:30 AM'
  };

  const handleCardClick = (actionType) => {
    if (actionType === 'edit-profile') onNavigateToEditProfile && onNavigateToEditProfile();
    else if (actionType === 'security-settings') onNavigateToSecurity && onNavigateToSecurity();
    else if (actionType === 'billing-payments') onNavigateToBilling && onNavigateToBilling();
    else if (actionType === 'bookings') onNavigateToBookings && onNavigateToBookings();
    else console.log('Action:', actionType);
  };

  // avatar handling: public/images/<profilePic>
  const avatarSrc = `/images/${userData.profilePic}`;

  return (
    <div className="profile-container">
      {/* animated background blobs */}
      <div className="bg-blobs" aria-hidden="true" />

      <header className="profile-header">
        <button className="back-button" onClick={onGoBack}><FaChevronLeft /> Back to Roles</button>
        <h1>User Profile</h1>
        <p className="subtitle">Manage your account, bookings and settings.</p>
      </header>

      <main className="profile-main-content">
        {/* User Info Card */}
        <section className="user-info-wrap">
          <div className="user-info-card" role="region" aria-label="User information">
            <div className="avatar-area">
              <div className="avatar-skeleton" />
              <img
                src={avatarSrc}
                alt={userData.name}
                className="profile-pic"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('no-img'); }}
              />
              {/* initials fallback */}
              <div className="avatar-initials" aria-hidden="true">
                {userData.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
              </div>
              <span className="status-badge" title="Verified">Verified</span>
            </div>

            <div className="user-details">
              <div className="user-top">
                <h2 className="user-name">{userData.name}</h2>
                <div className="action-buttons">
                  <button className="btn btn-outline" onClick={() => onNavigateToEditProfile && onNavigateToEditProfile()} aria-label="Edit profile">
                    <FaPencilAlt /> Edit
                  </button>
                  <button className="btn btn-ghost" onClick={() => onLogout && onLogout()} aria-label="Logout">
                    <FaSignOutAlt /> Log out
                  </button>
                </div>
              </div>

              <p className="user-email">{userData.email}</p>
              <p className="user-location">{userData.location}</p>
              <p className="member-since">Member since: <strong>{userData.memberSince}</strong></p>

              {/* Quick stats row */}
              <div className="quick-stats">
                <div className="stat">
                  <div className="stat-icon"><FaCalendarAlt /></div>
                  <div>
                    <div className="stat-value">{quickStats.totalBookings}</div>
                    <div className="stat-label">Total bookings</div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><FaCalendarCheck /></div>
                  <div>
                    <div className="stat-value upcoming">{quickStats.upcomingBooking}</div>
                    <div className="stat-label">Upcoming</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="profile-features-grid">
          {profileOptions.map((item, idx) => (
            <FeatureCard
              key={idx}
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconColor={item.iconColor}
              onClick={() => handleCardClick(item.actionType)}
            />
          ))}
        </section>
      </main>

      {/* Styles */}
      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg,#050712 0%, #07121a 40%, #05070a 100%);
          color: #eaf6ff;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          padding: 36px 20px 80px;
        }

        .bg-blobs {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .bg-blobs::before, .bg-blobs::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          mix-blend-mode: screen;
          opacity: 0.9;
        }
        .bg-blobs::before {
          width: 560px; height:560px; left: -12%; top: -8%;
          background: radial-gradient(circle at 30% 30%, rgba(0,191,255,0.22), rgba(0,191,255,0.06), transparent 65%);
          animation: floatA 22s ease-in-out infinite;
        }
        .bg-blobs::after {
          width: 620px; height:620px; right: -18%; bottom: -12%;
          background: radial-gradient(circle at 70% 40%, rgba(255,193,7,0.20), rgba(255,193,7,0.05), transparent 65%);
          animation: floatB 26s ease-in-out infinite;
        }
        @keyframes floatA { 0%{transform:translate(0,0)}50%{transform:translate(30px,-18px)}100%{transform:translate(0,0)} }
        @keyframes floatB { 0%{transform:translate(0,0)}50%{transform:translate(-28px,26px)}100%{transform:translate(0,0)} }

        .profile-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 18px;
        }
        .back-button {
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          color: #7fd4ff;
          padding: 8px 12px;
          border-radius: 999px;
          display:inline-flex;
          gap:8px;
          align-items:center;
          font-weight:600;
          cursor:pointer;
          box-shadow: 0 8px 22px rgba(0,0,0,0.6);
        }
        .profile-header h1 {
          font-size: 2.4rem;
          margin: 8px 0 6px;
          color: #ffd766;
          font-weight:800;
          letter-spacing:-0.6px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }
        .subtitle { color:#9fb9c9; margin:0; }

        .profile-main-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* USER INFO CARD (glass + avatar) */
        .user-info-wrap { margin: 8px 0 28px; display:flex; justify-content:center; }
        .user-info-card {
          width: 100%;
          max-width: 920px;
          display:flex;
          gap: 22px;
          align-items: flex-start;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          transform-style: preserve-3d;
          transition: transform 260ms cubic-bezier(.2,.9,.25,1), box-shadow 260ms;
        }
        .user-info-card:hover { transform: translateY(-8px); box-shadow: 0 36px 80px rgba(0,140,255,0.06); }

        .avatar-area {
          position: relative;
          width: 96px;
          height: 96px;
          flex-shrink: 0;
        }
        .avatar-skeleton {
          position:absolute; inset:0; border-radius: 14px;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
          animation: shimmer 1.2s linear infinite;
          z-index: 1;
        }
        @keyframes shimmer { to { transform: translateX(80%); } }

        .profile-pic {
          width: 96px; height: 96px; border-radius: 14px; object-fit: cover;
          border: 3px solid rgba(6,10,14,0.9);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          position: relative; z-index: 3;
        }
        .user-info-card.no-img .avatar-skeleton { opacity: 0; visibility: hidden; }

        .avatar-initials {
          position: absolute;
          inset: 0;
          display:flex; align-items:center; justify-content:center;
          z-index: 2;
          font-weight:800;
          color: #031a22;
          background: linear-gradient(180deg,#9fe9ff,#00bfff);
          border-radius:14px;
          border: 3px solid rgba(6,10,14,0.9);
          font-size: 1.25rem;
        }

        .status-badge {
          position: absolute;
          right: -6px;
          bottom: -6px;
          background: linear-gradient(180deg,#ffd54f,#ffb347);
          color: #081018;
          padding: 6px 8px;
          border-radius: 12px;
          font-weight:700;
          font-size: 0.75rem;
          z-index: 6;
          border: 2px solid rgba(2,6,10,0.9);
        }

        .user-details { flex: 1; min-width: 0; }
        .user-top { display:flex; justify-content: space-between; align-items:center; gap: 12px; }
        .user-name { margin: 0; font-size: 1.25rem; font-weight: 900; color: #f7fbff; }
        .action-buttons { display:flex; gap:10px; align-items:center; }
        .btn { display:inline-flex; gap:8px; align-items:center; border-radius:10px; padding:8px 12px; font-weight:700; cursor:pointer; border: none; }
        .btn-outline { background: rgba(255,255,255,0.03); color: #bfefff; border: 1px solid rgba(255,255,255,0.04); }
        .btn-ghost { background: transparent; color: #9fd7ff; border: 1px solid rgba(255,255,255,0.02); }

        .user-email, .user-location, .member-since { margin:6px 0; color:#9fb9c9; font-size:0.95rem; }

        /* quick stats */
        .quick-stats { display:flex; gap:18px; margin-top:14px; flex-wrap:wrap; }
        .stat { display:flex; gap:12px; align-items:center; background: rgba(255,255,255,0.01); padding:10px 14px; border-radius:10px; border: 1px solid rgba(255,255,255,0.02); min-width: 170px; }
        .stat-icon { width:36px; height:36px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.02); border-radius:8px; color:#9fe6ff; font-size:18px; }
        .stat-value { font-weight:800; color:#e9fbff; }
        .stat-label { color:#a8bac6; font-size:0.85rem; }

        .stat .upcoming { font-size:0.95rem; }

        /* Features grid uses FeatureCard (already styled). minor spacing: */
        .profile-features-grid { margin-top:24px; display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }

        /* responsive */
        @media (max-width: 920px) {
          .user-info-card { flex-direction: row; padding: 16px; }
          .profile-pic, .avatar-initials, .avatar-skeleton { width: 80px; height: 80px; border-radius: 12px; }
        }
        @media (max-width: 680px) {
          .user-info-card { flex-direction: column; align-items: center; text-align:center; gap:12px; padding: 16px; }
          .user-top { flex-direction: column; align-items:center; gap:8px; }
          .action-buttons { justify-content: center; }
          .profile-features-grid { grid-template-columns: 1fr; }
        }

        /* accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .bg-blobs::before, .bg-blobs::after, .user-info-card, .contact-card-inner, .pro-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
