import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaCommentAlt, FaHeadset, FaClock } from 'react-icons/fa';

const LiveChatPage = ({ onGoBack }) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [eta, setEta] = useState(2); // minutes
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // simple ETA countdown simulation while connecting
    let t;
    if (connecting && !connected) {
      t = setInterval(() => {
        setEta(prev => (prev > 0 ? prev - 1 : 0));
      }, 60_000); // reduces by 1 per minute; in demo you can shorten if needed
    }
    return () => clearInterval(t);
  }, [connecting, connected]);

  useEffect(() => {
    // when connected, show typing indicator for a short while
    if (connected) {
      setTyping(true);
      const timer = setTimeout(() => setTyping(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [connected]);

  // Trigger chat start (replace with real connection logic)
  const startChat = async () => {
    if (connecting || connected) return;
    setConnecting(true);
    setEta(2);

    // simulated connect delay
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
      // you can call actual websocket / API connect here
    }, 1600); // short demo connect
  };

  return (
    <div className="live-root">
      {/* animated bg */}
      <div className="bg-animated" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="stars" />
      </div>

      {/* fixed back button */}
      <button
        onClick={onGoBack}
        className="back-button-fixed"
        aria-label="Back to Support"
        title="Back to Support"
      >
        <FaChevronLeft /> <span className="back-text">Back to Support</span>
      </button>

      <header className="live-header" role="banner">
        <h1><FaCommentAlt aria-hidden="true" /> Live Chat (Premium)</h1>
        <p className="lead">Instant support for premium users. Secure, private, and fast.</p>
      </header>

      <main className="live-main" role="main">
        <section className="chat-panel" aria-live="polite">
          <div className="agent-row">
            <div className={`agent-avatar ${connected ? 'online' : connecting ? 'connecting' : ''}`} aria-hidden="true">
              <FaHeadset />
            </div>

            <div className="agent-meta">
              <div className="agent-name">{connected ? 'Agent Priya (Premium)' : 'Connecting to agent...'}</div>
              <div className="agent-sub">
                {connected ? 'You are connected — start messaging.' : connecting ? 'Searching premium agents...' : 'Premium only — instant support.'}
              </div>
            </div>

            <div className="eta-box" aria-hidden="true">
              <FaClock />
              <div className="eta-text">{connected ? 'Live' : `${eta} min`}</div>
            </div>
          </div>

          <div className="chat-area" role="region" aria-label="Chat messages">
            {!connected && !connecting && (
              <div className="system-message">
                <strong>Premium access required.</strong> Upgrade to start an instant chat session.
              </div>
            )}

            {(connecting || !connected) && (
              <div className="system-message connecting-msg">
                <FaHeadset aria-hidden="true" />
                <div className="msg-col">
                  <div className="msg-line">Connecting to the next available premium agent...</div>
                  <div className="msg-sub">Estimated wait: <span className="eta-inline">{eta} minute{eta !== 1 ? 's' : ''}</span></div>
                </div>
                <div className="dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {connected && (
              <>
                <div className="chat-bubble agent">
                  <div className="bubble-content">
                    Hi — I'm Priya from support. How can I help you today?
                    {typing && <span className="typing"> <em>typing…</em></span>}
                  </div>
                </div>

                <div className="chat-bubble user">
                  <div className="bubble-content">Hi! I need help updating my service listing.</div>
                </div>
              </>
            )}
          </div>

          <div className="panel-actions">
            <button
              className={`start-btn ${connecting || connected ? 'busy' : ''}`}
              onClick={startChat}
              disabled={connecting || connected}
              aria-pressed={connecting || connected}
            >
              {connected ? 'Connected' : connecting ? 'Connecting...' : 'Start Chat Session (Premium)'}
            </button>

            <button
              className="help-link"
              onClick={() => alert('Open ticket flow (placeholder)')}
            >
              Open Support Ticket
            </button>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* base */
        .live-root {
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #eaf7ff;
          background: linear-gradient(180deg,#020617 0%, #071023 40%, #08111a 100%);
          padding: 32px;
          box-sizing: border-box;
        }

        /* animated background */
        .bg-animated { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .blob { position: absolute; filter: blur(64px); mix-blend-mode: screen; opacity: 0.9; will-change: transform; }
        .blob-1 { width: 520px; height: 520px; left: -12%; top: -8%; background: radial-gradient(circle at 30% 30%, rgba(0,191,255,0.25), rgba(0,191,255,0.08)); animation: floatA 20s ease-in-out infinite; }
        .blob-2 { width: 620px; height: 620px; right: -18%; top: 8%; background: radial-gradient(circle at 70% 40%, rgba(139,195,74,0.22), rgba(139,195,74,0.06)); animation: floatB 26s ease-in-out infinite; opacity: 0.86; }
        .blob-3 { width: 420px; height: 420px; left: 18%; bottom: -14%; background: radial-gradient(circle at 30% 60%, rgba(255,193,7,0.16), rgba(255,193,7,0.05)); animation: floatC 24s ease-in-out infinite; opacity: 0.78; }
        .stars { position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 160px 160px, 260px 260px; opacity: 0.55; mix-blend-mode: overlay; animation: slowPan 60s linear infinite; }
        @keyframes floatA { 0%{transform:translateY(0)} 50%{transform:translateY(-18px)} 100%{transform:translateY(0)} }
        @keyframes floatB { 0%{transform:translateY(0)} 50%{transform:translateY(12px)} 100%{transform:translateY(0)} }
        @keyframes floatC { 0%{transform:translateX(0)} 50%{transform:translateX(-12px)} 100%{transform:translateX(0)} }
        @keyframes slowPan { from{transform:translateY(0)} to{transform:translateY(-60px)} }

        /* fixed back button */
        .back-button-fixed {
          position: fixed;
          left: 18px;
          top: 18px;
          z-index: 99999;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          color: #dffcff;
          padding: 8px 12px;
          border-radius: 12px;
          display: inline-flex;
          gap: 8px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 28px rgba(2,8,20,0.6);
          cursor: pointer;
          font-weight: 700;
          backdrop-filter: blur(6px) saturate(140%);
        }
        .back-button-fixed:focus { outline: 3px solid rgba(0,191,255,0.12); }

        .live-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin: 28px auto 8px;
        }
        .live-header h1 {
          font-size: 2rem;
          margin: 0;
          display: inline-flex;
          gap: 12px;
          align-items: center;
          color: #ffd8a8;
          font-weight: 800;
          text-shadow: 0 6px 20px rgba(0,0,0,0.6);
        }
        .lead { margin: 8px 0 0; color: #9fb9c9; }

        .live-main { position: relative; z-index: 2; max-width: 920px; margin: 18px auto; padding: 0 16px; }

        .chat-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }

        .agent-row {
          display:flex;
          align-items:center;
          gap:16px;
          margin-bottom: 14px;
        }
        .agent-avatar {
          width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center;
          background: linear-gradient(180deg,#11313d,#04212b);
          color: #9fe9ff; font-size:1.2rem; border: 3px solid rgba(255,255,255,0.04);
          box-shadow: 0 8px 20px rgba(0,0,0,0.6), inset 0 -4px 10px rgba(255,255,255,0.02);
        }
        .agent-avatar.connecting { animation: pulse 1.6s infinite; box-shadow: 0 8px 30px rgba(0,191,255,0.06); }
        .agent-avatar.online { box-shadow: 0 10px 30px rgba(50,220,130,0.08), 0 2px 6px rgba(0,0,0,0.6); background: linear-gradient(180deg,#0f432b,#06321f); color: #bff7d6; border-color: rgba(159,240,198,0.16); }
        @keyframes pulse { 0% { transform: scale(1); box-shadow: 0 8px 20px rgba(0,191,255,0.04); } 50% { transform: scale(1.03); box-shadow: 0 18px 40px rgba(0,191,255,0.12);} 100%{ transform: scale(1); box-shadow: 0 8px 20px rgba(0,191,255,0.04);} }

        .agent-meta { flex: 1; min-width: 0; }
        .agent-name { font-weight:800; color:#e9fbff; }
        .agent-sub { color:#9fb9c9; font-size:0.92rem; margin-top:4px; }

        .eta-box { display:flex; align-items:center; gap:8px; background: rgba(255,255,255,0.02); padding:8px 10px; border-radius:10px; border: 1px solid rgba(255,255,255,0.03); color:#dff8ff; min-width:86px; justify-content:center; }
        .eta-text { font-weight:800; color:#9ff0c6; }

        .chat-area { margin-top:12px; display:flex; flex-direction:column; gap:12px; min-height:160px; }

        .system-message {
          display:flex; align-items:flex-start; gap:12px; padding:12px; border-radius:10px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.02));
          color:#bfe8f0; border: 1px dashed rgba(255,255,255,0.02);
        }
        .connecting-msg { position:relative; overflow:visible; }
        .system-message .msg-col { display:flex; flex-direction:column; gap:6px; }
        .msg-line { font-weight:700; color: #e9fbff; }
        .msg-sub { color:#9fb9c9; font-size:0.9rem; }

        /* animated dots */
        .dots { display:flex; gap:6px; margin-left:auto; align-items:center; }
        .dots span { width:8px; height:8px; background:#7fe6ff; border-radius:50%; opacity:0.18; transform: translateY(0); animation: dotJump 1s infinite; }
        .dots span:nth-child(2) { animation-delay: 0.12s; }
        .dots span:nth-child(3) { animation-delay: 0.24s; }
        @keyframes dotJump { 0%{ transform: translateY(0); opacity:0.18 } 40% { transform: translateY(-8px); opacity: 1 } 100% { transform: translateY(0); opacity: 0.18 } }

        .chat-bubble { max-width: 78%; padding:12px 14px; border-radius:12px; color:#e9fbff; }
        .chat-bubble.agent { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04)); align-self:flex-start; box-shadow: 0 6px 30px rgba(0,0,0,0.5); font-weight:700; }
        .chat-bubble.user { background: linear-gradient(180deg,#00bfff14,#00a3ff10); align-self:flex-end; color:#021a24; font-weight:700; }
        .bubble-content { line-height:1.45; }

        .typing { display:inline-block; margin-left:8px; color:#9fb9c9; font-weight:600; font-style:italic; }

        .panel-actions { display:flex; gap:12px; margin-top:14px; align-items:center; justify-content:flex-end; }
        .start-btn {
          background: linear-gradient(180deg,#00bfff,#00a3ff);
          color:#042026; padding:12px 18px; border-radius:10px; border:none; font-weight:800; cursor:pointer;
          box-shadow: 0 8px 28px rgba(0,191,255,0.08);
        }
        .start-btn.busy { opacity:0.85; cursor:default; filter: saturate(0.9); }
        .start-btn[disabled] { pointer-events:none; opacity:0.8; }
        .help-link { background:transparent; border:0; color:#9fb9c9; text-decoration:underline; cursor:pointer; font-weight:700; padding:8px; }

        /* responsive */
        @media (max-width: 720px) {
          .live-main { padding: 0 10px; }
          .agent-row { gap:12px; }
          .agent-avatar { width:48px; height:48px; }
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .blob, .stars, .dots span, .agent-avatar.connecting { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LiveChatPage;
