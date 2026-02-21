import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  Frontend: ["React", "Redux", "Tailwind CSS", "Material UI"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Microservices"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL"],
  "DevOps & Tools": ["Azure DevOps", "Git", "CI/CD", "Linux", "Databricks Apps"],
  Security: ["JWT", "SAML SSO", "OAuth", "Passport.js"],
};

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Jio Platforms Limited",
    period: "January 2024 – Present",
    color: "#f59e0b",
    location: "Navi-Mumbai, Maharashtra",
    highlights: [
      "Built Jio Launchpad, an internet-facing centralized authorization and access management platform serving ~5,000 daily active users with role-based visibility and integrated application metadata.",
      "Designed a workflow scheduler using MongoDB and Node.js to automate Python-based data migration scripts from Kafka, Hive, and RDBMS to ADLS, improving operational efficiency by 40%.",
      "Developed a centralized Jio Analytics Dashboard using React and FastAPI to track job executions across multiple teams with job, failure, task-level, and historical analytics.",
      "Optimized backend APIs with MongoDB aggregations and improved SQL queries, reducing API response time by approximately 70%.",
      "Built a library of reusable React and Tailwind CSS components including high-performance Data Tables with server-side filtering, sorting, pagination, and editable rows.",
      "Integrated OIAM-based authentication using SAML and Passport.js, delivering secure enterprise-compliant SSO across applications.",
      "Integrated Azure DevOps REST APIs to automate repository creation, access management, pipeline executions, and deployment log monitoring.",
      "Mentored interns through onboarding, code reviews, and engineering best practices.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Agro-Tech Platform",
    tech: ["React", "Node.js", "Python", "Machine Learning"],
    description:
      "B2B & C2C e-commerce platform for agricultural products enabling seamless transactions. Developed and enhanced ML models for crop recommendation, prediction, and disease detection achieving 80–85% accuracy.",
    icon: "🌾",
    color: "#10b981",
  },
  {
    title: "Face Recognition Attendance",
    tech: ["Python", "OpenCV", "Machine Learning"],
    description:
      "Real-time facial recognition system detecting 5–7 faces simultaneously at 90% accuracy, integrated with a secure database for automated attendance tracking.",
    icon: "🎯",
    color: "#6366f1",
  },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(8,10,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,158,11,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#f59e0b", letterSpacing: 1 }}>
          PT<span style={{ color: "#e2e8f0", fontSize: 13, fontFamily: "monospace", marginLeft: 6 }}>/ dev</span>
        </div>

        {/* Desktop */}
        <div style={{ display: "flex", gap: 36 }} className="nav-desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 1.5,
                color: active === link.toLowerCase() ? "#f59e0b" : "#94a3b8",
                textTransform: "uppercase",
                transition: "color 0.3s",
                padding: "4px 0",
              }}
              onMouseEnter={e => e.target.style.color = "#f59e0b"}
              onMouseLeave={e => e.target.style.color = active === link.toLowerCase() ? "#f59e0b" : "#94a3b8"}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#f59e0b", fontSize: 24 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(8,10,20,0.98)", padding: "16px 5% 24px",
          borderTop: "1px solid rgba(245,158,11,0.2)",
        }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 14, letterSpacing: 2,
              color: "#94a3b8", textTransform: "uppercase", padding: "12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Full-Stack Developer", "MERN Stack Engineer", "React Specialist", "Python FastAPI Developer", "Backend Developer"];
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    let timeout;
    if (!deleting && typed === word) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed === "") {
      setDeleting(false);
      setWIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setTyped(deleting ? word.slice(0, typed.length - 1) : word.slice(0, typed.length + 1));
      }, deleting ? 50 : 80);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, wIdx]);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #080a14 0%, #0d1528 50%, #080a14 100%)",
        position: "relative", overflow: "hidden",
        padding: "0 5%",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "2%",
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1.5, background: "#f59e0b" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: "#f59e0b", textTransform: "uppercase" }}>
            Available for opportunities
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 7vw, 84px)",
          fontWeight: 700, lineHeight: 1.05,
          color: "#f1f5f9", margin: "0 0 8px",
        }}>
          Prem
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 7vw, 84px)",
          fontWeight: 700, lineHeight: 1.05,
          color: "#f59e0b", margin: "0 0 28px",
          WebkitTextStroke: "1px rgba(245,158,11,0.3)",
        }}>
          Tatkari
        </h1>

        <div style={{ height: 40, marginBottom: 28 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "#94a3b8", letterSpacing: 1,
          }}>
            {typed}
            <span style={{ color: "#f59e0b", animation: "blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        <p style={{
          fontFamily: "'Lora', serif", fontSize: "clamp(15px, 1.8vw, 17px)",
          color: "#64748b", maxWidth: 580, lineHeight: 1.8, marginBottom: 48,
        }}>
          2+ years crafting scalable web applications with the MERN stack, Python, and FastAPI.
          Passionate about backend optimization, clean architecture, and intuitive user experiences.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#f59e0b", color: "#080a14",
              border: "none", borderRadius: 4, cursor: "pointer",
              padding: "14px 32px", fontFamily: "'DM Mono', monospace",
              fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.target.style.background = "#fbbf24"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#f59e0b"; e.target.style.transform = "translateY(0)"; }}
          >
            View Work
          </button>
          <a
            href="mailto:tatkariprem6801@gmail.com"
            style={{
              background: "transparent", color: "#f59e0b",
              border: "1.5px solid rgba(245,158,11,0.5)", borderRadius: 4,
              padding: "14px 32px", fontFamily: "'DM Mono', monospace",
              fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.3s", display: "inline-block",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#f59e0b"; e.target.style.background = "rgba(245,158,11,0.08)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.background = "transparent"; }}
          >
            Contact Me
          </a>
        </div>

        <div style={{ display: "flex", gap: 32, marginTop: 72, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[["2+", "Years Experience"], ["5K+", "Daily Active Users"], ["70%", "API Speedup"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#f59e0b" }}>{num}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#64748b", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080a14; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080a14; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 3px; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function SectionHeader({ label, title }) {
  return (
    <FadeIn>
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 24, height: 1.5, background: "#f59e0b" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#f59e0b", textTransform: "uppercase" }}>{label}</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.1 }}>
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "110px 5%", background: "#080a14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Career" title="Work Experience" />
        {EXPERIENCE.map((job, i) => (
          <FadeIn key={i} delay={0.1}>
            <div style={{
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: 12, padding: "40px 44px",
              background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(8,10,20,0) 60%)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: job.color, borderRadius: "4px 0 0 4px" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>{job.role}</h3>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: job.color, letterSpacing: 1 }}>{job.company}</div>
                </div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#475569",
                  background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 4, padding: "6px 14px", letterSpacing: 1,
                }}>
                  {job.period}
                </div>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {job.highlights.map((h, j) => (
                  <li key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: job.color, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 15, color: "#94a3b8", lineHeight: 1.7 }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "110px 5%", background: "linear-gradient(180deg, #080a14 0%, #0a0e1c 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Portfolio" title="Technical Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "36px 32px",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.4s ease", cursor: "default",
                  height: "100%",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = p.color + "40";
                  e.currentTarget.style.background = `${p.color}08`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 14 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 14.5, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1,
                      color: p.color, background: `${p.color}15`,
                      border: `1px solid ${p.color}30`, borderRadius: 4, padding: "4px 10px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "110px 5%", background: "#080a14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Expertise" title="Skills & Technologies" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <FadeIn key={cat} delay={i * 0.07}>
              <div style={{
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "28px 28px",
                background: "rgba(255,255,255,0.015)",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2.5, color: "#f59e0b", textTransform: "uppercase", marginBottom: 18 }}>{cat}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((s) => (
                    <span key={s} style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      color: "#94a3b8", background: "rgba(148,163,184,0.07)",
                      border: "1px solid rgba(148,163,184,0.12)", borderRadius: 4, padding: "5px 11px",
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.target.style.color = "#f1f5f9"; e.target.style.borderColor = "rgba(245,158,11,0.4)"; }}
                      onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.borderColor = "rgba(148,163,184,0.12)"; }}
                    >{s}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Education & Certs */}
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <div style={{ border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "28px 28px", background: "rgba(245,158,11,0.03)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2.5, color: "#f59e0b", textTransform: "uppercase", marginBottom: 16 }}>Education</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f1f5f9", fontWeight: 600, marginBottom: 6 }}>B.E. Information Technology</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 14, color: "#64748b", marginBottom: 4 }}>Datta Meghe College of Engineering</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#f59e0b" }}>CGPA: 8.25 · 2019 – 2023</div>
            </div>
            <div style={{ border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "28px 28px", background: "rgba(99,102,241,0.03)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2.5, color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>Certifications</div>
              {[["Software Development Training", "Q Spiders · Oct–Dec 2023 · Java, J2EE, SQL, MySQL"], ["React Basics Certificate", "Meta via Coursera · 2023 · React, Hooks, Component Architecture"]].map(([title, sub]) => (
                <div key={title} style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 15, color: "#f1f5f9", fontWeight: 500 }}>{title}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#64748b", marginTop: 3 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  // const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend (FastAPI / EmailJS / Formspree)
    // setSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: "110px 5% 80px", background: "linear-gradient(180deg, #080a14 0%, #060810 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Get In Touch" title="Let's Work Together" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56 }} className="contact-grid">
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 40 }}>
                I'm currently open to new opportunities. Whether you have a project in mind or just want to connect — my inbox is always open.
              </p>
              {[
                ["📧", "Email", "tatkariprem6801@gmail.com", "mailto:tatkariprem6801@gmail.com"],
                ["📱", "Phone", "+91 8806828892", "tel:+918806828892"],
                ["💼", "LinkedIn", "linkedin.com/prem-tatkari", "https://linkedin.com/prem-tatkari"],
                ["🐙", "GitHub", "github.com/prem6801-code", "https://github.com/prem6801-code"],
              ].map(([icon, label, value, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 14, marginBottom: 18,
                  textDecoration: "none",
                  padding: "12px 16px", borderRadius: 8,
                  border: "1px solid transparent",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)"; e.currentTarget.style.background = "rgba(245,158,11,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 14, color: "#94a3b8", marginTop: 2 }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* FORM HIDDEN - Uncomment below + backend integration to re-enable */}
          {/* <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              ... Name, Email, Message fields + Send button ...
            </form>
          </FadeIn> */}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "80px auto 0", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#334155" }}>© 2024 Prem Tatkari. Built with React + Tailwind.</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#334155" }}>Thane, Maharashtra · India</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#080a14", minHeight: "100vh" }}>
      <Navbar active={activeSection} />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}