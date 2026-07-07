import resumePdf from "../imports/Kee_Xiang.pdf";
import ministryLogo from "../../Images/ministry of home affairs.png";
import toyotaLogo from "../../Images/toyota_tsusho_logo.png";
import nusLogo from "../../Images/NUS.webp";
import ngeeAnnLogo from "../../Images/ngee ann logo.png";
import nccsLetter from "../../Images/Tan Kee Xiang NCCS.docx";
import nccsLetterPdf from "../../Images/NCCS testimonial PDF.pdf";
import mhaTestimonialPdf from "../../Images/Tan Kee Xiang_Testimonial_MHA.pdf";

export const GITHUB_PROFILE_URL = "https://github.com/kee-x";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kee-xiang-tan-157476163/";
export const EMAIL_ADDRESS = "tankeexiang@u.nus.edu";
export const RESUME_URL = resumePdf;

export const ORG_LOGOS: Record<string, string> = {
  "Ministry of Home Affairs": ministryLogo,
  "Toyota Tsusho Asia Pacific": toyotaLogo,
  "National University of Singapore": nusLogo,
  "Ngee Ann Polytechnic": ngeeAnnLogo,
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kee Xiang consistently demonstrated strong commitment, technical competence and a thoughtful, structured approach in addressing a complex real-world analytical problem.",
    author: "Dr Ryan Shea Tan Ying Cong",
    role: "Consultant, Division of Medical Oncology, National Cancer Centre Singapore",
    sourceLabel: "NCCS testimonial letter",
    sourceUrl: nccsLetterPdf,
  },
  {
    quote:
      "Tan Kee Xiang was attached to the Ministry of Home Affairs (MHA) as a Data Science intern from 13 May to 31 Dec 2025. During the internship, he built an LLM-based pipeline to extract entities and relationships from unstructured Cyber Threat Intelligence data, fine-tuned models for cybersecurity use cases, and improved geospatial processing in Apache Spark. He learned domain knowledge quickly, worked proactively, and showed strong initiative, resilience, and cross-disciplinary learning agility.",
    author: "Ministry of Home Affairs",
    role: "Data Science internship testimonial",
    sourceLabel: "MHA testimonial PDF",
    sourceUrl: mhaTestimonialPdf,
  },
];
