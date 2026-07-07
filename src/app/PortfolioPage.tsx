import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Download,
  ArrowRight,
  Terminal,
  Brain,
  Database,
  Cloud,
  BarChart3,
  BarChart2,
  Code2,
  Quote,
  UserCircle2,
  Sun,
  Moon,
  Layers,
  Cpu,
  Wrench,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  // TechIcon icons
  Coffee,
  Bot,
  MessageSquare,
  CheckCircle2,
  Search,
  BookOpen,
  Tag,
  Sigma,
  Link2,
  GitBranch,
  Table2,
  Grid3x3,
  TrendingUp,
  Activity,
  Zap,
  Flame,
  Wind,
  Globe,
  Monitor,
  Palette,
  FlaskConical,
  Hash,
} from "lucide-react";
import { useDarkMode } from "./Root";
import { projects, type ProjectCategory, CATEGORY_LABELS } from "../data/projects";
import {
  EMAIL_ADDRESS,
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  ORG_LOGOS,
  RESUME_URL,
  TESTIMONIALS,
} from "./siteConfig";

// ── Data ──────────────────────────────────────────────────────────────────────

const workExperience = [
  {
    company: "Ministry of Home Affairs",
    initials: "MHA",
    role: "Data Scientist Intern",
    period: "May 2025 – Dec 2025",
    type: "Internship",
    bullets: [
      "Built an LLM-driven NER and relationship extraction pipeline using GPT-4o, LangChain and Azure Document Intelligence to extract Cyber Threat Intelligence (CTI) entities and map into STIX-compliant structures.",
      "Designed a pre-processing workflow (OCR, PDF parsing, chunking and regex cleaning) and integrated extracted data into Neo4j for graph-based visualisation of threat actors, IOCs and TTP relationships, improving intelligence analysis.",
      "Developed big-data geospatial analytics workflows on Databricks using PySpark, Apache Sedona and Uber H3 to analyse vessel movements and maritime patterns.",
      "Applied H3 hierarchical indexing to improve spatial aggregation, ship trajectory modelling and maritime anomaly detection for operational investigations.",
    ],
  },
  {
    company: "Toyota Tsusho Asia Pacific",
    initials: "TT",
    role: "Machine Learning Researcher",
    period: "Sep 2020 – Feb 2021",
    type: "Internship",
    bullets: [
      "Developed and evaluated ML models to predict supplier delivery delays using real-world supply chain data.",
      "Executed large-scale data cleaning, feature engineering, and model evaluation across multiple algorithms.",
      "Created Tableau dashboards to communicate insights on supplier capacity, order volatility and delivery performance.",
    ],
  },
];

const education = [
  {
    institution: "National University of Singapore",
    initials: "NUS",
    qualification: "Bachelor of Science in Business Analytics",
    period: "Aug 2023 – Present",
    type: "Degree",
    bullets: [
      "GPA: 4.38 — Second Class (Upper) Honours / Honours (Distinction)",
      "Prospective Specialisation in Machine Learning based Analytics",
    ],
    coursework: [
      { code: "CS1010A", name: "Programming Methodology" },
      { code: "CS2030", name: "Programming Methodology II" },
      { code: "CS2040", name: "Data Structures and Algorithms" },
      { code: "BT2102", name: "Data Management and Visualisation" },
      { code: "BT3017", name: "Feature Engineering for Machine Learning" },
      { code: "BT3103", name: "Application Systems Development for Business Analytics" },
      { code: "BT4221", name: "Advanced Analytics with Big Data Technologies" },
      { code: "IS4226", name: "Systematic Trading Strategies and Systems" },
      { code: "BT4222", name: "Mining Web Data for Business Insights" },
      { code: "BT4301", name: "Business Analytics Solutions Development and Deployment" },
    ],
  },
  {
    institution: "Ngee Ann Polytechnic",
    initials: "NP",
    qualification: "Diploma with Merit in Financial Informatics",
    period: "Apr 2018 – Apr 2021",
    type: "Diploma",
    bullets: [
      "GPA: 3.86 — Specialisation in Financial Analytics",
      "Director's List (2018–2020)",
    ],
    coursework: [
      { code: null, name: "Predictive Analytics" },
      { code: null, name: "User Experience" },
      { code: null, name: "Customer Experience Management" },
      { code: null, name: "Applied Analytics" },
      { code: null, name: "Deep Learning" },
      { code: null, name: "Data Visualisation" },
    ],
  },
];

const skills: Array<{ category: string; icon: React.ReactNode; items: string[] }> = [
  { category: "Programming Languages", icon: <Code2 size={17} />, items: ["Python", "SQL", "Java", "R", "JavaScript", "HTML", "CSS"] },
  { category: "AI & Machine Learning", icon: <Cpu size={17} />, items: ["OpenAI API", "Azure AI", "RAG", "Prompt Engineering", "LLM Evaluation", "Vector Search"] },
  { category: "Machine Learning", icon: <Brain size={17} />, items: ["Scikit-learn", "Predictive Modelling", "Feature Engineering", "Model Evaluation", "Classification", "Regression", "Clustering"] },
  { category: "Frameworks & Libraries", icon: <Layers size={17} />, items: ["LangChain", "LangGraph", "Pandas", "NumPy", "Matplotlib", "MLflow"] },
  { category: "Cloud & Big Data", icon: <Cloud size={17} />, items: ["AWS", "Azure", "Databricks", "PySpark", "Apache Airflow", "Apache Sedona"] },
  { category: "Databases", icon: <Database size={17} />, items: ["Neo4j", "Firebase", "FAISS", "PostgreSQL", "MySQL"] },
  { category: "Development Tools", icon: <Wrench size={17} />, items: ["Docker", "Git", "GitHub", "Tableau", "Excel", "Jupyter Notebook", "VS Code"] },
];

// Filter config
const FILTERS: Array<{ key: "all" | ProjectCategory; label: string }> = [
  { key: "all", label: "All" },
  { key: "ai-ml", label: "AI & Machine Learning" },
  { key: "data-analytics", label: "Data Analytics" },
  { key: "web-dev", label: "Web Development" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    onClick?.();
  };
  return (
    <a href={href} onClick={handleClick} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group">
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
    </a>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-secondary text-primary border border-border">
      {label}
    </span>
  );
}

function TechIcon({ tech }: { tech: string }) {
  const cls = "w-3.5 h-3.5 flex-shrink-0 opacity-70";
  const s = 13;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L = (Icon: any) => <Icon size={s} className={cls} />;

  switch (tech) {

    // ── Programming Languages ────────────────────────────────────────────
    case "Python":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
          <path d="M12 2C9.5 2 8 3.2 8 5v3h4v1H8C5.5 9 4 10.5 4 12.5S5.5 16 8 16h1.5v-2.5H8c-1 0-1.5-.5-1.5-1S7 11.5 8 11.5h4V9V5C12 3.2 13.5 2 16 2h-4z" />
          <circle cx="10" cy="4.5" r="0.9" fill="currentColor" stroke="none" />
          <path d="M12 22c2.5 0 4-1.2 4-3v-3h-4v-1h4c2.5 0 4-1.5 4-3.5S18.5 8 16 8h-1.5v2.5H16c1 0 1.5.5 1.5 1s-.5 1-1.5 1h-4v1.5V19c0 1.8-1.5 3-4 3h4z" />
          <circle cx="14" cy="19.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "SQL": case "PostgreSQL": case "MySQL": return L(Database);
    case "JavaScript":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={cls}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor" fontFamily="monospace">JS</text>
        </svg>
      );
    case "Java": return L(Coffee);
    case "R":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={cls}>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor" fontFamily="monospace">R</text>
        </svg>
      );
    case "HTML": return L(Code2);
    case "CSS": return L(Hash);

    // ── AI & Machine Learning (tools) ─────────────────────────────────────
    case "OpenAI API": return L(Bot);
    case "Azure AI":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M3 20L10 4l4.5 7.5L9 20" /><path d="M14 20h7" /><path d="M16.5 12L21 20" />
        </svg>
      );
    case "RAG": return L(BookOpen);
    case "Prompt Engineering": return L(MessageSquare);
    case "LLM Evaluation": return L(CheckCircle2);
    case "Vector Search": return L(Search);

    // ── Machine Learning (concepts) ───────────────────────────────────────
    case "Scikit-learn": return L(FlaskConical);
    case "Predictive Modelling": return L(TrendingUp);
    case "Feature Engineering": return L(Wrench);
    case "Model Evaluation": return L(BarChart3);
    case "Classification": return L(Tag);
    case "Regression": return L(TrendingUp);
    case "Clustering": return L(Sigma);

    // ── Frameworks & Libraries ────────────────────────────────────────────
    case "LangChain": return L(Link2);
    case "LangGraph": return L(GitBranch);
    case "Pandas": return L(Table2);
    case "NumPy": return L(Grid3x3);
    case "Matplotlib": return L(Activity);
    case "MLflow": return L(BarChart2);

    // ── Cloud & Big Data ──────────────────────────────────────────────────
    case "AWS":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M6.5 16.5A5.5 5.5 0 0 1 6 6h.5A7 7 0 0 1 19.5 11h.5a3.5 3.5 0 0 1 0 7H6.5z" />
          <path d="M8 21l4-5 4 5" />
        </svg>
      );
    case "Azure":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M3 20L10 4l4.5 7.5L9 20" /><path d="M14 20h7" /><path d="M16.5 12L21 20" />
        </svg>
      );
    case "Databricks": return L(Zap);
    case "PySpark": return L(Flame);
    case "Apache Airflow": return L(Wind);
    case "Apache Sedona": return L(Globe);

    // ── Databases ─────────────────────────────────────────────────────────
    case "Neo4j":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className={cls}>
          <circle cx="5" cy="5" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="12" cy="19" r="2.5" />
          <line x1="7.5" y1="5" x2="16.5" y2="5" />
          <line x1="6" y1="7" x2="10.5" y2="17" />
          <line x1="18" y1="7" x2="13.5" y2="17" />
        </svg>
      );
    case "Firebase":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 3c0 4.5-5 7.5-5 11a5 5 0 0 0 10 0c0-3.5-5-6.5-5-11z" />
          <path d="M9 10c0 2.5-2 4-2 7a5 5 0 0 0 10 0c0-3-2-4.5-2-7" />
        </svg>
      );
    case "FAISS": return L(Search);

    // ── Development Tools ─────────────────────────────────────────────────
    case "Docker":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <rect x="2" y="11" width="4" height="3.5" rx="0.75" /><rect x="7.5" y="11" width="4" height="3.5" rx="0.75" />
          <rect x="13" y="11" width="4" height="3.5" rx="0.75" /><rect x="7.5" y="6.5" width="4" height="3.5" rx="0.75" />
          <path d="M2 14.5c2.5 2 6 2.5 9 2.5s7-1 11-3" />
          <path d="M19 11.5c.5-.5 2.5-.5 3.5 1" />
        </svg>
      );
    case "Git":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" />
          <path d="M6 8.5v7M8.5 6H14a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "GitHub": return L(Github);
    case "Tableau": return L(BarChart2);
    case "Excel": return L(Grid3x3);
    case "Jupyter Notebook": return L(BookOpen);
    case "VS Code": return L(Monitor);

    default: return null;
  }
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-foreground border border-border hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default">
      <TechIcon tech={label} />
      {label}
    </span>
  );
}

function OrgLogo({ name, initials, size = 40 }: { name: string; initials: string; size?: number }) {
  const src = ORG_LOGOS[name];
  if (!src) {
    return (
      <div className="rounded-lg bg-secondary border border-border flex items-center justify-center font-bold text-primary flex-shrink-0" style={{ width: size, height: size, fontSize: size * 0.3 }}>
        {initials}
      </div>
    );
  }
  return (
    <div className="rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border" style={{ width: size, height: size }}>
      <img src={src} alt={name} width={size} height={size} className="object-contain p-1" />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-xs font-mono text-primary tracking-widest uppercase">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function ExperienceCard({ item }: { item: (typeof workExperience)[0] }) {
  const typeColor: Record<string, string> = { "Full-time": "#0ea5e9", Internship: "#059669" };
  const color = typeColor[item.type] ?? "#0ea5e9";
  return (
    <div className="flex gap-6 mb-8">
      <div className="flex flex-col items-center flex-shrink-0 w-5 pt-5">
        <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: color, background: "var(--background)", boxShadow: `0 0 8px ${color}66` }} />
        <div className="w-px flex-1 mt-2 bg-border" />
      </div>
      <div className="flex-1 pb-10 bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors duration-200">
        <div className="flex items-start gap-4 mb-4">
          <OrgLogo name={item.company} initials={item.initials} size={44} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-base leading-tight">{item.role}</h3>
                <p className="text-sm font-medium mt-0.5" style={{ color }}>{item.company}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color, background: `${color}18` }}>{item.type}</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="space-y-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EducationCard({ item, isLast }: { item: (typeof education)[0]; isLast: boolean }) {
  const [showCourses, setShowCourses] = useState(false);
  const typeColor: Record<string, string> = { Degree: "#0ea5e9", Diploma: "#7c3aed" };
  const color = typeColor[item.type] ?? "#0ea5e9";
  return (
    <div className="flex gap-6 mb-8">
      <div className="flex flex-col items-center flex-shrink-0 w-5 pt-5">
        <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: color, background: "var(--background)", boxShadow: `0 0 8px ${color}66` }} />
        {!isLast && <div className="w-px flex-1 mt-2 bg-border" />}
      </div>
      <div className="flex-1 pb-10 bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors duration-200">
        <div className="flex items-start gap-4 mb-4">
          <OrgLogo name={item.institution} initials={item.initials} size={44} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-base leading-tight">{item.qualification}</h3>
                <p className="text-sm font-medium mt-0.5" style={{ color }}>{item.institution}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color, background: `${color}18` }}>{item.type}</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="space-y-2 mb-4">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border pt-4">
          <button onClick={() => setShowCourses((v) => !v)} className="flex items-center gap-2 group">
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color }}>Relevant Coursework</span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              {showCourses ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </span>
          </button>
          {showCourses && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.coursework.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-secondary border border-border text-foreground">
                  {c.code && <span className="font-mono text-primary opacity-80">{c.code}</span>}
                  {c.code && <span className="text-border">·</span>}
                  <span className="text-muted-foreground">{c.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const navigate = useNavigate();
  const categoryColors: Record<string, string> = {
    "ai-ml": "#0ea5e9",
    "data-analytics": "#059669",
    "web-dev": "#f59e0b",
  };
  // override with project's own accent for the icon bg
  const accent = project.accentColor;

  return (
    <article
      className="group flex flex-col bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] hover:border-primary/30"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18`, color: accent }}>
          {project.icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-xs font-mono text-muted-foreground">{project.period}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ color: categoryColors[project.category], background: `${categoryColors[project.category]}15` }}>
            {project.categoryLabel}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors duration-200 mb-0.5">
        {project.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-2">
        <span style={{ color: accent }}>{project.org}</span>
        {" · "}
        <span className="italic">{project.role}</span>
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {project.shortDescription}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.slice(0, 5).map((s) => <Badge key={s} label={s} />)}
        {project.stack.length > 5 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono text-muted-foreground bg-secondary border border-border">
            +{project.stack.length - 5}
          </span>
        )}
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-primary font-medium group-hover:gap-2.5 transition-all duration-200">
          View case study <ArrowRight size={13} />
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13} />
          GitHub
        </a>
      </div>
    </article>
  );
}

function SkillCard({ category, icon, items }: { category: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="group flex flex-col bg-card border border-border rounded-xl p-6 transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-primary/30 h-full">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold text-foreground text-sm tracking-tight">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => <SkillBadge key={skill} label={skill} />)}
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  sourceLabel,
  sourceUrl,
}: {
  quote: string;
  author: string;
  role: string;
  sourceLabel: string;
  sourceUrl: string;
}) {
  return (
    <div className="flex flex-col bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-colors duration-200">
      <Quote size={20} className="text-primary mb-4" />
      <div className="flex-1 mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed">"{quote}"</p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <UserCircle2 size={36} className="text-muted-foreground flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{role}</p>
        </div>
      </div>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs text-primary hover:underline">
        Read source: {sourceLabel}
      </a>
    </div>
  );
}

function TestimonialPlaceholder({ index }: { index: number }) {
  return (
    <div className="flex flex-col bg-card border border-dashed border-border rounded-xl p-6 opacity-60">
      <Quote size={20} className="text-muted-foreground mb-4" />
      <div className="flex-1 space-y-2 mb-6">
        <div className="h-3 bg-secondary rounded w-full" /><div className="h-3 bg-secondary rounded w-5/6" /><div className="h-3 bg-secondary rounded w-4/6" />
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <UserCircle2 size={36} className="text-muted-foreground flex-shrink-0" />
        <div className="space-y-1.5"><div className="h-2.5 bg-secondary rounded w-28" /><div className="h-2 bg-secondary rounded w-40" /></div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 italic">Testimonial {index} — to be added</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { isDark, toggle } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [typing, setTyping] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");

  const roles = ["Data Scientist", "AI Engineer", "Agentic AI Builder", "Analytics Engineer"];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (typedIndex < currentRole.length) {
        timeout = setTimeout(() => setTypedIndex((i) => i + 1), 65);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (typedIndex > 0) {
        timeout = setTimeout(() => setTypedIndex((i) => i - 1), 35);
      } else {
        setRoleIndex((r) => (r + 1) % roles.length);
        setTyping(true);
      }
    }
    setDisplayedRole(currentRole.slice(0, typedIndex));
    return () => clearTimeout(timeout);
  }, [typedIndex, typing, roleIndex]);

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors duration-200" style={{ fontFamily: "'Outfit', sans-serif" }}>
            KX<span className="text-primary">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => <NavLink key={l.href} href={l.href}>{l.label}</NavLink>)}
            <button onClick={toggle} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200" aria-label="Toggle theme">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200">
              <Download size={14} /> Resume
            </a>
          </div>
          <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-card border-b border-border px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => <NavLink key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>)}
            <div className="flex items-center gap-3">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10">
                <Download size={14} /> Resume
              </a>
              <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40">
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section id="hero" className="relative min-h-screen flex items-center px-6 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-6 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #a78bfa 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative max-w-6xl mx-auto w-full pt-24 pb-20">
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-mono tracking-widest uppercase mb-6">👋 Open to full-time &amp; internship opportunities</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Hi, I&apos;m <span className="text-primary">Kee Xiang</span>
              </h1>
              <div className="text-3xl sm:text-4xl font-bold mb-8 h-12 flex items-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span className="text-muted-foreground">{displayedRole}<span className="text-primary animate-pulse">|</span></span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                I build intelligent, data-driven solutions — from LLM-powered agentic pipelines and big-data geospatial analytics to deep learning models for real-world impact. Currently studying Business Analytics at NUS with a specialisation in Machine Learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5">
                  View My Work <ArrowRight size={16} />
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-200">
                  <Download size={16} /> Download Resume
                </a>
              </div>
              <div className="mt-20 flex items-center gap-3 text-muted-foreground">
                <div className="w-6 h-10 rounded-full border border-border flex items-start justify-center p-1.5">
                  <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="01 — About" />
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3 space-y-5">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Bridging data science and <span className="text-primary">real-world impact.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">I&apos;m a Business Analytics student at NUS (GPA 4.38, Honours with Distinction) with hands-on experience building production AI systems across government and industry. My work spans LLM-driven intelligence pipelines, agentic multi-agent systems, big-data geospatial analytics, and classical ML.</p>
                <p className="text-muted-foreground leading-relaxed">At the Ministry of Home Affairs, I built cyber threat intelligence extraction pipelines and maritime anomaly detection systems on Databricks. At Toyota Tsusho, I developed supply chain delay prediction models and delivered executive-facing Tableau dashboards.</p>
                <p className="text-muted-foreground leading-relaxed">I care about building systems that are technically sound, privacy-preserving, auditable, and aligned to the humans who rely on them.</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-2 text-sm text-primary hover:underline"><Mail size={14} /> {EMAIL_ADDRESS}</a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Linkedin size={14} /> LinkedIn</a>
                  <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Github size={14} /> github.com/kee-x</a>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-center md:justify-end">
                <div className="relative w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border-2 border-border bg-secondary flex flex-col items-center justify-center gap-3">
                  <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 60% 30%, #00d4ff 0%, transparent 65%), radial-gradient(ellipse at 30% 80%, #a78bfa 0%, transparent 60%)" }} />
                  <UserCircle2 size={80} className="text-muted-foreground relative z-10 opacity-40" />
                  <p className="text-xs text-muted-foreground relative z-10 opacity-60 text-center px-6">Your photo here</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #00d4ff, #a78bfa)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work Experience ────────────────────────────────────────────────── */}
        <section id="experience" className="py-28 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="02 — Work Experience" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-14 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Where I&apos;ve built things</h2>
            <div className="max-w-3xl">
              {workExperience.map((item) => <ExperienceCard key={item.company} item={item} />)}
            </div>
          </div>
        </section>

        {/* ── Featured Projects ──────────────────────────────────────────────── */}
        <section id="projects" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="03 — Featured Projects" />
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Selected work</h2>
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                View all on GitHub <ExternalLink size={13} />
              </a>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeFilter === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {label}
                  <span className={`ml-1.5 text-xs ${activeFilter === key ? "opacity-80" : "opacity-50"}`}>
                    ({key === "all" ? projects.length : projects.filter((p) => p.category === key).length})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>

        {/* ── Education ─────────────────────────────────────────────────────── */}
        <section id="education" className="py-28 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="04 — Education" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-14 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Academic background</h2>
            <div className="max-w-3xl">
              {education.map((item, i) => <EducationCard key={item.institution} item={item} isLast={i === education.length - 1} />)}
            </div>
          </div>
        </section>

        {/* ── Technical Skills ───────────────────────────────────────────────── */}
        <section id="skills" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="05 — Technical Skills" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Technologies I work with</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {skills.map(({ category, icon, items }) => <SkillCard key={category} category={category} icon={icon} items={items} />)}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────────────── */}
        <section id="testimonials" className="py-28 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="06 — Testimonials" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>What collaborators say</h2>
            <p className="text-muted-foreground mb-12 max-w-xl">Selected testimonials sourced from formal feedback and recommendation letters already included in this project.</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {TESTIMONIALS.map((testimonial) => <TestimonialCard key={testimonial.quote} {...testimonial} />)}
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────────── */}
        <section id="contact" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="07 — Contact" />
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Let&apos;s build something <span className="text-primary">meaningful.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                I&apos;m currently seeking full-time roles and internships in data science, machine learning, and AI engineering. If you have an interesting problem involving LLMs, agentic systems, or data at scale — I&apos;d love to chat.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"><Mail size={16} /> Say Hello</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-200"><Linkedin size={16} /> LinkedIn</a>
                <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-200"><Github size={16} /> GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-bold text-lg text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>KX<span className="text-primary">.</span></p>
            <p className="text-xs text-muted-foreground mt-1">Tan Kee Xiang — Data Scientist &amp; AI Engineer</p>
          </div>
          <div className="flex items-center gap-5">
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="GitHub"><Github size={18} /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={`mailto:${EMAIL_ADDRESS}`} className="text-muted-foreground hover:text-primary transition-colors duration-200" aria-label="Email"><Mail size={18} /></a>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Tan Kee Xiang. Built with React &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
