<template>
	<UTooltip :text="t('portfolio_tooltip', { name: profile.name })">
		<!-- <p
			@mouseup="router.push(localePath('/'))"
			class="italic text-5xl cursor-pointer"
		>
			k
		</p> -->
		<NuxtLink
			:to="localePath('/')"
			class="block italic font-semibold truncate max-w-[8rem] text-lg sm:max-w-none sm:text-2xl text-inherit"
		>
			{{ profile.name }}
		</NuxtLink>
	</UTooltip>
</template>

<script lang="ts" setup>
import { profile } from "@/data/profile";

const localePath = useLocalePath();
const { t } = useI18n();
</script>

<style></style>
