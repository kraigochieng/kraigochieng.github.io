<script setup lang="ts">
interface FilterItem {
	label: string;
}

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// Single source of truth for the phone number, digits only (no "+", no spaces).
const phoneNumber = "254792701195";

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
		label: "WhatsApp",
		href: `https://wa.me/${phoneNumber}`,
		icon: "i-simple-icons-whatsapp",
	},
	{
		label: t("phone_label"),
		href: `tel:+${phoneNumber}`,
		icon: "i-lucide-phone",
	},
	{
		label: t("email_label"),
		href: "mailto:kraigochieng@gmail.com",
		icon: "i-lucide-mail",
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

// EXPERIENCE
const experiences = [
	{
		role: "Artificial Intelligence Engineer",
		company: "Robin",
		employmentType: "Full-time",
		start: "Jan 2026",
		end: null,
		duration: "8 mos",
		location: "Nairobi, Kenya",
		workType: "Hybrid",
		achievements: [
			"Engineered a custom newsletter pipeline in n8n serving 5+ clients, compressing a multi-person, multi-hour workflow into a 10-minute end-to-end process",
			"Automated workflow run logging to Google Sheets across 5+ client workflows, giving executives a clear breakdown of how the AI scored and selected articles",
		],
		skills: ["Artificial Intelligence (AI)", "Workflow Automation"],
	},
	{
		role: "Data Engineer",
		company: "IntelliSOFT Consulting Ltd",
		employmentType: "Contract",
		start: "Feb 2026",
		end: "Jun 2026",
		duration: "5 mos",
		location: "Nairobi County, Kenya",
		workType: "Remote",
		achievements: [
			"Engineered a data ingestion pipeline using Polars that enabled a contraceptive intelligence platform to import client spreadsheets directly into the web application",
		],
		skills: ["Databases", "Python (Programming Language)"],
	},
	{
		role: "AI Developer",
		company: "Chanzo Technologies",
		employmentType: "Full-time",
		start: "Feb 2025",
		end: "Feb 2026",
		duration: "1 yr 1 mo",
		location: "Nairobi County, Kenya",
		workType: "Hybrid",
		achievements: [
			"Automated career recommendations to parents of 500+ students by engineering a Text-to-SQL Agent using LangGraph and FastAPI to deliver.",
			"Reduced agent errors by 80% and cut query generation time by 60% by redesigning SQL views to flatten complex relational data.",
			"Achieved 95%+ precision in fraud detection by implementing a real-time system utilizing Benford's Law, Isolation Forest, and text anomaly detection.",
			"Slashed false positives by 75% by refining rule-based logic for duplicate transactions and unusual timestamp patterns.",
			"Reduced debugging time to <10 seconds by implementing comprehensive agent tracing via LangSmith",
		],
		skills: ["Python (Programming Language)", "Prompt Engineering"],
	},
	{
		role: "Software Developer",
		company: "AssistiveMath",
		employmentType: "Part-time",
		start: "Dec 2024",
		end: "Dec 2025",
		duration: "1 yr 1 mo",
		location: "Nairobi County, Kenya",
		workType: "Remote",
		achievements: [
			"Developed core system features using Nuxt showcased in the pitch that helped the team win Top Assistive Tech Innovation at the 6th Inclusive Africa Conference.",
		],
		skills: ["Assistive Technology", "Web Application Development"],
	},
	{
		role: "Software Engineer Intern",
		company: "IntelliSOFT Consulting Ltd",
		employmentType: "Internship",
		start: "Jul 2024",
		end: "Sep 2024",
		duration: "3 mos",
		location: "Nairobi County, Kenya",
		workType: "On-site",
		achievements: [
			"Accelerated 3 project timelines by 20% by developing FHIR Implementation Guides and HL7 artifacts (FSH)",
			"Improved data interoperability for a 5-developer team by creating standardized OpenMRS data dictionaries.",
			"Optimised developer onboarding for OpenMRS by 1 month for 1 developer, speeding up development work",
		],
		skills: [
			"Web Development",
			"Fast Healthcare Interoperability Resources (FHIR)",
		],
		links: [
			{
				label: "HIV-FHIR-IG",
				href: "https://github.com/IntelliSOFT-Consulting/HIV-FHIR-IG",
			},
			{
				label: "ChanjoKe-FHIR-IG",
				href: "https://github.com/IntelliSOFT-Consulting/ChanjoKe-FHIR-IG",
			},
			{
				label: "ChanjoKe-HIE",
				href: "https://github.com/IntelliSOFT-Consulting/ChanjoKe-HIE",
			},
		],
	},
	{
		role: "Software Engineer Intern",
		company: "IntelliSOFT Consulting Ltd",
		employmentType: "Internship",
		start: "Jul 2023",
		end: "Oct 2023",
		duration: "4 mos",
		location: "Nairobi County, Kenya",
		workType: null,
		achievements: [
			"Customised an Odoo module using Python delivering custom services for one of the company clients",
			"Increased my knowledge in Docker for local development",
			"Increased my knowledge in Git for team collaboration",
		],
		skills: ["Fast Healthcare Interoperability Resources (FHIR)", "OpenMRS"],
	},
];

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

		<section id="projects" class="anchor-section py-6">
			<div
				class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4"
			>
				<h2 class="mb-0 flex items-center gap-2">
					<UIcon name="i-lucide-code" class="size-6" />
					{{ t("projects") }} ({{ filteredProjects.length }})
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
					:label="t('clear_filters')"
					@click="clearFilters"
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
				class="grid grid-cols-1 lg:grid-cols-2 gap-4"
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

		<section id="experience" class="anchor-section py-6">
			<h2 class="flex items-center gap-2">
				<UIcon name="i-lucide-briefcase" class="size-6" />
				{{ t("work_experience") }}
			</h2>

			<div class="space-y-6">
				<UCard
					v-for="exp in experiences"
					:key="`${exp.company}-${exp.role}-${exp.start}`"
					class="border-2 border-black dark:border-[#c0c0c0]"
				>
					<template #header>
						<h3 class="text-lg font-semibold text-primary">
							{{ exp.role }}
						</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							{{ exp.company }} · {{ exp.employmentType }}
						</p>
						<p
							class="text-xs text-gray-500 dark:text-gray-400 mt-1"
						>
							{{ exp.start }} –
							{{ exp.end ?? t("present") }} · {{ exp.duration }}
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">
							{{ exp.location
							}}<template v-if="exp.workType">
								· {{ exp.workType }}</template
							>
						</p>
					</template>

					<ul
						class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4"
					>
						<li v-for="(point, i) in exp.achievements" :key="i">
							{{ point }}
						</li>
					</ul>

					<div
						v-if="exp.links?.length"
						class="flex flex-wrap gap-3 mb-4 text-sm"
					>
						<a
							v-for="link in exp.links"
							:key="link.href"
							:href="link.href"
							target="_blank"
							>{{ link.label }}</a
						>
					</div>

					<div
						v-if="exp.skills.length"
						class="flex flex-wrap gap-1.5"
					>
						<UBadge
							v-for="skill in exp.skills"
							:key="skill"
							color="neutral"
							variant="outline"
							size="lg"
						>
							{{ skill }}
						</UBadge>
					</div>
				</UCard>
			</div>
		</section>

		<section id="certifications" class="anchor-section py-12">
			<h2 class="flex items-center gap-2">
				<UIcon name="i-lucide-award" class="size-6" />
				{{ t("certifications_heading") }}
			</h2>

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
