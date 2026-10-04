<template>
	<Transition name="fade">
		<UButton
			v-if="visible"
			icon="i-lucide-arrow-up"
			color="neutral"
			variant="solid"
			size="xl"
			class="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
			:aria-label="t('scroll_to_top')"
			@click="scrollToTop"
		/>
	</Transition>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const visible = ref(false);

const onScroll = () => {
	visible.value = window.scrollY > 400;
};

const scrollToTop = () => {
	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
};

onMounted(() => {
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
