import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Github, Sun, Moon, ExternalLink } from "lucide-react";
import { useDarkMode } from "./Root";
import { getProjectById, type Project } from "../data/projects";

// ── Shared small components ───────────────────────────────────────────────────

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-secondary text-foreground border border-border">
      {label}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-foreground mb-5 leading-snug" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="h-px bg-border my-12" />;
}

// ── Hero placeholder image ────────────────────────────────────────────────────

function ProjectHero({ project }: { project: Project }) {
  return (
    <div
      className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden relative flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${project.accentColor}18 0%, ${project.accentColor}06 100%)` }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accentColor}20 0%, transparent 65%)` }}
      />
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: `${project.accentColor}20`, color: project.accentColor, boxShadow: `0 0 32px ${project.accentColor}30` }}
        >
          <span className="scale-[1.8]">{project.icon}</span>
        </div>
        <p className="text-xs font-mono text-muted-foreground opacity-60 tracking-widest uppercase">Project Screenshot Placeholder</p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();
  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const categoryColors: Record<string, string> = {
    "ai-ml": "#0ea5e9",
    "data-analytics": "#059669",
    "web-dev": "#f59e0b",
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <p className="text-muted-foreground font-mono text-sm">Project not found.</p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm hover:border-primary/40 hover:text-primary transition-all duration-200"
        >
          <ArrowLeft size={15} /> Back to Portfolio
        </button>
      </div>
    );
  }

  const accent = project.accentColor;
  const catColor = categoryColors[project.category] ?? accent;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>

      {/* ── Sticky top bar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          <p className="text-sm font-medium text-foreground truncate hidden md:block">{project.title}</p>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Page content ───────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ color: catColor, background: `${catColor}15` }}
          >
            {project.categoryLabel}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{project.period}</span>
        </div>

        {/* Title + meta */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
          <span className="text-base font-medium" style={{ color: accent }}>{project.org}</span>
          <span className="text-muted-foreground text-sm">·</span>
          <span className="text-sm text-muted-foreground italic">{project.role}</span>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {project.tagline}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.stack.map((s) => <StackChip key={s} label={s} />)}
        </div>

        {/* Hero image */}
        <ProjectHero project={project} />

        <Divider />

        {/* ── Executive Summary ─────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Executive Summary</SectionHeading>
          <div className="space-y-4">
            {project.executiveSummary.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── The Challenge ─────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>The Challenge</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: accent }}>Situation</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.situation}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: accent }}>Task</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.task}</p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Technical Approach ────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Technical Approach</SectionHeading>
          <div className="space-y-4">
            {project.actions.map((action, i) => (
              <div key={i} className="flex gap-5 p-5 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors duration-200">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{action.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Features (if present) ─────────────────────────────────────── */}
        {project.features && project.features.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading>Key Features</SectionHeading>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((f, i) => (
                  <div key={i} className="p-5 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{f.emoji}</span>
                      <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── Pipeline / Architecture (if present) ──────────────────────────── */}
        {project.pipelineStages && project.pipelineStages.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading>Pipeline Architecture</SectionHeading>
              <div className="space-y-3">
                {project.pipelineStages.map((stage, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {/* Connector line */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: accent, boxShadow: `0 0 6px ${accent}80` }}
                      />
                      {i < project.pipelineStages!.length - 1 && (
                        <div className="w-px flex-1 mt-1 mb-1 min-h-[24px]" style={{ background: `${accent}30` }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-[10px] font-mono tracking-wider" style={{ color: accent }}>{stage.number}</span>
                        <h3 className="text-sm font-semibold text-foreground">{stage.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── Metrics (if present) ──────────────────────────────────────────── */}
        {project.metrics && project.metrics.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading>Results &amp; Impact</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {project.metrics.map((m, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-xl text-center">
                    <p className="text-2xl font-extrabold mb-1" style={{ color: accent, fontFamily: "'Outfit', sans-serif" }}>{m.value}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-card border border-border rounded-xl">
                <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: accent }}>Result</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.result}</p>
              </div>
            </section>
          </>
        )}

        {/* ── Result (if no metrics) ────────────────────────────────────────── */}
        {(!project.metrics || project.metrics.length === 0) && (
          <>
            <Divider />
            <section>
              <SectionHeading>Results &amp; Impact</SectionHeading>
              <div className="p-6 bg-card border border-border rounded-xl" style={{ borderLeft: `3px solid ${accent}` }}>
                <p className="text-muted-foreground leading-relaxed">{project.result}</p>
              </div>
            </section>
          </>
        )}

        <Divider />

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200"
          >
            <Github size={15} /> View on GitHub <ExternalLink size={13} />
          </a>
        </section>

        <div className="h-16" />
      </main>
    </div>
  );
}
