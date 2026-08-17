"use client";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left: Text */}
        <div className="hero-text">
          <div className="hero-tag">66 QUESTIONS · 7 VIRTUES · 8 MINUTES</div>
          <h1 className="hero-title">
            Your soul has a<br />
            <span className="accent">signal.</span><br />
            Let&apos;s read it.
          </h1>
          <p className="hero-sub">
            Not a label. Not a type. A full seven-virtue profile — with an AI that
            actually talks with you about what your results mean in real life.
          </p>
          <div className="hero-cta-group">
            <a href="#pricing" className="btn-primary btn-lg">
              Discover Your Virtues — Free
            </a>
            <a href="#how-it-works" className="btn-ghost">
              See How It Works →
            </a>
          </div>
          <div className="hero-trust">
            <span><span className="check">✓</span> No sign-up</span>
            <span><span className="check">✓</span> AI report included</span>
            <span><span className="check">✓</span> 100% private</span>
          </div>
        </div>

        {/* Right: Dashboard Visualization */}
        <div className="hero-visual">
          <div className="dashboard">
            <div className="dash-header">
              <span className="dash-dot red"></span>
              <span className="dash-dot yellow"></span>
              <span className="dash-dot green"></span>
              <span className="dash-title">SOUL SCANNER v2.1</span>
            </div>
            <div className="dash-body">
              <div className="dash-status">
                <span className="status-label">STATUS:</span>
                <span className="status-value blink">WAITING FOR INPUT</span>
              </div>
              
              {/* Central heart */}
              <div className="dash-heart-container">
                <div className="heart-glow"></div>
                <svg className="heart-icon" viewBox="0 0 100 100" width="80" height="80">
                  <path d="M50 88 C25 65 5 50 5 30 C5 15 17 5 30 5 C38 5 45 10 50 18 C55 10 62 5 70 5 C83 5 95 15 95 30 C95 50 75 65 50 88Z" fill="#ff2d55"/>
                </svg>
                <div className="heart-pulse"></div>
              </div>

              {/* 7 virtue orbs */}
              <div className="virtue-orbs">
                {[
                  { name: "DET", color: "#ff2d55", angle: 0 },
                  { name: "BRV", color: "#ff9500", angle: 51 },
                  { name: "JUS", color: "#ffcc00", angle: 103 },
                  { name: "KND", color: "#34c759", angle: 154 },
                  { name: "PAT", color: "#00d4aa", angle: 206 },
                  { name: "INT", color: "#007aff", angle: 257 },
                  { name: "PER", color: "#af52de", angle: 309 },
                ].map((v) => (
                  <div
                    key={v.name}
                    className="virtue-orb"
                    style={{
                      background: v.color,
                      boxShadow: `0 0 12px ${v.color}66, 0 0 24px ${v.color}33`,
                      transform: `rotate(${v.angle}deg) translateY(-100px) rotate(-${v.angle}deg)`,
                    }}
                  >
                    <span>{v.name}</span>
                  </div>
                ))}
              </div>

              {/* Terminal lines */}
              <div className="dash-terminal">
                <div className="term-line"><span className="prompt">&gt;</span> calibrating ethical vectors...</div>
                <div className="term-line"><span className="prompt">&gt;</span> 7 channels detected</div>
                <div className="term-line"><span className="prompt">&gt;</span> response channel ready_</div>
              </div>

              {/* Scan lines */}
              <div className="dash-grid"></div>
              <div className="scan-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
