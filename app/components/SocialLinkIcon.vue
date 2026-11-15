<template>
	<CopyTooltip
		v-if="link.copyText && link.copyName"
		:text="link.copyText"
		:name="link.copyName"
	>
		<template #default="{ copy }">
			<button
				type="button"
				:aria-label="t('click_to_copy', { name: link.copyName })"
				class="flex size-10 items-center justify-center text-neutral-500 transition-colors dark:text-neutral-400"
				:class="link.hover"
				@click="copy"
			>
				<UIcon :name="link.icon" class="size-5" />
			</button>
		</template>
	</CopyTooltip>
	<NuxtLink
		v-else
		:to="link.href"
		target="_blank"
		rel="noopener noreferrer"
		:aria-label="link.label"
		:title="link.label"
		class="flex size-10 items-center justify-center text-neutral-500 transition-colors dark:text-neutral-400"
		:class="link.hover"
	>
		<UIcon :name="link.icon" class="size-5" />
	</NuxtLink>
</template>

<script lang="ts" setup>
import type { SocialLink } from "@/composables/useSocialLinks";

/** Draws one plain contact icon. It copies text or opens a link, by its data. */
defineProps<{
	link: SocialLink;
}>();

const { t } = useI18n();
</script>
