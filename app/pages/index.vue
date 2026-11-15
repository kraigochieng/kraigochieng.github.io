<script setup lang="ts">
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { phoneText, profile, whatsappUrl } from "@/data/profile";
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
	// Link-preview crawlers need an absolute URL.
	ogImage: `${profile.portfolioUrl}/og-image.png`,
	ogImageWidth: 1200,
	ogImageHeight: 630,
	twitterCard: "summary_large_image",
	twitterImage: `${profile.portfolioUrl}/og-image.png`,
});

/** The short phrases shown under the job title in the hero. */
const heroPhrases = computed<string[]>(() => [
	t("hero_phrase_language_agnostic"),
	t("hero_phrase_user_gravity"),
	t("hero_phrase_problems_over_tools"),
]);

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
	{ label: t("sort_importance"), value: "order" },
	{ label: t("sort_ascending"), value: "asc" },
	{ label: t("sort_descending"), value: "desc" },
]);
const selectedSort = ref<"order" | "asc" | "desc">(
	route.query.project_sort === "asc" || route.query.project_sort === "desc"
		? route.query.project_sort
		: "order",
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

const isDomainSelected = (label: string) =>
	selectedDomains.value.some((d) => d.label === label);

const toggleDomain = (label: string) => {
	selectedDomains.value = isDomainSelected(label)
		? selectedDomains.value.filter((d) => d.label !== label)
		: [...selectedDomains.value, { label }];
};

// Sort, skills and tools sit behind a toggle. Start open when a shared URL
// already sets one of them, so the active filter is never hidden.
const moreFiltersCount = computed(
	() =>
		selectedSkills.value.length +
		selectedTools.value.length +
		(selectedSort.value === "order" ? 0 : 1),
);
const showMoreFilters = ref(moreFiltersCount.value > 0);

const clearFilters = () => {
	selectedDomains.value = [];
	selectedSkills.value = [];
	selectedTools.value = [];
	selectedSort.value = "order";
};
</script>

<template>
	<div>
		<section
			id="hero"
			class="relative -mt-[var(--nav-height)] flex min-h-svh flex-col justify-center py-16 md:mt-0"
		>
			<h1 class="max-w-3xl text-5xl font-bold tracking-tight py-0 md:text-7xl">
				{{ profile.name }}
			</h1>
			<p
				class="mt-4 font-mono text-lg font-medium uppercase tracking-widest text-neutral-700 md:text-xl dark:text-neutral-300"
			>
				{{ t("job_title") }}
			</p>
			<ul
				class="mt-5 space-y-1 font-mono text-sm text-neutral-500 dark:text-neutral-400"
			>
				<li v-for="phrase in heroPhrases" :key="phrase">
					<span aria-hidden="true">// </span>{{ phrase }}
				</li>
			</ul>
			<a
				:href="profile.locationMapUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-8 flex w-fit items-center gap-2 font-mono text-sm text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
			>
				<UIcon name="i-lucide-map-pin" class="size-4" />
				{{ t("hero_location") }}
			</a>
			<p
				class="mt-8 text-lg font-medium text-neutral-800 dark:text-neutral-200"
			>
				{{ t("hero_invite") }}
			</p>
			<div class="mt-4 flex flex-wrap gap-3">
				<CopyTooltip :text="profile.email" :name="t('email_copy_name')">
					<template #default="{ copy }">
						<UButton
							size="xl"
							color="primary"
							icon="i-lucide-mail"
							:aria-label="t('click_to_copy', { name: t('email_copy_name') })"
							@click="copy"
						/>
					</template>
				</CopyTooltip>
				<CopyTooltip :text="phoneText" :name="t('phone_copy_name')">
					<template #default="{ copy }">
						<UButton
							size="xl"
							color="neutral"
							variant="outline"
							icon="i-lucide-phone"
							:aria-label="t('click_to_copy', { name: t('phone_copy_name') })"
							@click="copy"
						/>
					</template>
				</CopyTooltip>
				<UTooltip text="LinkedIn">
					<UButton
						size="xl"
						color="neutral"
						variant="outline"
						icon="i-lucide-linkedin"
						:to="profile.linkedinUrl"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					/>
				</UTooltip>
				<UTooltip text="WhatsApp">
					<UButton
						size="xl"
						color="neutral"
						variant="outline"
						icon="i-simple-icons-whatsapp"
						:to="whatsappUrl"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="WhatsApp"
					/>
				</UTooltip>
			</div>
			<a
				href="#experience"
				class="scroll-cue absolute bottom-6 left-0 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
			>
				{{ t("scroll_cue") }}
				<UIcon name="i-lucide-chevron-down" class="size-4" />
			</a>
		</section>

		<div id="content">
		<section id="experience" class="anchor-section pt-8 pb-10 md:pt-10 md:pb-14">
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

		<section id="projects" class="anchor-section py-10 md:py-14">
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

			<div class="mb-4 space-y-3">
				<div class="flex flex-wrap items-center gap-2">
					<UButton
						v-for="domain in uniqueDomains"
						:key="domain.label"
						size="sm"
						color="neutral"
						:variant="isDomainSelected(domain.label) ? 'solid' : 'outline'"
						:aria-pressed="isDomainSelected(domain.label)"
						:label="domain.label"
						@click="toggleDomain(domain.label)"
					/>
					<UButton
						size="sm"
						color="neutral"
						variant="link"
						:trailing-icon="
							showMoreFilters
								? 'i-lucide-chevron-up'
								: 'i-lucide-chevron-down'
						"
						:aria-expanded="showMoreFilters"
						aria-controls="more-filters"
						:label="
							t('more_filters') +
							(moreFiltersCount ? ` (${moreFiltersCount})` : '')
						"
						@click="() => { showMoreFilters = !showMoreFilters; }"
					/>
				</div>

				<div
					v-show="showMoreFilters"
					id="more-filters"
					class="grid grid-cols-1 md:grid-cols-3 gap-3"
				>
					<USelectMenu
						v-model="selectedSort"
						:items="sortOptions"
						value-key="value"
						:placeholder="t('sort_by')"
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

		<section id="certifications" class="anchor-section py-10 md:py-14">
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
	</div>
</template>
