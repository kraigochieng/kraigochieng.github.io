import type { Project } from "../types";

// `order` is the default sort: lower numbers show first (and the first is featured).
export const projects = [
	{
		name: "MediLinda",
		slug: "medilinda",
		order: 1,
		domain: ["Healthcare"],
		description:
			"Pharmacovigilance platform that helps Kenyan clinicians catch TB drug side effects early and alerts medical teams by SMS.",
		skills: ["AI", "Machine Learning", "Explainable AI"],
		tools: ["Nuxt", "FastAPI", "Python", "MLflow", "PostgreSQL", "Docker"],
		link: "https://medilinda.vercel.app",
		github: "https://github.com/kraigochieng/medilinda",
	},
	{
		name: "Jumbo E-Commerce Data Story",
		slug: "jumbo-ecommerce",
		order: 2,
		domain: ["E-Commerce", "Logistics"],
		description:
			"Data story on 100k e-commerce orders. Each finding on revenue, returns and delivery comes with the action it should drive.",
		skills: ["Visualization"],
		tools: ["Python", "SQLite"],
		link: "https://kraigochieng.github.io/ecommerce-sales-analysis/",
		github: "https://github.com/kraigochieng/ecommerce-sales-analysis",
	},
	// {
	// 	name: "Diamond Price Predictor",
	// 	slug: "diamond-price-predictor",
	// 	domain: ["Retail", "Finance"],
	// 	description:
	// 		"Pricing intelligence tool for diamond jewelers and traders, delivering diamond valuation with transparent model versioning and audit-ready predictions.",
	// 	skills: ["AI", "Web Development", "MLOps", "Machine Learning"],
	// 	tools: [
	// 		"Nuxt 4",
	// 		"FastAPI",
	// 		"MLflow",
	// 		"scikit-learn",
	// 		"Docker",
	// 		"Databricks",
	// 	],
	// 	link: "https://diamond-price-predictor-coral.vercel.app",
	// 	github: "https://github.com/kraigochieng/diamond-price-predictor",
	// },
	// {
	// 	name: "Gradient Descent Visualiser",
	// 	slug: "gradient-descent-visualiser",
	// 	domain: ["Education", "Data Science"],
	// 	description:
	// 		"Interactive learning tool that helps students, educators, and data teams understand how machine learning models optimize predictions through live, visual training simulations.",
	// 	skills: ["Machine Learning", "Visualization", "Web Development"],
	// 	tools: ["Nuxt", "FastAPI", "Python", "D3.js", "Tailwind CSS"],
	// 	link: "https://gradient-descent-visualiser.vercel.app",
	// 	github: "https://github.com/kraigochieng/gradient-descent-visualiser",
	// },
	// {
	// 	name: "Image to ASCII Art Converter",
	// 	slug: "image-to-ascii",
	// 	domain: ["Creative Coding", "Design Tools"],
	// 	description:
	// 		"Creative digital tool for designers and developers to instantly convert photos into retro-style ASCII art, supporting grayscale and color outputs for branding, terminals, and fun applications.",
	// 	skills: ["Creative Coding", "Image Processing", "CLI Tools"],
	// 	tools: ["Python", "Pillow", "NumPy"],
	// 	link: "https://image-to-ascii-2.onrender.com",
	// 	github: "https://github.com/kraigochieng/image_to_ascii_2",
	// },
	{
		name: "YC Elevator Pitch Doctor",
		slug: "yc-pitch-predictor",
		order: 3,
		domain: ["Startups", "Venture Capital"],
		description:
			"Enabling startup founders to craft elevator pitches based on top 75+ YC companies via an agent.",
		skills: [
			"AI Agents",
			"Workflow Automation",
			"Vector Databases",
			"Prompt Engineering",
		],
		tools: ["Python", "FastAPI", "Docker", "OpenRouter"],
		link: "https://yc-elevator-pitch-doctor.onrender.com",
		github: "https://github.com/kraigochieng/yc-elevator-pitch-doctor",
		// n8n webhook currently returns 404 - workflow needs reactivating.
	},
	{
		name: "ElevenLabs Text-To-Speech Chunker",
		slug: "elevenlabs-tts-chunker",
		order: 4,
		domain: ["Dev Tool"],
		description:
			"FastAPI wrapper that gets around the ElevenLabs 10,000-character limit: it chunks long text, synthesizes each chunk, and returns one mp3.",
		skills: ["FFmpeg", "Web Development"],
		tools: ["Python", "FastAPI", "Docker", "FFmpeg"],
		link: "https://elevenlabs-tts-chunker.vercel.app/",
		github: "https://github.com/kraigochieng/elevenlabs-tts-chunker",
	},
	{
		name: "Claude Code Config",
		slug: "claude-code-config",
		order: 5,
		domain: ["Dev Tool"],
		description:
			"My Claude Code setup, versioned in git. It enforces conventional commits, an issue-and-branch workflow, and a writing style.",
		skills: ["AI Agents", "Prompt Engineering"],
		tools: [],
		link: null,
		github: "https://github.com/kraigochieng/kraigochieng.claude-code",
	},
] satisfies Project[];
