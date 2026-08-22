import type { Project } from "../types";

// Slugs that have a dedicated /projects/<slug> writeup page.
export const slugsWithDetailPage = [
	"medilinda",
	"diamond-price-predictor",
	"gradient-descent-visualiser",
	"image-to-ascii",
];

export const projects: Project[] = [
	{
		name: "MediLinda",
		slug: "medilinda",
		domain: ["Healthcare"],
		description:
			"Pharmacovigilance platform enabling Kenyan healthcare providers to detect TB drug side effects early, improve patient safety, and trigger instant SMS alerts to medical teams nationwide.",
		skills: ["AI", "Machine Learning", "Explainable AI"],
		tools: ["Nuxt", "FastAPI", "Python", "MLflow", "PostgreSQL", "Docker"],
		link: "https://medilinda.vercel.app",
		github: "https://github.com/kraigochieng/medilinda",
	},
	{
		name: "Jumbo E-Commerce Dashboard",
		slug: "jumbo-ecommerce",
		domain: ["E-Commerce", "Logistics"],
		description:
			"Optimizing global e-commerce operations through deep-dive analysis of revenue, returns, and shipping efficiency.",
		skills: ["Dashboards"],
		tools: ["Python", "PostgreSQL", "Streamlit"],
		link: "https://ecommerce-sales-analysis.streamlit.app/",
		github: "https://github.com/kraigochieng/ecommerce-sales-analysis",
		// Streamlit Community Cloud app has gone to sleep from inactivity.
		previewBlocked: true,
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
		domain: ["Startups", "Venture Capital"],
		description:
			"Enabling startup founders to craft elevator pitches based on top 75+ YC companies via an agent.",
		skills: [
			"AI Agents",
			"Workflow Automation",
			"Vector Databases",
			"Prompt Engineering",
		],
		tools: ["n8n", "Pinecone"],
		link: "https://kraigochieng.app.n8n.cloud/webhook/33c28bc2-c6bb-4c18-b53f-00bb2aaac41b/chat",
		github: null,
		// n8n webhook currently returns 404 - workflow needs reactivating.
		previewBlocked: true,
	},
];
