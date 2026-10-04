<template>
	<div class="flex h-full flex-col gap-10 p-8">
		<div>
			<Logo />
			<p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
				{{ t("job_title") }}
			</p>
		</div>

		<nav :aria-label="t('main_nav_aria')">
			<ul class="space-y-0.5">
				<li v-for="item in navItems" :key="item.id">
					<NuxtLink
						:to="item.to"
						:aria-current="item.current ? 'location' : undefined"
						class="block border-l px-3 py-1.5 text-sm transition-colors hover:text-neutral-950 dark:hover:text-white"
						:class="
							item.current
								? 'border-neutral-900 font-medium text-neutral-950 dark:border-neutral-100 dark:text-white'
								: 'border-transparent text-neutral-500 dark:text-neutral-400'
						"
					>
						{{ item.label }}
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<section :aria-label="t('social_links_aria')">
			<h2
				class="px-3 pb-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400"
			>
				{{ t("social_links_aria") }}
			</h2>
			<ul class="space-y-0.5">
				<li v-for="link in socialLinks" :key="link.label">
					<NuxtLink
						:to="link.href"
						target="_blank"
						class="flex items-center gap-3 border-l border-transparent px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
					>
						<UIcon :name="link.icon" class="size-4" />
						{{ link.label }}
					</NuxtLink>
				</li>
			</ul>
		</section>

		<div class="mt-auto flex items-center gap-2">
			<Locale />
			<Theme />
		</div>
	</div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const socialLinks = useSocialLinks();

const sectionIds = ["projects", "experience", "certifications"];
const activeSection = useActiveSection(sectionIds);

const navItems = computed(() => {
	const home = localePath("/");
	return [
		{
			id: "home",
			label: t("nav_home"),
			to: home,
			current: activeSection.value === "",
		},
		{
			id: "projects",
			label: t("projects"),
			to: `${home}#projects`,
			current: activeSection.value === "projects",
		},
		{
			id: "experience",
			label: t("work_experience"),
			to: `${home}#experience`,
			current: activeSection.value === "experience",
		},
		{
			id: "certifications",
			label: t("nav_certifications"),
			to: `${home}#certifications`,
			current: activeSection.value === "certifications",
		},
	];
});
</script>
