import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Compass,
  LogOut,
  Search,
  Globe,
  Cpu,
  Shield,
  Zap,
  Eye,
  Rocket,
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

/* ── LAYOUT & GLOBAL ANIMATIONS ── */
.app-wrapper { 
  display: flex; 
  height: 100vh; 
  width: 100vw; 
  background: var(--bg-deep); 
  font-family: 'Raleway', sans-serif; 
  color: white; 
  overflow: hidden; 
}

/* ── DYNAMIC SIDEBAR ── */
.sidebar { 
  width: 240px; 
  background: rgba(0, 8, 15, 1); 
  border-right: 1px solid var(--border); 
  display: flex; 
  flex-direction: column; 
  padding: 30px 0; 
  flex-shrink: 0; 
  z-index: 10;
}

.nav-item { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  padding: 14px 25px; 
  color: var(--text-dim); 
  cursor: pointer; 
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  font-size: 14px; 
  position: relative;
}

.nav-item:hover {
  color: white;
  background: rgba(0, 212, 255, 0.03);
  padding-left: 32px;
}

.nav-item.active { 
  color: var(--neon-blue); 
  background: rgba(0, 212, 255, 0.07); 
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 3px;
  background: var(--neon-blue);
  box-shadow: 0 0 15px var(--neon-blue);
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

/* ── SEARCH AREA ── */
.explore-header { 
  padding: 60px 40px 40px; 
  background: radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.1), transparent 70%); 
  text-align: center;
  animation: gradient-drift 8s infinite alternate;
}

@keyframes gradient-drift {
  from { background-position: 0% 0%; }
  to { background-position: 100% 20%; }
}

.search-container { 
  max-width: 700px; 
  margin: 30px auto; 
  position: relative; 
}

.search-input { 
  width: 100%; 
  background: rgba(255, 255, 255, 0.02); 
  border: 1px solid var(--border); 
  padding: 18px 25px 18px 55px; 
  border-radius: 50px; 
  color: white; 
  font-size: 16px; 
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
}

.search-input:focus { 
  outline: none; 
  border-color: var(--neon-blue); 
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.15); 
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.search-icon { 
  position: absolute; 
  left: 20px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: var(--neon-blue); 
  transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.search-container:focus-within .search-icon {
  transform: translateY(-50%) rotate(90deg) scale(1.2);
}

/* ── CATEGORY PILLS ── */
.category-pill { 
  padding: 8px 20px; 
  border: 1px solid var(--border); 
  border-radius: 20px; 
  font-size: 13px; 
  cursor: pointer; 
  transition: 0.3s; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  color: var(--text-dim); 
}

.category-pill:hover {
  transform: translateY(-3px);
  border-color: var(--neon-blue);
  color: white;
}

.category-pill.active { 
  color: #000; 
  border-color: var(--neon-blue); 
  background: var(--neon-blue); 
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

/* ── CARD GRID ── */
.explore-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
  gap: 25px; 
  padding: 0 40px 60px; 
}

.explore-card { 
  background: var(--card-bg); 
  border: 1px solid var(--border); 
  border-radius: 20px; 
  padding: 25px; 
  transition: 0.5s cubic-bezier(0.2, 1, 0.2, 1);
  opacity: 0;
  animation: glide-up 0.8s forwards;
}

@keyframes glide-up {
  from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.explore-card:hover { 
  border-color: var(--neon-blue); 
  transform: translateY(-10px); 
  box-shadow: 0 20px 40px rgba(0,0,0,0.6); 
  background: rgba(0, 20, 40, 0.95);
}

.rocket-anim { transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.explore-card:hover .rocket-anim { transform: translate(5px, -5px) scale(1.2); color: var(--neon-blue); }
`;

export default function KorvexExplore({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCat, setActiveCat] = useState("All");

  const categories = [
    { name: "All", icon: <Globe size={14} /> },
    { name: "Machine Learning", icon: <Cpu size={14} /> },
    { name: "Web Systems", icon: <Shield size={14} /> },
    { name: "Blockchain", icon: <Zap size={14} /> },
  ];

  const exploreProjects = [
    { title: "NLP Classifier API", author: "alex-johnson", tags: ["BERT", "PyTorch"], delay: "0.1s" },
    { title: "Stock Trend Predictor", author: "quantdev_k", tags: ["LSTM", "Keras"], delay: "0.2s" },
    { title: "Auth Microservice", author: "sec_vault", tags: ["Go", "OAuth2"], delay: "0.3s" },
    { title: "Nexus v1 Core", author: "korvex_sys", tags: ["Internal", "Sync"], delay: "0.4s" },
  ];

  return (
    <div className="app-wrapper">
      <style>{CSS}</style>
      
      {/* SIDEBAR (DYNAMIC) */}
      <aside className="sidebar">
        <div style={{ padding: "0 25px 40px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #00d4ff, #0052d4)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "800", boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)" }}>K</div>
          <span style={{ fontFamily: "Playfair Display", letterSpacing: "2px", fontWeight: "bold" }}>KORVEX</span>
        </div>
        
        <div className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`} onClick={() => navigate("/dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </div>
        <div className="nav-item">
          <FolderGit2 size={18} /> My Projects
        </div>
        <div className={`nav-item ${location.pathname === "/explore" ? "active" : ""}`} onClick={() => navigate("/explore")}>
          <Compass size={18} /> Explore
        </div>
        
        <div className="nav-item" onClick={onLogout} style={{ marginTop: "auto" }}>
          <LogOut size={18} /> De-authorize
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <section className="explore-header">
          <h1 style={{ fontFamily: "Playfair Display", fontSize: "42px", letterSpacing: "-1px" }}>
            Discover Innovation
          </h1>
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search the global project nexus..."
            />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "50px" }}>
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`category-pill ${activeCat === cat.name ? "active" : ""}`}
                onClick={() => setActiveCat(cat.name)}
              >
                {cat.icon} {cat.name}
              </div>
            ))}
          </div>
        </section>

        <div className="explore-grid">
          {exploreProjects.map((p, i) => (
            <div
              key={i}
              className="explore-card"
              style={{ animationDelay: p.delay }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#111", border: "1px solid var(--neon-blue)" }} />
                <span style={{ fontSize: "12px", color: "var(--neon-blue)", fontWeight: "600" }}>
                  @{p.author}
                </span>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "12px", fontFamily: "Playfair Display" }}>
                {p.title}
              </h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "1px solid var(--border)",
                      color: "var(--text-dim)"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "15px", borderTop: "1px solid var(--border)", fontSize: "12px", color: "var(--text-dim)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Eye size={12} /> 1.2k
                </span>
                <Rocket className="rocket-anim" size={14} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}