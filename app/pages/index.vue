<script setup lang="ts">
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface FilterItem {
	label: string;
}

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

useHead({
	title: computed(() => `${profile.name} | ${t("job_title")}`),
});

useSeoMeta({
	description: () => t("meta_description"),
	ogTitle: () => `${profile.name} | ${t("job_title")}`,
	ogDescription: () => t("meta_description"),
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

const filteredProjects = computed(() =>
	filterProjects(projects, {
		domains: selectedDomains.value.map((d) => d.label),
		skills: selectedSkills.value.map((s) => s.label),
		tools: selectedTools.value.map((t) => t.label),
		sort: selectedSort.value,
	}),
);

// The first project is featured across the full row; if the rest would leave
// an orphan, the last card also spans the full row to keep the grid even.
const spansFullRow = (index: number) => {
	const total = filteredProjects.value.length;
	return index === 0 || (index === total - 1 && (total - 1) % 2 === 1);
};

const clearFilters = () => {
	selectedDomains.value = [];
	selectedSkills.value = [];
	selectedTools.value = [];
	selectedSort.value = "asc";
};
</script>

<template>
	<div>
		<div class="pt-10 md:pt-16">
			<h1 class="max-w-3xl text-4xl font-bold tracking-tight py-0 md:text-6xl">
				{{ $t("hero_tagline") }}
			</h1>
		</div>

		<section id="projects" class="anchor-section pt-8 pb-10 md:pt-10 md:pb-14">
			<div
				class="section-rule flex flex-col md:flex-row md:items-end justify-between gap-4"
			>
				<h2 class="flex items-center gap-2">
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
					v-reveal
					v-for="(project, index) in filteredProjects"
					:key="project.slug"
					:project="project"
					:featured="index === 0"
					:class="{ 'lg:col-span-2': spansFullRow(index) }"
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

		<section id="experience" class="anchor-section py-10 md:py-14">
			<h2 class="section-rule flex items-center gap-2">
				{{ t("work_experience") }}
			</h2>

			<div>
				<ExperienceCard
					v-reveal
					v-for="exp in experiences"
					:key="`${exp.company}-${exp.role}-${exp.start}`"
					:experience="exp"
				/>
			</div>
		</section>

		<section id="certifications" class="anchor-section py-10 pb-24 md:py-14 md:pb-32">
			<h2 class="section-rule flex items-center gap-2">
				{{ t("certifications_heading") }}
			</h2>

			<div class="divide-y divide-neutral-200 dark:divide-neutral-800">
				<CertificationCard
					v-reveal
					v-for="cert in certifications"
					:key="cert.name"
					:certification="cert"
				/>
			</div>
		</section>
	</div>
</template>
