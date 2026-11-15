<template>
	<div class="flex h-full flex-col gap-10 p-8">
		<div v-if="!hideIdentity">
			<Logo />
			<p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
				{{ t("job_title") }}
			</p>
		</div>

		<nav
			:aria-label="t('main_nav_aria')"
			class="border-b border-neutral-300 pb-8 dark:border-neutral-700"
		>
			<ul class="space-y-0.5">
				<li v-for="item in navItems" :key="item.id">
					<NuxtLink
						:to="item.to"
						:aria-current="item.current ? 'location' : undefined"
						class="flex items-center gap-2.5 border-l-2 px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors hover:text-neutral-950 dark:hover:text-white"
						:class="
							item.current
								? 'border-neutral-900 text-neutral-950 dark:border-neutral-100 dark:text-white'
								: 'border-transparent text-neutral-500 dark:text-neutral-400'
						"
					>
						<GlyphIcon :name="item.id" class="size-4 shrink-0" />
						{{ item.label }}
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<section :aria-label="t('social_links_aria')">
			<ul class="-ml-3 grid w-fit grid-cols-4 gap-1">
				<li v-for="link in socialLinks" :key="link.id">
					<SocialLinkIcon :link="link" />
				</li>
			</ul>
		</section>

		<div class="mt-auto flex items-center gap-2">
			<Theme />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { GlyphName } from "@/data/glyphs";

// The drawer already shows the name and role in its own header.
defineProps<{
	hideIdentity?: boolean;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const socialLinks = useSocialLinks();

/** One sidebar link; its id doubles as the glyph name. */
interface NavItem {
	id: GlyphName;
	label: string;
	to: string;
	current: boolean;
}

const sectionIds: GlyphName[] = [
	"experience",
	"projects",
	"certifications",
];
const activeSection = useActiveSection(sectionIds);

const navItems = computed<NavItem[]>(() => {
	const home = localePath("/");
	return [
		{
			id: "experience",
			label: t("work_experience"),
			to: `${home}#experience`,
			current: activeSection.value === "experience",
		},
		{
			id: "projects",
			label: t("projects"),
			to: `${home}#projects`,
			current: activeSection.value === "projects",
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
