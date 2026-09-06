// Single source of truth for the vocabularies used across project data.
// Add a value here first; the derived union types then force every
// reference (in data files and components) to match exactly.

export const DOMAINS = [
	"Healthcare",
	"E-Commerce",
	"Logistics",
	"Startups",
	"Venture Capital",
	"Dev Tool",
	// keep alphabetical-ish; uncomment as projects are re-enabled
	"Retail",
	"Finance",
	"Education",
	"Data Science",
	"Creative Coding",
	"Design Tools",
] as const;

export const SKILLS = [
	"AI",
	"AI Agents",
	"Machine Learning",
	"Explainable AI",
	"Dashboards",
	"Workflow Automation",
	"Vector Databases",
	"Prompt Engineering",
	"FFmpeg",
	"Web Development",
	"MLOps",
	"Visualization",
	"Image Processing",
	"CLI Tools",
] as const;

export const TOOLS = [
	"Nuxt",
	"FastAPI",
	"Python",
	"MLflow",
	"PostgreSQL",
	"Docker",
	"Streamlit",
	"OpenRouter",
	"FFmpeg",
	"scikit-learn",
	"Databricks",
	"D3.js",
	"Tailwind CSS",
	"Pillow",
	"NumPy",
] as const;

// Every project slug the site knows about (live, planned, or commented out).
// Each project's `slug` is checked against this registry, so a typo or a
// duplicate is a compile error.
export const PROJECT_SLUGS = [
	"medilinda",
	"jumbo-ecommerce",
	"diamond-price-predictor",
	"gradient-descent-visualiser",
	"image-to-ascii",
	"yc-pitch-predictor",
	"elevenlabs-tts-chunker",
] as const;

export type Domain = (typeof DOMAINS)[number];
export type Skill = (typeof SKILLS)[number];
export type Tool = (typeof TOOLS)[number];
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];
