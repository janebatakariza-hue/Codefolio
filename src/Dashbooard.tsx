import React from "react";
import {
  LayoutDashboard, FolderGit2, Compass, Bookmark, LogOut, Plus, 
  MessageSquare, Eye, Share2, Rocket, Zap, Clock
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Raleway:wght@300;400;600;700&display=swap');
:root { 
  --bg-deep: #00050a; 
  --card-bg: rgba(0, 13, 26, 0.98); 
  --neon-blue: #00d4ff; 
  --text-dim: #94a3b8; 
  --border: rgba(255, 255, 255, 0.08); 
}

.app-wrapper { display: flex; height: 100vh; width: 100vw; background: var(--bg-deep); font-family: 'Raleway', sans-serif; color: white; overflow: hidden; }
.sidebar { width: 240px; background: rgba(0, 8, 15, 1); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 30px 0; flex-shrink: 0; }
.logo-area { display: flex; align-items: center; gap: 12px; padding: 0 25px 40px; }
.k-mini-icon { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #00d4ff, #0052d4); display: flex; align-items: center; justify-content: center; font-weight: 800; }

.nav-item { display: flex; align-items: center; gap: 12px; padding: 14px 25px; color: var(--text-dim); cursor: pointer; transition: 0.3s; font-size: 14px; }
.nav-item:hover, .nav-item.active { color: var(--neon-blue); background: rgba(0, 212, 255, 0.05); }
.nav-item.active { border-right: 2px solid var(--neon-blue); }

.main-stage { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }

/* ── ANIMATED HEADER SECTION ── */
.dynamic-header { 
  position: relative; 
  height: 120px; 
  width: 100%; 
  overflow: hidden; 
  background: linear-gradient(to bottom, #001220, var(--bg-deep)); 
  border-bottom: 1px solid var(--border); 
  flex-shrink: 0; 
}

/* Innovation: Visual Background Scan Grid */
.dynamic-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
  opacity: 0.2;
  animation: grid-drift 20s linear infinite;
}

@keyframes grid-drift {
  from { background-position: 0 0; }
  to { background-position: 30px 30px; }
}

.core-node { 
  position: absolute; 
  left: 50%; 
  top: 50%; 
  transform: translate(-50%, -50%); 
  width: 60px; 
  height: 60px; 
  background: var(--neon-blue); 
  border-radius: 50%; 
  box-shadow: 0 0 40px var(--neon-blue); 
  animation: core-pulse 4s infinite ease-in-out; 
  z-index: 2;
}

/* Innovation: Signal Echo Rings */
.core-node::after {
  content: '';
  position: absolute;
  inset: -20px;
  border: 1px solid var(--neon-blue);
  border-radius: 50%;
  animation: signal-echo 3s infinite;
  opacity: 0;
}

@keyframes signal-echo {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

@keyframes core-pulse { 0%, 100% { scale: 1; opacity: 0.8; } 50% { scale: 1.15; opacity: 1; } }

.stream-line { 
  position: absolute; 
  height: 1px; 
  background: linear-gradient(90deg, transparent, var(--neon-blue), transparent); 
  width: 150px; 
  opacity: 0.4; 
  animation: stream 4s infinite linear; 
}
@keyframes stream { 
  from { transform: translateX(-200%) translateY(0); } 
  to { transform: translateX(600%) translateY(0); } 
}

.dashboard-content { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
.stat-box { background: var(--card-bg); border: 1px solid var(--border); padding: 20px; border-radius: 12px; }
.stat-label { font-size: 11px; text-transform: uppercase; color: var(--text-dim); letter-spacing: 1px; }
.stat-value { font-size: 28px; font-weight: 700; color: var(--neon-blue); margin: 8px 0; }
.stat-delta { font-size: 11px; color: #5dc886; }

.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; }
.project-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 25px; transition: 0.3s; position: relative; overflow: hidden; }
.project-card:hover { border-color: var(--neon-blue); transform: translateY(-3px); }
.p-tag { font-size: 10px; background: rgba(0, 212, 255, 0.1); color: var(--neon-blue); padding: 4px 10px; border-radius: 20px; font-weight: 600; }
.p-tag.wip { background: rgba(232, 184, 75, 0.1); color: #E8B84B; }
.p-tag.private { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
.tech-pill { font-size: 10px; color: var(--text-dim); border: 1px solid var(--border); padding: 2px 8px; border-radius: 4px; margin-right: 6px; }

.btn-neon { background: transparent; border: 1px solid var(--neon-blue); color: var(--neon-blue); padding: 8px 18px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
.btn-neon:hover { background: var(--neon-blue); color: #000; }

.activity-section { 
  margin-top: 50px; background: rgba(255,255,255,0.02); border-radius: 16px; 
  padding: 30px; border: 1px solid var(--border); position: relative; overflow: hidden;
}

@keyframes pulse-signal {
  0% { transform: scaleX(0); opacity: 0; left: 0; }
  20% { opacity: 0.8; }
  100% { transform: scaleX(1); opacity: 0; left: 100%; }
}

.activity-item { 
  display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid var(--border); 
  font-size: 14px; position: relative; 
}

.activity-item::after {
  content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px;
  background: var(--neon-blue); transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 0 10px var(--neon-blue);
}
.activity-item:hover::after { transform: scaleX(1); }
.activity-item:hover { background: linear-gradient(90deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%); transition: 0.2s; }

.pulse-indicator {
  position: absolute; top: 0; left: 0; height: 100%; width: 2px;
  background: var(--neon-blue); box-shadow: 0 0 15px var(--neon-blue);
  animation: pulse-signal 3s infinite linear; pointer-events: none;
}
`;

export default function KorvexDashboard({ onLogout }) {
  const stats = [
    { label: "Total Projects", value: "24", delta: "↑ 3 this month" },
    { label: "Public Nodes", value: "16", delta: "↑ 2 this week" },
    { label: "Network Views", value: "1.4K", delta: "↑ 12% vs last week" },
    { label: "Saved Archives", value: "87", delta: "↓ 4 this week" },
  ];

  const projects = [
    { name: "NLP Classifier API", status: "Public", desc: "Deep learning REST API utilizing BERT for high-precision sentiment analysis and intent detection.", tags: ["Python", "FastAPI", "PyTorch"], views: "342", saves: "28" },
    { name: "E-Commerce Dashboard", status: "Public", desc: "Full-stack platform with real-time inventory tracking and dynamic payment processing.", tags: ["React", "Node.js", "MongoDB"], views: "892", saves: "45" },
    { name: "Portfolio Analytics", status: "In Progress", desc: "View tracking and engagement dashboards for developer portfolios.", tags: ["TypeScript", "Recharts"], views: "56", saves: "9" },
    { name: "Auth Microservice", status: "Private", desc: "JWT + OAuth2 microservice — secure architecture for distributed systems.", tags: ["Go", "Docker"], views: "—", saves: "—" },
  ];

  const activity = [
    { text: "Your NLP Classifier API received 18 new views today.", time: "2 hours ago", icon: <Eye size={14} /> },
    { text: "You uploaded a new version of Portfolio Analytics.", time: "Yesterday", icon: <Rocket size={14} /> },
    { text: "User sara_dev bookmarked your E-Commerce Dashboard.", time: "2 days ago", icon: <Bookmark size={14} /> },
  ];

  return (
    <div className="app-wrapper">
      <style>{CSS}</style>

      <aside className="sidebar">
        <div className="logo-area">
          <div className="k-mini-icon">K</div>
          <span style={{ fontFamily: "Playfair Display", letterSpacing: "2px" }}>KORVEX</span>
        </div>
        <div className="nav-item active"><LayoutDashboard size={18} /> Dashboard</div>
        <div className="nav-item"><FolderGit2 size={18} /> My Projects</div>
        <div className="nav-item"><Compass size={18} /> Explore</div>
        <div className="nav-item"><MessageSquare size={18} /> AI Assistant</div>
        <div className="nav-item" onClick={onLogout} style={{ marginTop: "auto" }}><LogOut size={18} /> De-authorize</div>
      </aside>

      <main className="main-stage">
        {/* ── THE INNOVATIVE ANIMATED HEADER ── */}
        <header className="dynamic-header">
          <div className="core-node" />
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="stream-line"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 40,
              fontSize: "10px",
              color: "var(--neon-blue)",
              fontWeight: "700",
              letterSpacing: "1px",
              zIndex: 3
            }}
          >
            SYSTEM_STATUS: STABLE // CORE_SYNC_ACTIVE
          </div>
        </header>

        <div className="dashboard-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "28px" }}>System Overview</h2>
            <button className="btn-neon"><Plus size={16} /> New Project Node</button>
          </div>

          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-box">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-delta">{s.delta}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: "Playfair Display", marginBottom: "20px" }}>Recent Deployments</h3>
          <div className="project-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <span className={`p-tag ${p.status === "In Progress" ? "wip" : p.status === "Private" ? "private" : ""}`}>{p.status}</span>
                  <Zap size={14} color={p.status === "Private" ? "#475569" : "var(--neon-blue)"} />
                </div>
                <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>{p.name}</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "13px", lineHeight: "1.5", marginBottom: "15px" }}>{p.desc}</p>
                <div style={{ marginBottom: "20px" }}>
                  {p.tags.map((t, ti) => <span key={ti} className="tech-pill">{t}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "15px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "var(--text-dim)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Eye size={12} /> {p.views}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Bookmark size={12} /> {p.saves}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <Share2 size={14} style={{ cursor: "pointer", color: "var(--text-dim)" }} />
                    <Rocket size={14} style={{ cursor: "pointer", color: "var(--neon-blue)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="activity-section">
            <div className="pulse-indicator" />
            <h3 style={{ fontFamily: "Playfair Display", marginBottom: "20px", fontSize: "18px" }}>Network Pulse</h3>
            {activity.map((a, i) => (
              <div key={i} className="activity-item">
                <div style={{ color: "var(--neon-blue)", marginTop: "2px" }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "white" }}>{a.text}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={10} /> {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}