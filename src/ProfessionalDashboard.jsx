import React, { useMemo, useState } from 'react';
import {
  FaChevronLeft,
  FaListUl,
  FaCalendarAlt,
  FaEdit,
  FaDollarSign,
  FaCommentDots,
  FaChartLine,
  FaSearch
} from 'react-icons/fa';
import FeatureCard from './FeatureCard';

// Data for feature cards
const professionalOptions = [
  { title: "Manage Services", description: "Add, edit, and set pricing for the services you offer.", icon: <FaListUl />, iconColor: '#FF69B4', actionType: 'manage-services' },
  { title: "Schedule & Availability", description: "View booked appointments and set your working hours.", icon: <FaCalendarAlt />, iconColor: '#3CB371', actionType: 'schedule-availability' },
  { title: "Edit Professional Profile", description: "Update bio, experience, gallery, and contact information.", icon: <FaEdit />, iconColor: '#FFD700', actionType: 'edit-profile' },
  { title: "Earnings & Payments", description: "View payment history, invoices, and set withdrawal methods.", icon: <FaDollarSign />, iconColor: '#00BFFF', actionType: 'earnings-payments' },
  { title: "Client Reviews", description: "View and respond to feedback and client ratings.", icon: <FaCommentDots />, iconColor: '#9370DB', actionType: 'client-reviews' },
  { title: "Performance Analytics", description: "Track bookings, revenue trends, and client engagement.", icon: <FaChartLine />, iconColor: '#FF8C00', actionType: 'performance-analytics' },
];

const ProfessionalDashboard = ({
  onGoBack,
  onNavigateToManageServices,
  onNavigateToSchedule,
  onNavigateToEditProProfile,
  onNavigateToEarnings,
  onNavigateToReviews,
  onNavigateToAnalytics
}) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');

  const quickStats = useMemo(() => ({
    totalServices: 12,
    pendingBookings: 3,
    estimatedEarningsMonth: '₹42,500'
  }), []);

  const handleCardClick = (actionType) => {
    switch (actionType) {
      case 'manage-services': return onNavigateToManageServices && onNavigateToManageServices();
      case 'schedule-availability': return onNavigateToSchedule && onNavigateToSchedule();
      case 'edit-profile': return onNavigateToEditProProfile && onNavigateToEditProProfile();
      case 'earnings-payments': return onNavigateToEarnings && onNavigateToEarnings();
      case 'client-reviews': return onNavigateToReviews && onNavigateToReviews();
      case 'performance-analytics': return onNavigateToAnalytics && onNavigateToAnalytics();
      default: return console.info(`Unhandled action: ${actionType}`);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = professionalOptions.filter(item =>
      !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
    if (sort === 'alpha') arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [query, sort]);

  return (
    <div className="pro-dashboard-root">

      {/* Animated background layers */}
      <div className="bg-animated" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="stars" />
      </div>

      {/* Fixed back button (always visible above blobs) */}
      <button onClick={onGoBack} className="back-button-fixed" aria-label="Back to Roles" title="Back to Roles">
        <FaChevronLeft /> <span className="back-text">Back to Roles</span>
      </button>

      {/* Header card */}
      <header className="pro-header" role="banner">
        <div className="header-inner">
          <div className="title-group">
            <h1>Professional Control Panel</h1>
            <p className="subtitle">Manage services, schedule, earnings and client feedback — all in one place.</p>
          </div>

          <div className="header-controls">
            <div className="quick-stats">
              <div className="stat">
                <div className="stat-val">{quickStats.totalServices}</div>
                <div className="stat-label">Services</div>
              </div>
              <div className="stat">
                <div className="stat-val pending">{quickStats.pendingBookings}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat">
                <div className="stat-val earning">{quickStats.estimatedEarningsMonth}</div>
                <div className="stat-label">Est. this month</div>
              </div>
            </div>

            <div className="search-and-sort">
              <div className="search">
                <FaSearch className="search-icon" />
                <input aria-label="Search features" placeholder="Search features..." value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select aria-label="Sort features" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="alpha">A → Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="pro-main" role="main">
        <div className="pro-features-grid">
          {filtered.map((item, idx) => (
            <div key={idx} className="feature-wrap" role="listitem">
              <div className="feature-card-3d">
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  iconColor={item.iconColor}
                  onClick={() => handleCardClick(item.actionType)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Styles */}
      <style jsx>{`
        :root {
          --glass-border: rgba(255,255,255,0.04);
          --muted: #9fb9c9;
        }

        /* Root */
        .pro-dashboard-root {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #eaf7ff;
          background: linear-gradient(180deg,#020617 0%, #071023 40%, #08111a 100%);
          padding: 36px 24px 80px;
        }

        /* Animated background */
        .bg-animated { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .blob { position: absolute; filter: blur(64px); mix-blend-mode: screen; opacity: 0.92; will-change: transform; }
        .blob-1 { width: 520px; height: 520px; left: -12%; top: -8%; background: radial-gradient(circle at 30% 30%, rgba(0,191,255,0.28), rgba(0,191,255,0.12) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#00bfff66,#3cb37133); animation: floatA 20s ease-in-out infinite; }
        .blob-2 { width: 620px; height: 620px; right: -18%; top: 8%; background: radial-gradient(circle at 70% 40%, rgba(139,195,74,0.24), rgba(139,195,74,0.12) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#8bc34a55,#ffd54f22); animation: floatB 26s ease-in-out infinite; opacity: 0.86; }
        .blob-3 { width: 420px; height: 420px; left: 18%; bottom: -14%; background: radial-gradient(circle at 30% 60%, rgba(255,193,7,0.18), rgba(255,193,7,0.08) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#ffc10744,#00bfff22); animation: floatC 24s ease-in-out infinite; opacity: 0.78; }
        .stars { position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 140px 140px, 220px 220px; opacity: 0.55; mix-blend-mode: overlay; animation: slowPan 60s linear infinite; filter: drop-shadow(0 0 6px rgba(255,255,255,0.02)); }
        @keyframes floatA { 0%{transform:translateY(0) rotate(0)}25%{transform:translateY(-18px) rotate(2deg)}50%{transform:translateY(0) rotate(0)}75%{transform:translateY(10px) rotate(-2deg)}100%{transform:translateY(0) rotate(0)} }
        @keyframes floatB { 0%{transform:translateY(0)}50%{transform:translateY(12px)}100%{transform:translateY(0)} }
        @keyframes floatC { 0%{transform:translateX(0)}50%{transform:translateX(-12px)}100%{transform:translateX(0)} }
        @keyframes slowPan { from{transform:translateY(0)} to{transform:translateY(-60px)} }

        /* Fixed back button: always on top */
        .back-button-fixed {
          position: fixed;
          left: 20px;
          top: 20px;
          z-index: 100000;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          color: #dffcff;
          padding: 10px 14px;
          border-radius: 12px;
          display: inline-flex;
          gap: 10px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 12px 32px rgba(2,8,20,0.7), 0 6px 22px rgba(0,191,255,0.06);
          cursor: pointer;
          font-weight: 800;
          backdrop-filter: blur(6px) saturate(120%);
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .back-button-fixed:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,191,255,0.12); background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); }
        .back-button-fixed .back-text { display:inline-block; }
        @media (max-width: 480px) {
          .back-button-fixed { left: 12px; top: 12px; padding: 8px; width:44px; height:44px; justify-content:center; }
          .back-button-fixed .back-text { display:none; }
        }

        /* Header card */
        .pro-header { position: relative; z-index: 2; max-width: 1200px; margin: 36px auto 18px; padding: 18px; border-radius: 14px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06)); border: 1px solid var(--glass-border); box-shadow: 0 12px 34px rgba(0,0,0,0.6); display:block; }
        .header-inner { display:flex; align-items:center; justify-content:space-between; gap:18px; padding: 8px 20px 8px 20px; }
        .title-group { max-width: 52%; }
        h1 { margin:0; font-size:1.8rem; color: #ffd8a8; letter-spacing:-0.3px; font-weight:800; text-shadow: 0 8px 30px rgba(0,0,0,0.6); }
        .subtitle { margin:6px 0 0; color: var(--muted); font-size:0.95rem; }

        .header-controls { display:flex; align-items:center; gap:14px; }

        .quick-stats { display:flex; gap:12px; align-items:center; }
        .stat { background: rgba(255,255,255,0.02); padding:10px 14px; border-radius:10px; border:1px solid var(--glass-border); min-width:120px; text-align:center; }
        .stat-val { font-weight:800; color:#e9fbff; font-size:1rem; }
        .stat-label { color:var(--muted); font-size:0.78rem; margin-top:6px; }
        .pending { color:#ffd66b; }
        .earning { color:#9ff0c6; }

        .search-and-sort { display:flex; gap:10px; align-items:center; }
        .search { display:flex; gap:8px; align-items:center; padding:10px 14px; border-radius:999px; background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.03); }
        .search input { width:220px; background:transparent; border:none; outline:none; color:#dff8ff; font-size:0.98rem; }
        .search-icon { color:#7fe6ff; }
        select { padding:8px 10px; border-radius:8px; background: rgba(255,255,255,0.02); color:#e8fbff; border:1px solid rgba(255,255,255,0.04); }

        /* Main grid */
        .pro-main { position: relative; z-index: 2; max-width: 1200px; margin: 18px auto 40px; padding: 0 12px; }
        .pro-features-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:22px; align-items:stretch; }

        /* 3D hint + float for cards */
        .feature-wrap { perspective: 1200px; }
        .feature-card-3d { transform-origin: center; transition: transform 260ms ease, box-shadow 260ms ease; }
        .feature-card-3d:hover { transform: translateY(-10px) rotateX(1deg) scale(1.01); box-shadow: 0 30px 70px rgba(0,140,255,0.06); }

        /* Slight subtle stagger animation for natural feel */
        .feature-wrap:nth-child(odd) .feature-card-3d { animation: floatCardA 6s ease-in-out infinite; }
        .feature-wrap:nth-child(even) .feature-card-3d { animation: floatCardB 7s ease-in-out infinite; }
        @keyframes floatCardA { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
        @keyframes floatCardB { 0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)} }

        /* Responsive */
        @media (max-width: 960px) {
          .header-inner { flex-direction: column; align-items:stretch; gap:12px; }
          .title-group { max-width:100%; }
          .search input { width:160px; }
        }
        @media (max-width: 620px) {
          .back-button-fixed { left: 12px; top: 12px; padding:8px; width:44px; height:44px; justify-content:center; }
          .back-button-fixed .back-text { display:none; }
          .header-inner { padding: 12px; }
          .stat { display:none; }
          .search input { width:110px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .blob, .stars, .feature-wrap .feature-card-3d { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalDashboard;
