<script setup lang="ts">
interface FilterItem {
	label: string;
}

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

const links = computed(() => [
	{
		label: "GitHub",
		href: "https://github.com/kraigochieng",
		icon: "i-lucide-github",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/kraig-ochieng-911121215/",
		icon: "i-lucide-linkedin",
	},
	{
		label: t("buy_me_coffee"),
		href: "https://coff.ee/kraigochieng",
		icon: "i-lucide-coffee",
	},
]);

useHead({ title: computed(() => `Kraig Ochieng | ${t("job_title")}`) });

// PROJECTS
// Slugs that have a dedicated /projects/<slug> writeup page.
const slugsWithDetailPage = [
	"medilinda",
	"diamond-price-predictor",
	"gradient-descent-visualiser",
	"image-to-ascii",
];

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

const toSelectItems = (list: string[]): FilterItem[] => {
	return list.map((item) => ({ label: item, value: item }));
};

const parseQueryParam = (
	param: string | string[] | undefined | null
): string[] => {
	if (Array.isArray(param)) return param as string[];
	if (typeof param === "string") return [param];
	return [];
};

const sortOptions = computed(() => [
	{ label: t("sort_ascending"), value: "asc" },
	{ label: t("sort_descending"), value: "desc" },
]);
const selectedSort = ref<"asc" | "desc">(
	route.query.project_sort === "desc" ? "desc" : "asc"
);
const selectedDomains = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_domain as string | string[])
	)
);
const selectedSkills = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_skills as string | string[])
	)
);
const selectedTools = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_tools as string | string[])
	)
);

watch(
	[selectedDomains, selectedSkills, selectedTools, selectedSort],
	() => {
		const domainParams = selectedDomains.value.map((d) => d.label);
		const skillParams = selectedSkills.value.map((s) => s.label);
		const toolParams = selectedTools.value.map((t) => t.label);

		router.replace({
			query: {
				...route.query,
				project_domain: domainParams.length
					? domainParams
					: undefined,
				project_skills: skillParams.length ? skillParams : undefined,
				project_tools: toolParams.length ? toolParams : undefined,
				project_sort: selectedSort.value,
			},
		});
	},
	{ deep: true }
);

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

const filteredProjects = computed(() => {
	const activeDomains = selectedDomains.value.map((d) => d.label);
	const activeSkills = selectedSkills.value.map((s) => s.label);
	const activeTools = selectedTools.value.map((t) => t.label);

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

	return result.sort((a, b) => {
		if (selectedSort.value === "asc") {
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
	selectedSort.value = "asc";
};

// CERTIFICATIONS
const certifications = [
	{
		name: "HCIA-AI (Huawei Certified ICT Associate – Artificial Intelligence)",
		issuer: "Huawei",
		issued: "Nov 2024",
		expires: "Nov 2027",
		credentialId: "010102001441809658772554048",
		link: "https://www.linkedin.com/in/kraig-ochieng-911121215/overlay/1731924227444/single-media-viewer/?type=DOCUMENT&profileId=ACoAADZNCd0BDDg_4QrhhEHVwuFlq5cOR2qAcb0",
	},
];
</script>

<template>
	<div>
		<div
			class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4"
		>
			<h1 class="text-base font-bold py-0">{{ $t("job_title") }}</h1>
			<div class="flex items-center gap-2">
				<UButton
					v-for="link in links"
					:key="link.label"
					:icon="link.icon"
					:to="link.href"
					:aria-label="link.label"
					:title="link.label"
					target="_blank"
					variant="ghost"
					size="xl"
				/>
			</div>
		</div>

		<section id="projects" class="anchor-section py-12">
			<div
				class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
			>
				<h2 class="mb-0">{{ t("projects") }} ({{ filteredProjects.length }})</h2>

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
					:label="t('clear_filters')"
					@click="clearFilters"
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<USelectMenu
					v-model="selectedSort"
					:items="sortOptions"
					value-key="value"
					:placeholder="t('sort_by')"
				/>
				<USelectMenu
					v-model="selectedDomains"
					:items="uniqueDomains"
					multiple
					searchable
					:placeholder="t('domains_placeholder')"
				/>
				<USelectMenu
					v-model="selectedSkills"
					:items="uniqueSkills"
					multiple
					searchable
					:placeholder="t('skills_placeholder')"
				/>
				<USelectMenu
					v-model="selectedTools"
					:items="uniqueTools"
					multiple
					searchable
					:placeholder="t('tools_placeholder')"
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
					:detail-path="
						slugsWithDetailPage.includes(project.slug)
							? localePath(`/projects/${project.slug}`)
							: undefined
					"
				/>
			</div>

			<div v-else class="text-center py-12">
				<p>{{ t("no_projects_match") }}</p>
				<UButton
					:label="t('reset_filters')"
					variant="link"
					color="primary"
					@click="clearFilters"
				/>
			</div>
		</section>

		<section id="certifications" class="anchor-section py-12">
			<h2>{{ t("certifications_heading") }}</h2>

			<ul class="cert-list">
				<li v-for="cert in certifications" :key="cert.name">
					<strong>{{ cert.name }}</strong> — {{ cert.issuer }}
					<template v-if="cert.expires">
						({{ cert.issued }}–{{ cert.expires }})
					</template>
					<template v-else>
						({{ t("cert_issued") }} {{ cert.issued }})
					</template>
					<template v-if="cert.credentialId">
						<br />
						ID: {{ cert.credentialId }}
					</template>
					<br />
					<a :href="cert.link" target="_blank"
						>{{ t("view_credential") }}</a
					>
				</li>
			</ul>
		</section>
	</div>
</template>

<style scoped>
@reference "assets/css/main.css";

.cert-list li {
	@apply list-none mb-6 pb-6 border-b border-black dark:border-[#c0c0c0];
}

.cert-list li:last-child {
	@apply border-b-0;
}
</style>
