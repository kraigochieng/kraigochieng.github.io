<script setup lang="ts">
interface FilterItem {
	label: string;
}

useHead({
	title: "Projects – Kraig Ochieng",
	meta: [
		{ name: "description", content: "Data Science & Engineering Projects" },
	],
});

const route = useRoute();
const router = useRouter();

// 2. DATA
const projects = [
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
	},
];

// Helper Functions
const parseQueryParam = (
	param: string | string[] | undefined | null
): string[] => {
	if (Array.isArray(param)) return param as string[];
	if (typeof param === "string") return [param];
	return [];
};

const toSelectItems = (list: string[]): FilterItem[] => {
	return list.map((item) => ({ label: item, value: item }));
};

// Dropdown V-Models
const selectedSort = ref<FilterItem>({
	label: (route.query.sort as string) || "Ascending",
});

const selectedDomains = ref<FilterItem[]>(
	toSelectItems(parseQueryParam(route.query.domain as string | string[]))
);
const selectedSkills = ref<FilterItem[]>(
	toSelectItems(parseQueryParam(route.query.skills as string | string[]))
);
const selectedTools = ref<FilterItem[]>(
	toSelectItems(parseQueryParam(route.query.tools as string | string[]))
);

// Dropdown items
const sortOptions = ref<FilterItem[]>([
	{ label: "Ascending" },
	{ label: "Descending" },
]);

const uniqueDomains = computed(() => {
	const list = [...new Set(projects.flatMap((p) => p.domain))].sort();
	return toSelectItems(list);
});

const uniqueSkills = computed(() => {
	const list = [...new Set(projects.flatMap((p) => p.skills))].sort();
	return toSelectItems(list);
});

const uniqueTools = computed(() => {
	const list = [...new Set(projects.flatMap((p) => p.tools))].sort();
	return toSelectItems(list);
});

// Update URL on dropdown interaction
watch(
	[selectedDomains, selectedSkills, selectedTools, selectedSort],
	() => {
		const domainParams = selectedDomains.value.map((d) => d.label);
		const skillParams = selectedSkills.value.map((s) => s.label);
		const toolParams = selectedTools.value.map((t) => t.label);

		router.replace({
			query: {
				...route.query,
				domain: domainParams.length ? domainParams : undefined,
				skills: skillParams.length ? skillParams : undefined,
				tools: toolParams.length ? toolParams : undefined,
				sort: selectedSort.value.label,
			},
		});
	},
	{ deep: true }
);

// 7. FILTERING & SORTING LOGIC
const filteredProjects = computed(() => {
	// Extract simple string arrays from the selected Objects to make comparison easy
	const activeDomains = selectedDomains.value.map((d) => d.label);
	const activeSkills = selectedSkills.value.map((s) => s.label);
	const activeTools = selectedTools.value.map((t) => t.label);

	// A. Filter
	let result = projects.filter((project) => {
		const matchDomain =
			activeDomains.length === 0 ||
			project.domain.some((d) => activeDomains.includes(d));

		const matchSkills =
			activeSkills.length === 0 ||
			project.skills.some((s) => activeSkills.includes(s));

		const matchTools =
			activeTools.length === 0 ||
			project.tools.some((t) => activeTools.includes(t));

		return matchDomain && matchSkills && matchTools;
	});

	// B. Sort
	return result.sort((a, b) => {
		if (selectedSort.value.label === "Ascending") {
			return a.name.localeCompare(b.name);
		} else {
			return b.name.localeCompare(a.name);
		}
	});
});

const clearFilters = () => {
	selectedDomains.value = [];
	selectedSkills.value = [];
	selectedTools.value = [];
	selectedSort.value = { label: "Ascending" };
};
</script>

<template>
	<UContainer class="py-12 space-y-8">
		<div
			class="flex flex-col md:flex-row md:items-end justify-between gap-4"
		>
			<h2 class="text-3xl font-bold">
				Projects ({{ filteredProjects.length }})
			</h2>

			<UButton
				v-if="
					selectedDomains.length ||
					selectedSkills.length ||
					selectedTools.length
				"
				icon="i-lucide-x"
				size="xs"
				color="neutral"
				variant="soft"
				label="Clear Filters"
				@click="clearFilters"
			/>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<USelectMenu
				v-model="selectedSort"
				:options="sortOptions"
				placeholder="Sort By"
			/>

			<USelectMenu
				v-model="selectedDomains"
				:items="uniqueDomains"
				multiple
				searchable
				placeholder="Domains"
			/>

			<USelectMenu
				v-model="selectedSkills"
				:items="uniqueSkills"
				multiple
				searchable
				placeholder="Skills"
			/>

			<USelectMenu
				v-model="selectedTools"
				:items="uniqueTools"
				multiple
				searchable
				placeholder="Tools"
			/>
		</div>

		<div
			v-if="filteredProjects.length > 0"
			class="grid grid-cols-1 lg:grid-cols-2 gap-8"
		>
			<ProjectCard
				v-for="project in filteredProjects"
				:key="project.slug"
				:project="project"
			/>
		</div>

		<div v-else class="text-center py-12 text-gray-500">
			<UIcon name="i-lucide-search" class="text-4xl mb-2 opacity-50" />
			<p>No projects match your current filters.</p>
			<UButton
				label="Reset all filters"
				variant="link"
				color="primary"
				@click="clearFilters"
			/>
		</div>
	</UContainer>
</template>
