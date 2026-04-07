import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  FolderGit2,
  Share2,
  Rocket,
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Raleway:wght@300;400;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ab-container {
  width: 100%; min-height: 100vh;
  background: #00050a;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Raleway', sans-serif;
  overflow: hidden; position: relative;
}

.particle-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 1;
}
.dot { fill: #00d4ff; filter: drop-shadow(0 0 2px #00d4ff); animation: pulse var(--d) infinite ease-in-out; }
@keyframes pulse {
  0%, 100% { transform: translate(0, 0); opacity: 0.4; scale: 1; }
  50% { transform: translate(var(--x), var(--y)); opacity: 1; scale: 1.5; }
}

.top-brand {
  position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 12px; z-index: 30; cursor: pointer;
}
.k-icon {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #0052d4);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 18px;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.6);
  animation: logo-spin 10s linear infinite;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.top-brand:hover .k-icon { animation-play-state: paused; transform: rotate(0deg) scale(1.1); }
.k-name { font-family: 'Playfair Display', serif; color: #fff; font-size: 20px; letter-spacing: 3px; font-weight: 700; }
@keyframes logo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.card {
  width: 860px; height: 540px;
  position: relative; overflow: hidden; border-radius: 24px;
  background: rgba(0, 13, 26, 0.98);
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06);
  z-index: 10;
}

.fp {
  position: absolute; top: 0; width: 50%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 40px 50px; transition: opacity 0.4s;
}
.fp.lp { left: 0; } .fp.rp { right: 0; }

.iw { position: relative; margin-bottom: 16px; width: 100%; }
.iw input {
  width: 100%; height: 46px; padding: 12px 40px 4px 38px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px; color: #fff; outline: none; transition: 0.3s;
}
.iw input:focus { border-color: #0096ff; background: rgba(0, 150, 255, 0.04); }
.iw label { position: absolute; left: 38px; top: 50%; transform: translateY(-50%); font-size: 12px; color: #64748b; pointer-events: none; transition: 0.2s; }
.iw input:focus ~ label, .iw input:not(:placeholder-shown) ~ label { top: 8px; font-size: 9px; color: #00d4ff; font-weight: 700; text-transform: uppercase; }
.ic { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; }

.sbtn {
  width: 140px; height: 38px; border: none; border-radius: 4px;
  background: transparent; border: 1px solid #0096ff;
  color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
  cursor: pointer; transition: 0.3s; margin-top: 10px;
}
.sbtn:hover { background: #0096ff; box-shadow: 0 0 15px rgba(0, 150, 255, 0.3); }

.project-pulse {
  margin-top: 20px; width: 100%; height: 80px;
  background: rgba(0,0,0,0.2); border-radius: 8px;
  overflow: hidden; position: relative;
  display: flex; align-items: center; gap: 15px; padding: 0 15px;
}

.node-list {
  display: flex; gap: 15px; animation: scroll-nodes 10s linear infinite;
}

@keyframes scroll-nodes {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.node {
  min-width: 120px; padding: 8px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(0, 212, 255, 0.1); border-radius: 6px;
  font-size: 9px; color: #00d4ff; text-align: left;
}
.node span { display: block; color: #fff; font-size: 8px; opacity: 0.6; }

.ov {
  position: absolute; top: 0; left: 50%; width: 50%; height: 100%;
  z-index: 20; overflow: hidden; transition: transform 0.8s cubic-bezier(0.7, 0, 0.2, 1);
}
.card.sm .ov { transform: translateX(-100%); }
.ov-bg { position: absolute; inset: 0; background: linear-gradient(160deg, #001a33, #000814); }
.ov-c { position: relative; z-index: 5; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; color: #fff; }

.obtn { margin-top: 20px; width: 140px; height: 38px; background: transparent; border: 1px solid #fff; border-radius: 4px; color: #fff; cursor: pointer; transition: 0.3s; }
.obtn:hover { background: #fff; color: #000; }

.feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
.feat { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; }
`;

export default function KorvexAuth({ onLoginSuccess }) {
  const [isSign, setIsSign] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      cx: 45 + Math.random() * 10,
      cy: 45 + Math.random() * 10,
      r: Math.random() * 0.7 + 0.3,
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
      duration: Math.random() * 6 + 4,
    }));
    setDots(newDots);
  }, []);

  const handleAction = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="ab-container">
      <style>{CSS}</style>
      <svg
        className="particle-canvas"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {dots.map((dot) => (
          <circle
            key={dot.id}
            className="dot"
            cx={`${dot.cx}%`}
            cy={`${dot.cy}%`}
            r={dot.r}
            style={{
              "--x": `${dot.x}%`,
              "--y": `${dot.y}%`,
              "--d": `${dot.duration}s`,
            }}
          />
        ))}
      </svg>

      <div className="top-brand">
        <div className="k-icon">K</div>
        <span className="k-name">KORVEX</span>
      </div>

      <div className={`card ${isSign ? "sm" : ""}`}>
        <div className="fp lp" style={{ opacity: isSign ? 0 : 1 }}>
          <div className="fi">
            <h2 className="ft">Sign In</h2>
            <p className="fs">Access your project repository</p>
            <form onSubmit={handleAction}>
              <div className="iw">
                <input type="email" placeholder=" " required />
                <label>Email Address</label>
                <div className="ic">
                  <Mail size={15} />
                </div>
              </div>
              <div className="iw">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder=" "
                  required
                />
                <label>Password</label>
                <div className="ic">
                  <Lock size={15} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <button type="submit" className="sbtn">
                Connect
              </button>
            </form>
          </div>
        </div>

        <div className="fp rp" style={{ opacity: isSign ? 1 : 0 }}>
          <div className="fi">
            <h2 className="ft">Create Node</h2>
            <p className="fs">Start showcasing your work</p>
            <form onSubmit={handleAction}>
              <div className="iw">
                <input type="text" placeholder=" " required />
                <label>Username</label>
                <div className="ic">
                  <User size={15} />
                </div>
              </div>
              <div className="iw">
                <input type="email" placeholder=" " required />
                <label>Email</label>
                <div className="ic">
                  <Mail size={15} />
                </div>
              </div>
              <div className="iw">
                <input type="password" placeholder=" " required />
                <label>Password</label>
                <div className="ic">
                  <Lock size={15} />
                </div>
              </div>
              <button type="submit" className="sbtn">
                Join Network
              </button>
            </form>
          </div>
        </div>

        <div className="ov">
          <div className="ov-bg" />
          <div className="ov-c">
            <h2 className="ft" style={{ fontSize: "28px" }}>
              {isSign ? "Showcase Power" : "Project Central"}
            </h2>
            <p className="fs" style={{ color: "rgba(255,255,255,0.6)" }}>
              The ultimate ecosystem to upload, describe, and share your project
              architecture.
            </p>
            <div className="feature-grid">
              <div className="feat">
                <FolderGit2 size={14} color="#00d4ff" /> Upload Docs
              </div>
              <div className="feat">
                <Share2 size={14} color="#00d4ff" /> Public Share
              </div>
              <div className="feat">
                <Rocket size={14} color="#00d4ff" /> Deploy Idea
              </div>
            </div>
            <div className="project-pulse">
              <div className="node-list">
                <div className="node">
                  AI Chatbot <span>Active Analysis</span>
                </div>
                <div className="node">
                  E-Commerce <span>System Built</span>
                </div>
                <div className="node">
                  Blockchain <span>Node Uploaded</span>
                </div>
                <div className="node">
                  AI Chatbot <span>Active Analysis</span>
                </div>
              </div>
            </div>
            <button className="obtn" onClick={() => setIsSign(!isSign)}>
              {isSign ? "Back to Login" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
