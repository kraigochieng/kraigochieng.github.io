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
			class="font-display block text-xl font-semibold text-inherit"
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
