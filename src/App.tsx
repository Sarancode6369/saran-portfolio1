import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Menu, X, ArrowUp, Github, Linkedin, Mail, Download,
  Code2, Server, Database, Brain, Cloud, Wrench, Users,
  MapPin, GraduationCap, Briefcase, Award, ChevronDown, Terminal,
} from "lucide-react";

import IdCard3D from "./components/3d/IdCard3D";
import HeroScene from "./components/3d/HeroScene";

const PROFILE = {
  name: "Saran V",
  title: "Junior Full Stack Developer",
  tagline: "Building practical web applications with clean code, thoughtful design, and user-focused experiences.",
  about: "I am an aspiring Junior Full Stack Developer with knowledge of Java, JavaScript, React.js, Spring Boot, SQL, and web development. I have worked on academic and personal projects and completed a Java Development Internship focused on Core Java and object-oriented programming. I am interested in building responsive user interfaces and reliable backend applications while continuing to improve my software development skills.",
  email: "saran6369v@gmail.com",
  location: "Manapparai, Tiruchirappalli District, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/saran-v-65bb31300",
  github: "https://github.com/Sarancode6369",
  hackerrank: "https://www.hackerrank.com/profile/saran6369v",
  resumeUrl: "/Saran_V5_Resume.pdf",
  education: {
    degree: "B.Tech — Information Technology",
    college: "J.J. College of Engineering and Technology, Trichy",
    year: "2026",
    cgpa: "7.90",
    class12: { school: "Government Higher Secondary School", year: "2022", score: "68%" },
    class10: { school: "Government Higher Secondary School", year: "2020", score: "78%" },
  },
  internship: {
    role: "Java Development Intern",
    company: "Igenuine Soft Solution",
    duration: "1 July 2025 – 30 July 2025",
    points: [
      "Practiced Core Java and object-oriented programming concepts through hands-on tasks.",
      "Built an Employee Payroll Management System as an internship project.",
    ],
  },
  certificates: [
    { name: "Dot Net Full Stack Certificate", period: "July 2025 – Present" },
    { name: "Full Stack Development", period: "August 2025 – Present" },
    { name: "Introduction to Bigdata", period: "October 2024 – Present" },
  ],
  projects: [
    { title: "CivicPath — Government Welfare Scheme Chatbot", description: "A chatbot that helps people find information about government welfare schemes.", tech: ["JavaScript", "AI / LLM APIs", "Web"] },
    { title: "AI Student Result Generation", description: "An application designed to generate student results using AI.", tech: ["AI Integration", "JavaScript", "Web"] },
    { title: "Blockchain-Based Decentralized Cloud Storage", description: "A decentralized file-storage project using IPFS with privacy-preserving access control.", tech: ["IPFS", "Blockchain", "Privacy"] },
    { title: "Flipkart Website Clone", description: "A website clone built using HTML and CSS.", tech: ["HTML5", "CSS3"] },
    { title: "Temperature Converter", description: "A temperature conversion web application built using HTML, CSS, and JavaScript.", tech: ["HTML5", "CSS3", "JavaScript"] },
  ],
  skills: {
    Frontend: ["React.js", "JavaScript", "HTML5", "CSS3"],
    Backend: ["Java", "Spring Boot", "REST APIs"],
    Database: ["MySQL", "SQL"],
    "AI Integration": ["LLM APIs", "Prompt Engineering"],
    Cloud: ["AWS / Vercel"],
    "Core CS": ["OOP", "DSA", "Collections", "Exception Handling", "Problem Solving"],
    Tools: ["Git", "GitHub"],
    "Soft Skills": ["Time Management", "Teamwork", "Communication", "Creativity"],
  },
};

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ---------- 3D Tilt Card ---------- */
function TiltCard({ children, className = "" }: { children: any; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section ---------- */
function Section({ id, children, className = "" }: { id: string; children: any; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <section id={id} ref={ref} className={`relative py-20 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      setScrolled(window.scrollY > 40);
      const ids = NAV_ITEMS.map((n) => n.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-white overflow-x-hidden antialiased">
      {/* Floating ambient orbs + depth layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-[3%] w-80 h-80 rounded-full bg-blue-600/8 blur-[110px] animate-pulse" style={{animationDuration:"6s"}} />
        <div className="absolute top-[40%] right-[5%] w-[28rem] h-[28rem] rounded-full bg-indigo-600/7 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[15%] w-72 h-72 rounded-full bg-cyan-500/6 blur-[100px] animate-pulse" style={{animationDuration:"8s"}} />
        <div className="absolute top-[70%] right-[25%] w-48 h-48 rounded-full bg-violet-500/5 blur-[80px]" />
        {/* subtle grid for depth */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-blue-500/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              SV
            </div>
            <span className="text-sm font-medium tracking-wide text-white/90 hidden sm:inline">Saran V</span>
          </button>
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-2 text-xs tracking-wider uppercase transition-colors relative ${activeSection === item.id ? "text-white" : "text-white/40 hover:text-white/75"}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3.5 right-3.5 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href={PROFILE.resumeUrl} download className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase border border-white/15 rounded-full hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/10 transition-all">
              <Download size={14} /> Resume
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-white/80" aria-label="Menu">
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden">
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }} onClick={() => scrollTo(item.id)}
                className="text-lg tracking-[0.2em] uppercase text-white/80">
                {item.label}
              </motion.button>
            ))}
            <a href={PROFILE.resumeUrl} download className="mt-4 inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase border border-white/20 rounded-full">
              <Download size={14} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== HERO 3D ========== */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-5 md:px-8 pt-20 pb-16 overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.92] mb-3">
              <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(59,130,246,0.25)]">
                {PROFILE.name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white/60 font-medium tracking-tight mb-6">
              {PROFILE.title}
            </h2>
            <p className="max-w-xl text-base md:text-lg text-white/40 leading-relaxed mb-10">
              {PROFILE.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-blue-50 hover:shadow-xl hover:shadow-white/20 transition-all hover:-translate-y-0.5">
                View My Projects
              </button>
              <a href={PROFILE.resumeUrl} download
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-sm font-medium rounded-full hover:bg-white/5 hover:border-blue-400/40 hover:-translate-y-0.5 transition-all">
                <Download size={16} /> Download Resume
              </a>
              <button onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-sm font-medium rounded-full hover:bg-white/5 hover:border-blue-400/40 hover:-translate-y-0.5 transition-all">
                Contact Me
              </button>
            </div>

            <div className="flex items-center gap-5">
              {[
                { href: PROFILE.github, icon: Github, label: "GitHub" },
                { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1"
                  aria-label={label}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right side - 3D Character Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px]">
              {/* Glow behind video */}
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full scale-90 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20 bg-[#0a0a12]">
                <video
                  src="/assets/hero-character.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover block"
                  style={{ aspectRatio: "16/10" }}
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-[2rem] border border-blue-500/15 pointer-events-none" />
              <div className="absolute -inset-6 rounded-[2.5rem] border border-blue-500/8 pointer-events-none hidden sm:block" />
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ========== ABOUT + 3D ID CARD ========== */}
      <Section id="about" className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">About Me</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Aspiring Full Stack Developer
              </h2>
              <p className="text-white/45 leading-relaxed mb-6">{PROFILE.about}</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 backdrop-blur">
                  <MapPin size={12} className="text-blue-400" /> Tamil Nadu, India
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 backdrop-blur">
                  <GraduationCap size={12} className="text-blue-400" /> Graduating 2026
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/15 blur-[100px] rounded-full pointer-events-none scale-110" />
              <IdCard3D />
            </div>
          </div>
        </div>
      </Section>

      {/* ========== SKILLS 3D ========== */}
      <Section id="skills" className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Technical Skills</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">Technologies & Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: "1200px" }}>
            {Object.entries(PROFILE.skills).map(([category, items], idx) => (
              <TiltCard key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/40 hover:shadow-blue-500/10 transition-all duration-300 h-full"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    {category === "Frontend" && <Code2 size={18} className="text-blue-400" />}
                    {category === "Backend" && <Server size={18} className="text-blue-400" />}
                    {category === "Database" && <Database size={18} className="text-blue-400" />}
                    {category === "AI Integration" && <Brain size={18} className="text-blue-400" />}
                    {category === "Cloud" && <Cloud size={18} className="text-blue-400" />}
                    {category === "Core CS" && <Terminal size={18} className="text-blue-400" />}
                    {category === "Tools" && <Wrench size={18} className="text-blue-400" />}
                    {category === "Soft Skills" && <Users size={18} className="text-blue-400" />}
                    <h3 className="text-sm font-medium text-white/90">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/50 border border-white/8">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== PROJECTS 3D TILT ========== */}
      <Section id="projects" className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
            {PROFILE.projects.map((project, idx) => (
              <TiltCard key={project.title}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/30 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/25 flex items-center justify-center mb-4 shadow-inner">
                    <Code2 size={18} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-white/40 border border-white/8">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== EXPERIENCE ========== */}
      <Section id="experience" className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Experience</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">Internship</h2>
          <div className="relative pl-8 border-l-2 border-blue-500/20">
            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20 shadow-lg shadow-blue-500/40" />
            <TiltCard>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 shadow-xl shadow-black/30" style={{ transform: "translateZ(20px)" }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">{PROFILE.internship.role}</h3>
                    <p className="text-blue-300/80 text-sm mt-0.5">{PROFILE.internship.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300/80">
                    <Briefcase size={12} /> {PROFILE.internship.duration}
                  </span>
                </div>
                <ul className="space-y-2 mt-4">
                  {PROFILE.internship.points.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-white/45">
                      <span className="text-blue-400/70 mt-1.5">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Award size={20} className="text-blue-400" /> Certificates
            </h3>
            <div className="grid sm:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
              {PROFILE.certificates.map((cert, i) => (
                <TiltCard key={cert.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 hover:border-blue-500/30 shadow-lg shadow-black/20 transition-all"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <p className="text-sm font-medium text-white/90 mb-1">{cert.name}</p>
                    <p className="text-xs text-white/35">{cert.period}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== EDUCATION ========== */}
      <Section id="education" className="px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Education</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">Academic Background</h2>
          <div className="space-y-5" style={{ perspective: "1000px" }}>
            <TiltCard>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-white/[0.03] to-transparent border border-white/10 shadow-xl shadow-blue-500/5"
                style={{ transform: "translateZ(20px)" }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">{PROFILE.education.degree}</h3>
                    <p className="text-white/45 text-sm mt-1">{PROFILE.education.college}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-300/80">Graduation {PROFILE.education.year}</p>
                    <p className="text-sm text-white/45 mt-0.5">CGPA {PROFILE.education.cgpa}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
            <div className="grid sm:grid-cols-2 gap-4">
              {[PROFILE.education.class12, PROFILE.education.class10].map((cls, i) => (
                <TiltCard key={i}>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 shadow-lg shadow-black/20"
                    style={{ transform: "translateZ(12px)" }}>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-1">{i === 0 ? "Class XII" : "Class X"}</p>
                    <p className="text-sm font-medium text-white/90">{cls.school}</p>
                    <p className="text-xs text-white/40 mt-1">{cls.year} — {cls.score}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== CONTACT ========== */}
      <Section id="contact" className="px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative">
            <p className="text-blue-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Let's connect</h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto">
              I'm currently seeking Junior Full Stack Developer opportunities. Feel free to reach out via email or connect on professional platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-blue-50 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all">
                <Mail size={16} /> {PROFILE.email}
              </a>
              {[
                { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: PROFILE.github, icon: Github, label: "GitHub" },
                { href: PROFILE.hackerrank, icon: Code2, label: "HackerRank" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/20 text-sm font-medium rounded-full hover:bg-white/5 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>
            <a href={PROFILE.resumeUrl} download className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <Download size={16} /> Download my resume (PDF)
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-5 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} Saran V. All rights reserved.</p>
          <p className="tracking-wide">Junior Full Stack Developer · Tamil Nadu, India</p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("home")}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/70 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
