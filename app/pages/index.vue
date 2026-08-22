<script setup lang="ts">
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { mailtoUrl, profile, telUrl, whatsappUrl } from "@/data/profile";
import { projects, slugsWithDetailPage } from "@/data/projects";

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
		href: profile.githubUrl,
		icon: "i-lucide-github",
	},
	{
		label: "LinkedIn",
		href: profile.linkedinUrl,
		icon: "i-lucide-linkedin",
	},
	{
		label: "WhatsApp",
		href: whatsappUrl,
		icon: "i-simple-icons-whatsapp",
	},
	{
		label: t("phone_label"),
		href: telUrl,
		icon: "i-lucide-phone",
	},
	{
		label: t("email_label"),
		href: mailtoUrl,
		icon: "i-lucide-mail",
	},
	{
		label: t("buy_me_coffee"),
		href: profile.buyMeACoffeeUrl,
		icon: "i-lucide-coffee",
	},
]);

useHead({
	title: computed(() => `${profile.name} | ${t("job_title")}`),
});

const toSelectItems = (list: string[]): FilterItem[] => {
	return list.map((item) => ({ label: item, value: item }));
};

const parseQueryParam = (
	param: string | string[] | undefined | null,
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
	route.query.project_sort === "desc" ? "desc" : "asc",
);
const selectedDomains = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_domain as string | string[]),
	),
);
const selectedSkills = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_skills as string | string[]),
	),
);
const selectedTools = ref<FilterItem[]>(
	toSelectItems(
		parseQueryParam(route.query.project_tools as string | string[]),
	),
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
				project_domain: domainParams.length ? domainParams : undefined,
				project_skills: skillParams.length ? skillParams : undefined,
				project_tools: toolParams.length ? toolParams : undefined,
				project_sort: selectedSort.value,
			},
		});
	},
	{ deep: true },
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

			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
			>
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
				<ExperienceCard
					v-for="exp in experiences"
					:key="`${exp.company}-${exp.role}-${exp.start}`"
					:experience="exp"
				/>
			</div>
		</section>

		<section id="certifications" class="anchor-section py-12">
			<h2 class="flex items-center gap-2">
				<UIcon name="i-lucide-award" class="size-6" />
				{{ t("certifications_heading") }}
			</h2>

			<div class="space-y-6">
				<CertificationCard
					v-for="cert in certifications"
					:key="cert.name"
					:certification="cert"
				/>
			</div>
		</section>
	</div>
</template>
