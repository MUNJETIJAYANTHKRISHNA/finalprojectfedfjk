import React, { useEffect, useRef, useState } from 'react';
import {
  FaSearch,
  FaStar,
  FaClock,
  FaRupeeSign,
  FaChevronLeft,
  FaBriefcaseMedical,
  FaHardHat,
  FaChartLine,
  FaCar,
  FaCog,
  FaShieldAlt,
  FaStore
} from 'react-icons/fa';

// --- Sample Data (unchanged) ---
const categories = [
  { name: "Medical/Doctor", icon: <FaBriefcaseMedical />, bgColor: '#2C3440', iconColor: '#00BFFF' },
  { name: "Engineering", icon: <FaHardHat />, bgColor: '#2C3440', iconColor: '#3CB371' },
  { name: "Marketing/ Sales", icon: <FaChartLine />, bgColor: '#2C3440', iconColor: '#FF6347' },
  { name: "Driving/Parking", icon: <FaCar />, bgColor: '#2C3440', iconColor: '#9370DB' },
  { name: "Machine Operation", icon: <FaCog />, bgColor: '#2C3440', iconColor: '#00BCD4' },
  { name: "Security", icon: <FaShieldAlt />, bgColor: '#2C3440', iconColor: '#8BC34A' },
  { name: "Shops & Stores", icon: <FaStore />, bgColor: '#2C3440', iconColor: '#FFEB3B' },
];

const professionals = [
  { id: 1, name: "Dr. Evelyn Reed", specialty: "Pediatrics (Medical)", info: "8 years experience, specialized in infant care.", price: 800, rating: 4.8, reviews: 150, timings: "Mon-Fri: 10 AM - 5 PM", category: "Medical", image: "med1.jpg" },
  { id: 2, name: "Dr. Alex Johnson", specialty: "General Practice (Medical)", info: "Experienced primary care physician for all ages.", price: 650, rating: 4.5, reviews: 310, timings: "Mon-Sat: 9 AM - 7 PM", category: "Medical", image: "med2.jpg" },
  { id: 3, name: "Mark Kinsley", specialty: "Civil Engineer (Engineering)", info: "Expert in structural planning and blueprint design.", price: 1200, rating: 4.5, reviews: 90, timings: "Sat-Sun: 9 AM - 6 PM", category: "Engineering", image: "eng1.jpg" },
  { id: 4, name: "Sofia Lee", specialty: "Software Architect (Engineering)", info: "Designs scalable systems using modern cloud architecture.", price: 1800, rating: 4.9, reviews: 250, timings: "Mon-Fri: 9 AM - 5 PM", category: "Engineering", image: "eng2.jpg" },
  { id: 5, name: "Priya Sharma", specialty: "Digital Marketing (Marketing/ Sales)", info: "Certified strategist for social media campaigns.", price: 650, rating: 4.9, reviews: 210, timings: "Mon-Sat: 11 AM - 7 PM", category: "Marketing", image: "mkt1.jpg" },
  { id: 6, name: "Robert Green", specialty: "B2B Sales Consultant (Marketing/ Sales)", info: "Specializes in closing high-value business contracts.", price: 1500, rating: 4.7, reviews: 180, timings: "Mon-Fri: 8 AM - 4 PM", category: "Marketing", image: "mkt2.jpg" },
  { id: 7, name: "John Doe", specialty: "Driving Instructor (Driving/Parking)", info: "Certified driving instructor with 10+ years experience.", price: 500, rating: 4.7, reviews: 120, timings: "Mon-Fri: 9 AM - 4 PM", category: "Driving", image: "div1.jpg" },
  { id: 8, name: "Chen Li", specialty: "Professional Valet (Driving/Parking)", info: "High-end valet service for events and private residences.", price: 450, rating: 4.9, reviews: 85, timings: "Daily: 2 PM - 12 AM", category: "Driving", image: "div2.jpg" },
  { id: 9, name: "David Cross", specialty: "CNC Operator (Machine Operation)", info: "Precision milling and turning expert.", price: 950, rating: 4.4, reviews: 60, timings: "Mon-Fri: 6 AM - 2 PM", category: "Machine", image: "mo1.jpg" },
  { id: 10, name: "Marta Rodriguez", specialty: "Heavy Equipment (Machine Operation)", info: "Certified operator for excavators and loaders.", price: 1400, rating: 4.6, reviews: 75, timings: "Seasonal availability.", category: "Machine", image: "mo2.jpg" },
  { id: 11, name: "Sam Wilson", specialty: "Armed Guard (Security)", info: "Licensed and trained in high-threat protection.", price: 700, rating: 4.9, reviews: 400, timings: "24/7 coverage available.", category: "Security", image: "sec1.jpg" },
  { id: 12, name: "Nina Patel", specialty: "Cyber Security Consultant (Security)", info: "Remote consultation for digital threat assessment.", price: 2000, rating: 4.7, reviews: 110, timings: "Flexible schedule.", category: "Security", image: "sec2.jpg" },
  { id: 13, name: "Maria Sanchez", specialty: "Retail Merchandiser (Shops & Stores)", info: "Designs attractive retail displays to boost sales.", price: 550, rating: 4.6, reviews: 70, timings: "Project based.", category: "Shops", image: "shop1.jpg" },
  { id: 14, name: "Tom Wu", specialty: "Warehouse Manager (Shops & Stores)", info: "Specialist in inventory and logistics optimization.", price: 1100, rating: 4.8, reviews: 130, timings: "Mon-Fri: 7 AM - 3 PM", category: "Shops", image: "shop2.jpg" },
  { id: 15, name: "Linda Kim", specialty: "E-commerce Specialist (Shops & Stores)", info: "Boosts online sales through targeted strategies.", price: 1300, rating: 4.9, reviews: 95, timings: "Mon-Fri: 10 AM - 6 PM", category: "Shops", image: "shop3.jpg" },
];

// --- Confirmation Modal component (in-file) ---
const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  // basic focus management: focus confirm button when open
  useEffect(() => {
    const el = modalRef.current;
    if (!open) return;

    // trap focus: find all focusable
    const focusable = el.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Tab') {
        // simple trap
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === 'Enter') {
        // allow Enter to confirm
        onConfirm();
      }
    };
    document.addEventListener('keydown', handleKey);
    // set initial focus
    setTimeout(() => {
      if (first) first.focus();
    }, 10);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onCancel, onConfirm]);

  if (!open) return null;

  return (
    <div className="confirm-portal" role="dialog" aria-modal="true" aria-labelledby="confirm-title" >
      <div className="confirm-backdrop" onClick={onCancel} />
      <div className="confirm-card" ref={modalRef}>
        <h3 id="confirm-title" className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>

      <style jsx>{`
        .confirm-portal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: start;
          justify-content: center;
          pointer-events: none;
        }
        .confirm-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(2,8,20,0.6);
          backdrop-filter: blur(4px) saturate(120%);
          pointer-events: auto;
          opacity: 0;
          animation: backdropIn 220ms forwards;
        }
        @keyframes backdropIn { to { opacity: 1; } }

        .confirm-card {
          pointer-events: auto;
          margin-top: 60px; /* pop from top */
          width: min(560px, 92%);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08));
          border-radius: 12px;
          padding: 20px 22px;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 8px 28px rgba(0,191,255,0.04);
          transform-origin: top center;
          transform: translateY(-14px) scale(.98);
          opacity: 0;
          animation: popIn 260ms cubic-bezier(.2,.9,.25,1) forwards;
          z-index: 10000;
        }
        @keyframes popIn {
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .confirm-title {
          margin: 0 0 8px 0;
          color: #eaf7ff;
          font-size: 1.1rem;
          font-weight: 800;
        }
        .confirm-message {
          margin: 0 0 18px 0;
          color: #bfe3ef;
          line-height: 1.5;
          font-size: 0.98rem;
        }

        .confirm-actions {
          display:flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-confirm {
          background: linear-gradient(135deg,#00d4ff,#00a3ff);
          color: #07262a;
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,163,255,0.12);
        }
        .btn-confirm:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(0,163,255,0.18); }

        .btn-cancel {
          background: transparent;
          color: #d7eff8;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
        }
        .btn-cancel:hover { background: rgba(255,255,255,0.02); }
        
        @media (prefers-reduced-motion: reduce) {
          .confirm-backdrop, .confirm-card { animation: none; transform: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- Professional Card Component (unchanged structure; uses avatar initials) ---
const ProfessionalCard = ({ pro, onBook }) => {
  const initials = pro.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const avatarColor = '#00BFFF';

  return (
    <div className="pro-card">
      <div className="pro-header">
        <div className="pro-avatar-placeholder" style={{ backgroundColor: avatarColor, borderColor: avatarColor }}>
          {initials}
        </div>
        <div className="pro-titles">
          <h3 className="pro-name">{pro.name}</h3>
          <p className="pro-specialty">{pro.specialty}</p>
        </div>
      </div>

      <p className="pro-info">{pro.info}</p>

      <div className="pro-footer">
        <div className="pro-stats">
          <div className="stat-row">
            <FaStar className="stat-icon star-icon" />
            <span>{pro.rating} ({pro.reviews} reviews)</span>
          </div>
          <div className="stat-row">
            <FaClock className="stat-icon clock-icon" />
            <span>{pro.timings}</span>
          </div>
          <div className="stat-row">
            <FaRupeeSign className="stat-icon rupee-icon" />
            <span className="price-tag">{pro.price.toLocaleString('en-IN')}/hour</span>
          </div>
        </div>

        <button className="book-btn" onClick={() => onBook(pro)}>Book Now</button>
      </div>
    </div>
  );
};

// --- User Dashboard Main Component (with modal integration) ---
const UserDashboard = ({ onGoBack, onBookProfessional }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  // modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPro, setPendingPro] = useState(null);

  const getCategoryTag = (categoryName) => categoryName ? categoryName.split('/')[0].trim() : null;

  // Instead of window.confirm, open modal
  const handleBookClick = (professional) => {
    setPendingPro(professional);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (pendingPro) {
      onBookProfessional(pendingPro);
    }
    setConfirmOpen(false);
    setPendingPro(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setPendingPro(null);
  };

  const filteredProfessionals = professionals.filter(pro => {
    const categoryTag = getCategoryTag(selectedCategoryName);

    const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.info.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryTag ? pro.category === categoryTag : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="user-dashboard-container">
      {/* Animated background layers */}
      <div className="bg-animated">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="stars" aria-hidden="true" />
      </div>

      <header className="user-header">
        <button onClick={onGoBack} className="back-button">
          <FaChevronLeft /> Back to Roles
        </button>
        <h1>Find Your Professional</h1>

        <div className="search-bar-wrapper">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search professionals, services, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="user-main-content">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-list-wrapper">
          <div className="category-list">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`category-card ${selectedCategoryName === cat.name ? 'active' : ''}`}
                onClick={() => setSelectedCategoryName(selectedCategoryName === cat.name ? null : cat.name)}
                style={{ backgroundColor: '#2c3440', border: selectedCategoryName === cat.name ? `2px solid ${cat.iconColor}` : '2px solid transparent' }}
              >
                <div className="category-icon-bg" style={{ color: cat.iconColor }}>
                  {React.cloneElement(cat.icon, { style: { color: cat.iconColor, fontSize: '20px' } })}
                </div>
                <span className="category-name">{getCategoryTag(cat.name)}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="section-title listing-title">
          Professionals {selectedCategoryName && `in ${getCategoryTag(selectedCategoryName)}`}
        </h2>
        <div className="professional-listings">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map(pro => (
              <ProfessionalCard
                key={pro.id}
                pro={pro}
                onBook={handleBookClick}
              />
            ))
          ) : (
            <p className="no-results">No professionals found matching your current filters.</p>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={pendingPro ? `Confirm booking for ${pendingPro.name}` : 'Confirm booking'}
        message={pendingPro ? `Do you want to confirm booking for ${pendingPro.name} at ₹${pendingPro.price}/hour?` : ''}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Styles (kept polished & matching theme) */}
      <style jsx>{`
        /* ---------- Base page ---------- */
        .user-dashboard-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #e9fbff;
          padding-bottom: 60px;
          background: linear-gradient(180deg, #020617 0%, #071023 40%, #08111a 100%);
        }

        /* ---------- Animated background container ---------- */
        .bg-animated {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .blob {
          position: absolute;
          filter: blur(60px);
          opacity: 0.9;
          transform: translate3d(0,0,0);
          mix-blend-mode: screen;
          will-change: transform;
        }
        .blob-1 {
          width: 520px;
          height: 520px;
          left: -10%;
          top: -8%;
          background: radial-gradient(circle at 30% 30%, rgba(0,191,255,0.28), rgba(0,191,255,0.14) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#00bfff66,#3cb37133);
          animation: floatSlow 18s ease-in-out infinite;
        }
        .blob-2 {
          width: 620px;
          height: 620px;
          right: -18%;
          top: 10%;
          background: radial-gradient(circle at 70% 40%, rgba(139,195,74,0.24), rgba(139,195,74,0.12) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#8bc34a55,#ffd54f22);
          animation: floatSlow 22s ease-in-out infinite reverse;
          opacity: 0.85;
        }
        .blob-3 {
          width: 420px;
          height: 420px;
          left: 20%;
          bottom: -10%;
          background: radial-gradient(circle at 30% 60%, rgba(255,193,7,0.18), rgba(255,193,7,0.08) 30%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#ffc10744,#00bfff22);
          animation: floatSlow 26s ease-in-out infinite;
          opacity: 0.75;
        }
        @keyframes floatSlow {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-18px) translateX(8px) rotate(3deg) scale(1.02); }
          50% { transform: translateY(0) translateX(-6px) rotate(0deg) scale(0.98); }
          75% { transform: translateY(12px) translateX(6px) rotate(-2deg) scale(1.01); }
          100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
        }
        .stars {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 120px 120px, 200px 200px;
          opacity: 0.6;
          mix-blend-mode: overlay;
          animation: slowPan 60s linear infinite;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.02));
        }
        @keyframes slowPan { from { transform: translateY(0); } to { transform: translateY(-60px); } }

        /* ---------- content wrapper to keep above background ---------- */
        header, main, .user-main-content { position: relative; z-index: 2; }

        /* ---------- Header ---------- */
        .user-header {
          margin: 20px auto;
          max-width: 1200px;
          border-radius: 14px;
          padding: 22px 28px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 10px 30px rgba(2,8,20,0.7), 0 2px 8px rgba(0,191,255,0.02);
          display:flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(6px) saturate(120%);
        }
        .back-button {
          position: absolute;
          left: 28px;
          top: 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.03);
          color: #9ee9ff;
          padding: 8px 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 700;
          transition: transform 180ms ease, background 180ms ease, box-shadow 180ms;
        }
        .back-button:hover { transform: translateY(-2px); background: rgba(255,255,255,0.03); box-shadow: 0 12px 28px rgba(0,186,255,0.06); }
        .user-header h1 {
          font-size: 2.2rem;
          color: #e9fbff;
          margin: 2px 0 10px;
          letter-spacing: -0.6px;
          text-shadow: 0 8px 30px rgba(0,0,0,0.6);
        }

        /* ---------- Search ---------- */
        .search-bar-wrapper { width: 100%; max-width: 840px; margin-top: 6px; }
        .search-bar {
          display:flex; align-items:center; gap:12px;
          padding: 12px 16px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.003));
          border: 1px solid rgba(0,191,255,0.08);
          box-shadow: 0 6px 18px rgba(0,0,0,0.6);
        }
        .search-bar:focus-within { box-shadow: 0 10px 30px rgba(0,191,255,0.12); transform: translateY(-2px); }
        .search-icon { color: #7fe6ff; font-size: 1.3rem; }
        .search-bar input { background: transparent; border: none; outline: none; color: #dff8ff; font-size: 1.02rem; width: 100%; padding: 6px 0; }
        .search-bar input::placeholder { color: #7d98a6; font-weight:500; }

        /* ---------- Main content ---------- */
        .user-main-content { max-width: 1200px; margin: 0 auto; padding: 10px 20px 40px; position: relative; z-index: 2; }
        .section-title { font-size: 1.5rem; color: #dff6ff; margin-top: 18px; margin-bottom: 12px; display:flex; align-items:center; gap:10px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent); margin-left: 12px; }

        /* ---------- category chips ---------- */
        .category-list-wrapper { overflow-x: auto; padding-bottom: 12px; margin-bottom: 18px; }
        .category-list { display:flex; gap:12px; align-items:center; padding-bottom:6px; }
        .category-card {
          display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.02));
          border: 1px solid rgba(255,255,255,0.02);
          min-width: 120px; cursor:pointer;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .category-card:hover { transform: translateY(-6px); box-shadow: 0 12px 34px rgba(0,0,0,0.5); }
        .category-card.active { background: linear-gradient(90deg, rgba(0,191,255,0.06), rgba(139,195,74,0.03)); border: 1px solid rgba(0,191,255,0.14); box-shadow: 0 8px 28px rgba(0,191,255,0.06); }
        .category-icon-bg { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9fe6ff; font-size:18px; }
        .category-name { color:#dff6ff; font-weight:700; font-size:0.95rem; }

        /* ---------- listings grid ---------- */
        .professional-listings { display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 22px; margin-top: 10px; }
        .no-results { padding: 18px; color: #9fbfce; background: rgba(255,255,255,0.02); border-radius:10px; }

        /* ---------- card: floating animation + polish ---------- */
        .pro-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.05));
          border-radius: 14px;
          padding: 18px;
          display:flex;
          flex-direction:column;
          gap:10px;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 8px 26px rgba(2,8,20,0.6), 0 2px 8px rgba(0,191,255,0.02);
          transition: transform 300ms cubic-bezier(.2,.9,.25,1), box-shadow 300ms;
          position: relative;
          overflow: visible;
          min-height: 240px;
          animation: floatCard 6s ease-in-out infinite;
          transform-origin: center;
        }
        .pro-card:hover { transform: translateY(-14px) scale(1.01); box-shadow: 0 28px 70px rgba(0,140,255,0.06), 0 14px 36px rgba(1,6,16,0.75); }

        @keyframes floatCard { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }

        .pro-header { display:flex; gap:14px; align-items:center; }
        .pro-avatar-placeholder {
          width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; color:#021a24;
          background: linear-gradient(180deg,#9fe9ff,#00bfff); box-shadow: 0 6px 20px rgba(0,191,255,0.08), inset 0 -2px 6px rgba(255,255,255,0.05);
          border: 3px solid rgba(6,10,14,0.9); flex-shrink:0; font-size: 1.05rem;
        }
        .pro-titles { min-width: 0; }
        .pro-name { margin:0; color:#e9fbff; font-weight:800; font-size:1.08rem; }
        .pro-specialty { margin:0; color:#a8bac6; font-size:0.86rem; margin-top:2px; }

        .pro-info { color:#d8eef8; font-size:0.92rem; line-height:1.45; margin-top:6px; margin-bottom:8px; min-height:44px; }

        .pro-footer {
          margin-top:auto;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          padding-top:12px;
          border-top: 1px dashed rgba(255,255,255,0.02);
        }

        .pro-stats { display:flex; flex-direction:column; gap:6px; color:#dff6ff; font-size:0.88rem; }
        .stat-row { display:flex; gap:8px; align-items:center; color:#d4eef9; }
        .stat-icon { font-size:0.95rem; color:#d4eef9; }
        .star-icon { color:#ffd66b; filter: drop-shadow(0 1px 6px rgba(255,200,50,0.08)); }
        .clock-icon { color:#7fe6ff; }
        .rupee-icon { color:#9df4a5; }
        .price-tag { color:#bff4bf; font-weight:800; }
        .book-btn {
          background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92));
          color: #042026; padding: 9px 16px; border-radius: 10px; font-weight:800; cursor:pointer;
          border: none; box-shadow: 0 6px 22px rgba(0,191,255,0.06); transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .book-btn:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,191,255,0.12); }
        .book-btn:active { transform: translateY(1px); }

        /* responsive */
        @media (max-width: 880px) {
          .user-header { padding: 16px; margin: 12px; }
          .user-header h1 { font-size: 1.9rem; }
          .search-bar-wrapper { max-width: 640px; }
          .professional-listings { gap: 18px; }
        }
        @media (max-width: 600px) {
          .user-main-content { padding: 12px; }
          .pro-card { padding: 14px; min-height: auto; animation-duration: 8s; }
          .pro-avatar-placeholder { width:46px; height:46px; font-size:0.95rem; }
          .section-title { font-size: 1.1rem; }
          .book-btn { width: 100%; }
          .pro-footer { flex-direction: column; align-items: stretch; gap: 12px; }
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .blob, .stars, .pro-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
