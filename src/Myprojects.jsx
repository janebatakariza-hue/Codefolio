import React from "react";
import { 
  LayoutDashboard, FolderGit2, Compass, Bookmark, LogOut, Plus, 
  Eye, Rocket, Zap, Clock, MoreVertical, Github
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CSS = `
/* CSS VARS AND SIDEBAR MATCH REFERENCE EXACTLY */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Raleway:wght@300;400;600;700&display=swap');
:root { --bg-deep: #00050a; --card-bg: rgba(0, 13, 26, 0.98); --neon-blue: #00d4ff; --text-dim: #94a3b8; --border: rgba(255, 255, 255, 0.08); }
.app-wrapper { display: flex; height: 100vh; width: 100vw; background: var(--bg-deep); font-family: 'Raleway', sans-serif; color: white; overflow: hidden; }
.sidebar { width: 240px; background: rgba(0, 8, 15, 1); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 30px 0; flex-shrink: 0; }
.logo-area { display: flex; align-items: center; gap: 12px; padding: 0 25px 40px; }
.k-mini-icon { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #00d4ff, #0052d4); display: flex; align-items: center; justify-content: center; font-weight: 800; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 14px 25px; color: var(--text-dim); cursor: pointer; transition: 0.3s; font-size: 14px; }
.nav-item:hover, .nav-item.active { color: var(--neon-blue); background: rgba(0, 212, 255, 0.05); }
.nav-item.active { border-right: 2px solid var(--neon-blue); }

.main-stage { flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 40px; }
.vault-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
.btn-neon { background: transparent; border: 1px solid var(--neon-blue); color: var(--neon-blue); padding: 10px 20px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

/* PROJECT VAULT LIST */
.project-list { display: flex; flex-direction: column; gap: 15px; }
.vault-card { 
  background: var(--card-bg); border: 1px solid var(--border); padding: 25px; border-radius: 12px; 
  display: flex; justify-content: space-between; align-items: center; transition: 0.3s;
}
.vault-card:hover { border-color: var(--neon-blue); background: rgba(0, 212, 255, 0.02); }
.node-info h4 { font-size: 18px; margin-bottom: 5px; font-family: 'Playfair Display'; }
.node-meta { font-size: 12px; color: var(--text-dim); display: flex; gap: 15px; }
.status-indicator { width: 8px; height: 8px; border-radius: 50%; background: var(--neon-blue); box-shadow: 0 0 10px var(--neon-blue); }
`;

export default function KorvexMyProjects({ onLogout }) {
  const navigate = useNavigate();
  const myProjects = [
    { name: "Nexus Core v1", type: "System Node", sync: "2m ago" },
    { name: "Alpha Edge Worker", type: "Edge Function", sync: "1h ago" },
    { name: "Data Streamer", type: "Ingestion Hub", sync: "12h ago" },
  ];

  return (
    <div className="app-wrapper">
      <style>{CSS}</style>
      <aside className="sidebar">
        <div className="logo-area"><div className="k-mini-icon">K</div><span style={{ fontFamily: "Playfair Display", letterSpacing: "2px" }}>KORVEX</span></div>
        <div className="nav-item" onClick={() => navigate("/dashboard")}><LayoutDashboard size={18} /> Dashboard</div>
        <div className="nav-item active" onClick={() => navigate("/projects")}><FolderGit2 size={18} /> My Projects</div>
        <div className="nav-item" onClick={() => navigate("/explore")}><Compass size={18} /> Explore</div>
        <div className="nav-item" onClick={onLogout} style={{ marginTop: "auto" }}><LogOut size={18} /> De-authorize</div>
      </aside>

      <main className="main-stage">
        <div className="vault-header">
          <div>
            <h1 style={{ fontFamily: "Playfair Display", fontSize: "36px" }}>Project Vault</h1>
            <p style={{ color: "var(--text-dim)", fontSize: "14px" }}>Manage your private and public encrypted nodes.</p>
          </div>
          <button className="btn-neon"><Plus size={16} /> Initialize New Node</button>
        </div>

        <div className="project-list">
          {myProjects.map((p, i) => (
            <div key={i} className="vault-card">
              <div className="node-info">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div className="status-indicator" />
                  <h4>{p.name}</h4>
                </div>
                <div className="node-meta">
                  <span>{p.type}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> Sync: {p.sync}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px", color: "var(--text-dim)" }}>
                <Github size={18} style={{ cursor: "pointer" }} />
                <Rocket size={18} style={{ cursor: "pointer", color: "var(--neon-blue)" }} />
                <MoreVertical size={18} style={{ cursor: "pointer" }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}