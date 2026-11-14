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
			@click="scrollToHero"
		>
			{{ profile.name }}
		</NuxtLink>
	</UTooltip>
</template>

<script lang="ts" setup>
import { profile } from "@/data/profile";

const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();

/** Scrolls smoothly to the hero when the visitor is already on the home page. Side effect: moves the page. */
const scrollToHero = (event: MouseEvent): void => {
	if (route.path !== localePath("/")) return;
	event.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style></style>
