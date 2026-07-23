import { Brain, Code2, BarChart3, ShoppingCart, Store } from "lucide-react";
import type { ReactNode } from "react";
import { GITHUB_PROFILE_URL } from "../app/siteConfig";
import nccsLogo from "../../Images/nccs logo.png";
import healthcareScreenshot from "../../Images/agenticaihealthcare.png";
import defendantLiabilityScreenshot from "../../Images/JudicialWallpaper.avif";
import loanDefaultScreenshot from "../../Images/LoanDefault.jpeg";
import fairTrackerScreenshot from "../../Images/TheFairTracker.png";
import communityMartScreenshot from "../../Images/Hack4Good.jpg";

export type ProjectCategory = "ai-ml" | "data-analytics" | "web-dev";

export interface ProjectAction {
  title: string;
  description: string;
}

export interface ProjectFeature {
  emoji: string;
  title: string;
  description: string;
}

export interface PipelineStage {
  number: string;
  title: string;
  description: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  org: string;
  role: string;
  period: string;
  tagline: string;
  shortDescription: string;
  category: ProjectCategory;
  categoryLabel: string;
  stack: string[];
  accentColor: string;
  github: string;
  icon: ReactNode;
  screenshot: string;
  // Detail page
  executiveSummary: string;
  situation: string;
  task: string;
  actions: ProjectAction[];
  result: string;
  metrics?: ProjectMetric[];
  features?: ProjectFeature[];
  pipelineStages?: PipelineStage[];
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "ai-ml": "AI & Machine Learning",
  "data-analytics": "Data Analytics",
  "web-dev": "Web Development",
};

export const projects: Project[] = [
  {
    id: "healthcare-chatbot",
    title: "Agentic Healthcare Analytics Chatbot",
    org: "National Cancer Centre Singapore",
    role: "AI Engineer",
    period: "Jan 2026 – Apr 2026",
    tagline: "A secure, multi-agent AI system running entirely offline via Ollama to translate clinical natural language queries into auditable, high-fidelity SQL against the OMOP Common Data Model.",
    shortDescription:
      "Built a LangGraph multi-agent system enabling clinicians to query OMOP CDM healthcare data via natural language, running locally with Ollama to preserve patient privacy. Implemented three mandatory Human-in-the-Loop checkpoints and semantic grounding via ClinicalBERT + FAISS.",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    stack: ["LangGraph", "LangChain", "Ollama", "ClinicalBERT", "FAISS", "DuckDB", "OMOP CDM", "Python"],
    accentColor: "#0ea5e9",
    github: GITHUB_PROFILE_URL,
    icon: <img src={nccsLogo} alt="NCCS logo" className="w-6 h-6 object-contain" />,
    screenshot: healthcareScreenshot,
    executiveSummary:
      "Clinical experts face immense operational delays when interrogating highly-regulated observational health repositories like the OMOP Common Data Model (CDM). Automated cloud-based Text-to-SQL frameworks are unviable in healthcare — strict data privacy laws prohibit sending patient data over external APIs, and safety standards forbid trusting raw, unverified LLM output.\n\nAs a core team member, I co-architected a stateful multi-agent analytics copilot running entirely inside an offline, zero-egress environment via Ollama. The system maps natural language clinical queries into highly accurate, explainable DuckDB SQL against OMOP CDM v5.4. By grounding complex medical terms to standardized vocabularies using ClinicalBERT and FAISS, and implementing three mandatory Human-In-The-Loop (HITL) interruption checkpoints via LangGraph, the application slashes hypothesis testing turnaround from weeks to minutes while enforcing total auditability and ironclad data privacy.",
    situation:
      "Observational healthcare research is crippled by structural data barriers. Clinicians possess the domain knowledge to form life-saving hypotheses but lack the database expertise to query standardized clinical warehouses. Conversely, opening these databases to autonomous cloud-based AI tools introduces the severe risk of medical hallucination — such as creating invalid database columns — and violates data protection standards by exposing sensitive patient metadata outside institutional networks.",
    task:
      "Our objective was to bridge the gap between clinical intent and complex data schemas by designing an offline, local analytics assistant. The system needed to function strictly as an auditable copilot — dynamically generating syntactically sound SQL queries, parsing highly irregular medical jargon, and halting execution at sensitive operational steps to allow complete human supervision.",
    actions: [
      {
        title: "Offline Infrastructure Configuration",
        description:
          "Built the agent pipeline to interface exclusively with local instances via Ollama. This on-premises constraint guarantees that no protected health information (PHI) ever exits the local host environment, meeting strict healthcare data privacy standards.",
      },
      {
        title: "Stateful Graph Orchestration",
        description:
          "Engineered a stateful multi-actor architecture using LangGraph. Divided conversational processing into specialized, sequential nodes — isolating intent routing, schema pruning, and query building — to reduce prompt complexity and maximize structural accuracy.",
      },
      {
        title: "Semantic Grounding Pipeline",
        description:
          "Integrated a domain-specific vector lookup pipeline using ClinicalBERT embeddings and FAISS. When a user inputs natural language, the engine maps semantic concepts directly to formal ATHENA metadata and valid OMOP v5.4 tables, eliminating table hallucinations.",
      },
      {
        title: "HITL Interruption Framework",
        description:
          "Implemented strict state machine interrupts using LangGraph. The graph stores transaction states in a dedicated Data Registry, freezing execution at three critical operational steps until a clinician manually validates the proposed analytical route.",
      },
    ],
    result:
      "Successfully deployed a scalable, highly transparent health-tech copilot that empowers medical professionals to safely perform cohort counting, trend analytics, and automated statistical analysis. By moving analytics to the local edge, the system eliminates cross-department engineering backlogs and brings empirical clarity and rapid reproducibility to modern clinical research.",
    features: [
      {
        emoji: "🧠",
        title: "Intent & Routing Agent",
        description:
          "Evaluates queries to classify analytical archetypes. If a clinician inputs an under-specified question, an Intent Clarifier Agent triggers a conversational loop to prompt for missing variables.",
      },
      {
        emoji: "🔍",
        title: "Schema Grounding Agent",
        description:
          "Resolves unstructured clinical jargon against structured OMOP tables using ClinicalBERT and FAISS, passing only a heavily pruned metadata footprint downstream to save context tokens.",
      },
      {
        emoji: "💾",
        title: "DuckDB SQL Engine",
        description:
          "Transforms localized schema context into explainable, performant DuckDB SQL for rapid in-memory processing over massive clinical files — no external server overhead required.",
      },
      {
        emoji: "🛡️",
        title: "HITL Checkpoint Registry",
        description:
          "All query logs, planned execution routes, and generated scripts are saved to an unalterable local state registry, ensuring full traceability before delivering final statistical dashboards.",
      },
    ],
    pipelineStages: [
      {
        number: "Gate 01",
        title: "Intent & Concept Mapping",
        description:
          "Inspects extracted filters, time bounds, and mapped medical concept IDs. Eliminates logic errors stemming from misinterpretation of the clinical hypothesis before downstream processing.",
      },
      {
        number: "Gate 02",
        title: "Query Generation Review",
        description:
          "Reviews auto-generated DuckDB SQL code and schema join conditions. Catches syntactic compilation errors or unexpected Cartesian joins before database execution.",
      },
      {
        number: "Gate 03",
        title: "Statistical Synthesis Validation",
        description:
          "Validates compiled database query logs and final generated metrics for clinical coherence before displaying final insights to the clinician.",
      },
    ],
  },

  {
    id: "defendant-liability",
    title: "Predicting Defendant Liability",
    org: "Judicial Analytics",
    role: "Data Scientist",
    period: "Jan 2026 – Apr 2026",
    tagline: "A deep learning pipeline transforming dense, unstructured judicial rulings into structured, leakage-controlled litigation risk predictions.",
    shortDescription:
      "Developed a Hierarchical Attention Network (HAN) with SwiGLU to capture multi-level legal nuances in Singapore corporate litigation cases. Engineered a 3-stage GPT pipeline to transform PDFs into ML-ready JSON via LLM-as-a-Judge evaluation.",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    stack: ["PyTorch", "HuggingFace", "LegalBERT", "XGBoost", "GPT-4o", "NLTK", "SpaCy", "Python"],
    accentColor: "#7c3aed",
    github: GITHUB_PROFILE_URL,
    icon: <Code2 size={26} />,
    screenshot: defendantLiabilityScreenshot,
    executiveSummary:
      "Predicting defendant liability in corporate litigation is incredibly complex due to multi-level legal nuances, massive document lengths, and the subjective nature of judicial decisions. Legal professionals traditionally spend hundreds of hours manually auditing past PDF case laws to assess risk.\n\nThis project introduces a specialized NLP and deep learning pipeline that ingests raw, unstructured judicial judgments and outputs objective, data-driven assessments of defendant liability. The engineering core focuses on solving standard model failures in legal tech: breaking down multi-page document structures via a Hierarchical Attention Network (HAN) with SwiGLU activations, and implementing strict adversarial data leakage controls to ensure the model predicts outcomes based on pre-decision facts rather than clues hidden within the text.",
    situation:
      "Standard text analytics and off-the-shelf LLMs fail when applied to legal case documents. Corporate court judgments are dense, structurally complex, and heavily prone to data leakage. If a model reads an outcome clue hidden within a post-decision factual summary or relief section, it will artificially inflate training metrics while completely failing on real-world, pre-trial documents.",
    task:
      "The objective was to architect an end-to-end extraction and predictive pipeline capable of accurately forecasting corporate litigation liability. The system needed to isolate pre-decision facts cleanly from final judicial conclusions, normalize complex claims and counterclaims, and handle long-form text sequences that exceed typical transformer token limits.",
    actions: [
      {
        title: "Leakage-Controlled Extraction Pipeline",
        description:
          "Engineered a robust 3-stage GPT extraction pipeline using an LLM-as-a-Judge methodology to parse raw court PDFs into highly structured, schema-validated JSON. The pipeline strips outcome-stage language and isolates facts using an IRAC-inspired (Issue, Rule, Application, Conclusion) framing.",
      },
      {
        title: "Adversarial Data Auditing",
        description:
          "Implemented strict temporal isolation safeguards and target label normalization to guarantee that claims and counterclaims are coded symmetrically, completely separating what was knowable before the verdict from what was determined after.",
      },
      {
        title: "Hierarchical Attention Network Architecture",
        description:
          "Built a custom HAN in PyTorch, integrating a SwiGLU activation function to maximize training stability and capture multi-level nuances — word-to-sentence and sentence-to-document context — that flat transformer models miss.",
      },
    ],
    result:
      "Delivered a robust, empirically transparent framework for legal risk analysis. By migrating from traditional text arrays to a hierarchical document representation, the pipeline successfully mitigates the data leakage traps that plague legal-domain modeling, establishing a scalable methodology for converting raw, messy legal text into actionable risk signals.",
    pipelineStages: [
      {
        number: "Stage 01",
        title: "Text Ingestion & Normalization",
        description:
          "Standardizes raw unstructured text. Headings, paragraph breaks, dates, monetary values, and party labels are normalized to eliminate document noise before embedding generation.",
      },
      {
        number: "Stage 02",
        title: "Case & Party Row Structuring",
        description:
          "Instead of mapping a judgment into a single flat string, text is broken into separate structured rows tracking distinct claims and counterclaims to prevent mixed feature signals.",
      },
      {
        number: "Stage 03",
        title: "IRAC-Inspired Extraction",
        description:
          "An automated LLM-as-a-Judge QA step separates Issues, Rules, Application, and Conclusions — prioritizing factual application blocks while aggressively pruning conclusion tags containing target labels.",
      },
      {
        number: "Stage 04",
        title: "Temporal Isolation Audit",
        description:
          "An automated validation layer reviews output JSON for semantic consistency and leakage risk, ensuring zero post-decision terminology leaks past the data engineering boundary.",
      },
      {
        number: "Stage 05",
        title: "Embeddings & Model Training",
        description:
          "Legal-domain word vectors are generated and fed into comparative baseline models (XGBoost, flat LegalBERT) before migrating to the final HAN deep learning architecture.",
      },
    ],
  },

  {
    id: "loan-default",
    title: "P2P Loan Default Prediction",
    org: "Academic Project",
    role: "Data Scientist",
    period: "Jan 2025 – Apr 2025",
    tagline: "An end-to-end Big Data pipeline processing 2.9 million loan records via PySpark to identify high-risk borrowers with an 82.6% default recall rate.",
    shortDescription:
      "Built a distributed ML pipeline processing 2.9M loan records using PySpark. Applied PCA to reduce features from 83 to 62, handled class imbalance via SMOTE + ENN, and benchmarked LR, RF, SVM, and GBT classifiers. Achieved 82.6% recall on loan defaults.",
    category: "data-analytics",
    categoryLabel: "Data Analytics",
    stack: ["PySpark", "Scikit-learn", "Imbalanced-learn", "PCA", "SMOTE + ENN", "Python"],
    accentColor: "#059669",
    github: GITHUB_PROFILE_URL,
    icon: <BarChart3 size={26} />,
    screenshot: loanDefaultScreenshot,
    executiveSummary:
      "Peer-to-peer (P2P) lending platforms face massive financial risk exposure from borrower defaults. As transaction volumes scale into millions of records, traditional centralized credit scoring models fail due to memory constraints and an inability to map complex risk factors in highly imbalanced real-world distributions.\n\nI engineered a distributed, end-to-end Big Data machine learning pipeline using Apache Spark (PySpark) to ingest, clean, and model LendingClub's historical credit dataset — spanning 2007–2020 and comprising 2.9 million loan records / 1.7GB. By optimizing models for a high Recall Rate of 82.61%, the system isolates the vast majority of high-risk loans for manual underwriting, minimizing platform capital loss and significantly improving risk-adjusted returns.",
    situation:
      "In consumer lending markets, the distribution of defaults is heavily skewed — the vast majority of borrowers consistently repay. This massive class imbalance makes it easy for standard classifiers to establish misleadingly high accuracy by simply predicting every borrower as safe, missing the critical high-risk outliers that cause ruinous financial losses.",
    task:
      "The objective was to architect a horizontally scalable machine learning pipeline capable of parsing 2.9 million feature-rich loan records. The target engine needed to overcome local system memory ceilings, compress a highly sparse 83-column feature space, balance skewed class labels, and prioritize default detection sensitivity (Recall) over raw accuracy.",
    actions: [
      {
        title: "Distributed ETL Orchestration",
        description:
          "Leveraged PySpark to build a robust preprocessing script that bypassed single-machine memory limits, processing the full 1.7GB dataset while executing null value imputation, data cleaning, and string indexing.",
      },
      {
        title: "PCA Dimensionality Reduction",
        description:
          "Implemented Principal Component Analysis to combat multi-collinearity across the dataset's dense financial logs, successfully compressing the feature space from 83 raw features down to 62 orthogonal key components while retaining maximal variance.",
      },
      {
        title: "Hybrid Resampling Strategy",
        description:
          "Addressed severe class imbalance using a hybrid pipeline: SMOTE to generate synthetic default instances, paired with ENN (Edited Nearest Neighbors) to prune ambiguous, noisy boundary data, sharpening decision boundaries.",
      },
      {
        title: "Comparative Model Evaluation",
        description:
          "Trained and validated 6 alternative algorithms — including Logistic Regression, Support Vector Machines, Random Forest, and Gradient Boosted Trees — using Scikit-learn with risk-optimized metric realignment prioritizing Recall over Accuracy.",
      },
    ],
    result:
      "A customized Random Forest configuration emerged as the champion classifier, delivering a Recall rate of 82.61% along with a PR_AUC score of 0.1890. By capturing more than 4 out of 5 potential defaulters prior to contract signing, the pipeline provides lending platforms with a powerful automated layer to proactively mitigate credit defaults.",
    metrics: [
      { value: "82.6%", label: "Default Recall Rate" },
      { value: "2.9M", label: "Loan Records Processed" },
      { value: "83→62", label: "Features After PCA" },
      { value: "0.1890", label: "PR-AUC Score" },
    ],
    pipelineStages: [
      {
        number: "Stage 01",
        title: "PySpark Distributed Ingestion",
        description:
          "Processing nearly 3 million records with Pandas triggers out-of-memory faults. By distributing workload across a Spark cluster, the script transforms dense datatypes, standardizes schema definitions, and extracts critical credit metrics dynamically.",
      },
      {
        number: "Stage 02",
        title: "Feature Engineering & PCA",
        description:
          "Computed deep relational metrics including debt-to-income (DTI) ratios, rolling credit utilization tiers, and historical payment consistency indexes. PCA then condensed the sparse grid into 62 highly informative vectors.",
      },
      {
        number: "Stage 03",
        title: "Class Imbalance Mitigation",
        description:
          "SMOTE generates synthetic default instances by interpolating vectors between existing minority samples. ENN then acts as a data-cleansing layer, removing points whose nearest neighbors belong to the opposite class.",
      },
      {
        number: "Stage 04",
        title: "Risk-Optimized Model Evaluation",
        description:
          "A False Negative (missing a borrower who will default) is vastly more expensive than a False Positive. Model validation criteria intentionally prioritized Recall optimization rather than traditional Accuracy benchmarks.",
      },
    ],
  },

  {
    id: "fair-tracker",
    title: "The Fair Tracker",
    org: "BT3103 Application Systems Development",
    role: "Full-Stack Developer",
    period: "Jan 2024 – Apr 2024",
    tagline: "Empowering Singaporeans to combat inflation with real-time grocery price comparisons, dynamic watchlists, and historical trends across major supermarket chains.",
    shortDescription:
      "Built a centralized full-stack web application for transparent, real-time price comparison across major Singaporean supermarket chains. Features historical trend charts, an intelligent store locator via Google Maps, smart watchlists with price-drop alerts, and community reviews.",
    category: "web-dev",
    categoryLabel: "Web Development",
    stack: ["Vue.js", "Vuetify", "Firebase", "Google Maps API", "VueChartkick", "JavaScript", "Figma"],
    accentColor: "#f59e0b",
    github: GITHUB_PROFILE_URL,
    icon: <ShoppingCart size={26} />,
    screenshot: fairTrackerScreenshot,
    executiveSummary:
      "Rising living costs and global economic disruptions have driven up food inflation, making daily grocery shopping increasingly stressful for Singaporeans. Despite fierce competition among major supermarket chains, consumers lacked a transparent, centralized utility to audit and contrast prices fluidly, resulting in fragmented information and inefficient spending.\n\nThe Fair Tracker is a centralized, full-stack web application that provides transparent, real-time price comparisons across major Singaporean supermarket chains. Built by a collaborative engineering team over two intensive Agile sprints, the platform streamlines the shopping experience for budget-conscious families, students, and seniors by turning fragmented pricing data into actionable, cost-saving insights.",
    situation:
      "Shoppers frequently struggle to find the best deals for groceries across different supermarket chains. Price comparison is historically a tedious, manual process, causing consumers to miss out on routine savings — even as competing supermarkets offer meaningfully different prices on identical products.",
    task:
      "As part of an application development coursework team, our objective was to design, build, and deploy a production-ready full-stack web platform. The system needed to scale across multiple user stories to empower budget-conscious demographics to make smarter, data-driven purchasing decisions before they ever step into a store.",
    actions: [
      {
        title: "Agile Orchestration",
        description:
          "Mapped, groomed, and fully executed 24 core user stories derived from a refined product backlog. Maintained development velocity using Sprint Planning, Daily Stand-ups, and post-sprint Retrospectives — tracking milestones via GitHub Projects.",
      },
      {
        title: "Frontend & Data Visualisation",
        description:
          "Developed a highly responsive, accessible UI using Vue.js and Vuetify. Integrated VueChartkick to parse and render time-series historical price data, allowing users to track price volatility over time.",
      },
      {
        title: "Geospatial Integration",
        description:
          "Embedded the Google Maps API to build an interactive store locator that cross-references the user's geolocation with inventory data to map out the nearest, cheapest brick-and-mortar branch.",
      },
      {
        title: "Backend Architecture",
        description:
          "Utilized Firebase for real-time document storage, seamless state synchronisation of custom user lists, and secure user authentication — enabling persistent smart watchlists and alerts across sessions.",
      },
    ],
    result:
      "Successfully delivered a comprehensive, end-to-end web application that bridges the information gap in retail grocery pricing. The platform achieved high feature completion, featuring automated price-drop alerts, dynamic shopping carts, and community-driven verification tools that foster smarter consumer habits across Singapore.",
    features: [
      {
        emoji: "🔍",
        title: "Real-Time Price Comparison",
        description:
          "Instantly query and compare specific product line-items across competing supermarket chains side-by-side, removing manual search friction.",
      },
      {
        emoji: "📈",
        title: "Historical Price Trends",
        description:
          "Interactive line charts powered by VueChartkick map historical price fluctuations, telling users whether they are buying at a peak or a trough.",
      },
      {
        emoji: "🗺️",
        title: "Intelligent Store Locator",
        description:
          "An integrated mapping service that visually matches items on your digital shopping list with the exact physical coordinates of the cheapest available inventory nearby.",
      },
      {
        emoji: "🔔",
        title: "Smart Watchlists & Alerts",
        description:
          "A reactive tracking system allowing users to bookmark high-frequency household essentials and receive immediate notifications when target price-drops occur.",
      },
      {
        emoji: "🛒",
        title: "Smart Grocery Lists & Carts",
        description:
          "Users can build, edit, and save persistent custom lists. The application automatically aggregates total basket costs across different storefronts before checkout.",
      },
      {
        emoji: "💬",
        title: "Community Reviews",
        description:
          "A crowdsourced verification layer where users read and write product reviews, validating stock availability and item quality across store locations.",
      },
    ],
  },

  {
    id: "community-mart",
    title: "Community Mart",
    org: "Hack4Good 2025",
    role: "Full-Stack Developer",
    period: "Jan 2025",
    tagline: "Digitizing a welfare home's internal token economy with a secure digital voucher system, live auctions, and an NLP-driven AI assistant — built in 48 hours.",
    shortDescription:
      "Built at Hack4Good 2025 for the Muhammadiyah Welfare Home. Digitized their paper-based internal reward minimart with a real-time digital voucher system, resident marketplace, live auction engine, Botpress NLP chatbot, and secure admin dashboard. Delivered in 48 hours.",
    category: "web-dev",
    categoryLabel: "Web Development",
    stack: ["Vue.js", "Firebase", "Botpress", "JavaScript", "HTML5", "CSS3"],
    accentColor: "#ec4899",
    github: GITHUB_PROFILE_URL,
    icon: <Store size={26} />,
    screenshot: communityMartScreenshot,
    executiveSummary:
      "Managing inventory, resident allowances, and product distributions manually is inefficient, labor-intensive, and prone to accounting errors. During the Hack4Good 2025 hackathon, our team tackled this operational bottleneck for the Muhammadiyah Welfare Home (MWH) — a shelter for boys aged 10 to 19 that utilizes an internal behavioral reward system.\n\nCommunity Mart is a centralized, full-stack web application designed to digitize and automate the home's token economy. Built entirely within a 48-hour hackathon timeline, the platform completely replaces physical coupons with a robust, real-time digital voucher system. Featuring a responsive resident marketplace, a gamified live auction engine, an NLP chatbot powered by Botpress, and an auditable administrative command dashboard, the system streamlines internal logistics while offering residents a modernized, dignified, and highly accessible way to manage their balances.",
    situation:
      "The Muhammadiyah Welfare Home relied on manual ledger entries and paper vouchers to run its internal reward minimart. For staff, tracking changing point metrics, auditing stock distributions, and updating accounts created an intense administrative drain. For the young residents, the manual process meant friction, visual opacity regarding their actual point balances, and a lack of autonomy over preordering essential goods.",
    task:
      "As a core development team member at Hack4Good 2025, my objective was to design and build a highly responsive, secure web platform within a high-velocity 48-hour sprint. The application needed to balance two discrete interfaces: an intuitive storefront for residents to independently view balances and order products, and a secure backend panel for staff to manage accounts, fulfill requests, and review digital audit trails.",
    actions: [
      {
        title: "Real-Time Frontend Architecture",
        description:
          "Developed a highly responsive user interface using Vue.js structured for maximum accessibility for younger users, building views for instant voucher balance lookups, product catalog browsing, and item preorders.",
      },
      {
        title: "Reactive Ledger Integration",
        description:
          "Designed a secure transactional logic layer with Firebase to process point redemptions atomically — ensuring point deductions execute simultaneously with inventory reductions to prevent race conditions and double-spending.",
      },
      {
        title: "NLP Support Chatbot Integration",
        description:
          "Embedded a Botpress NLP chatbot that parses casual text inquiries to instantly report real-time account balances, redemption window schedules, and collection point procedures without requiring manual staff intervention.",
      },
      {
        title: "Administrative Security Controls",
        description:
          "Implemented a secure administration workspace using Firebase Authentication, isolating critical CRUD tasks — allowing staff to manage inventory, adjust resident points, and approve orders with persistent, immutable audit logs.",
      },
    ],
    result:
      "Our team successfully delivered a fully functioning minimart prototype that received exceptional validation for its structural impact. By migrating MWH from paper records to an automated, real-time database system, the application eliminates human logging error, slashes transaction processing delays, and transforms an administrative hurdle into an engaging, educational digital economy for the home's residents.",
    features: [
      {
        emoji: "🎫",
        title: "Atomic Voucher Point System",
        description:
          "Replaces physical coupons entirely. Residents authenticate to track historical distributions, monitor active point claims, and securely redeem items with instant database validation.",
      },
      {
        emoji: "🤖",
        title: "Botpress NLP Chatbot",
        description:
          "An intelligent web concierge that directly queries system parameters to guide users through item collection steps or retrieve quick account summaries on demand.",
      },
      {
        emoji: "🔨",
        title: "Live Point Auction Engine",
        description:
          "A gamified engagement layer allowing residents to bid on limited-stock essentials or special reward items using saved behavioral reward points, fostering positive reinforcement loops.",
      },
      {
        emoji: "📊",
        title: "Real-Time Admin Dashboard",
        description:
          "An operational workspace for MWH staff providing instant filtering for approving or rejecting item requests, inventory restocking triggers, and secure user profile creation with audit logging.",
      },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
