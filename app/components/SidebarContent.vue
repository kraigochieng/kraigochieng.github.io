<template>
	<div class="flex h-full flex-col gap-8 p-6">
		<div>
			<Logo />
			<p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
				{{ t("job_title") }}
			</p>
		</div>

		<nav :aria-label="t('main_nav_aria')">
			<ul class="space-y-1">
				<li v-for="item in navItems" :key="item.id">
					<NuxtLink
						:to="item.to"
						:aria-current="item.current ? 'location' : undefined"
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
						:class="
							item.current
								? 'bg-neutral-100 dark:bg-neutral-800'
								: 'text-neutral-600 dark:text-neutral-400'
						"
					>
						<UIcon :name="item.icon" class="size-4" />
						{{ item.label }}
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<section :aria-label="t('social_links_aria')">
			<h2
				class="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
			>
				{{ t("social_links_aria") }}
			</h2>
			<ul class="space-y-1">
				<li v-for="link in socialLinks" :key="link.label">
					<NuxtLink
						:to="link.href"
						target="_blank"
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
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
			icon: "i-lucide-home",
			to: home,
			current: activeSection.value === "",
		},
		{
			id: "projects",
			label: t("projects"),
			icon: "i-lucide-code",
			to: `${home}#projects`,
			current: activeSection.value === "projects",
		},
		{
			id: "experience",
			label: t("work_experience"),
			icon: "i-lucide-briefcase",
			to: `${home}#experience`,
			current: activeSection.value === "experience",
		},
		{
			id: "certifications",
			label: t("nav_certifications"),
			icon: "i-lucide-award",
			to: `${home}#certifications`,
			current: activeSection.value === "certifications",
		},
	];
});
</script>
