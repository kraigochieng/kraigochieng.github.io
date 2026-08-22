<template>
	<UTooltip :text="t('portfolio_tooltip')">
		<!-- <p
			@mouseup="router.push(localePath('/'))"
			class="italic text-5xl cursor-pointer"
		>
			k
		</p> -->
		<p
			@mouseup="router.push(localePath('/'))"
			class="italic font-semibold cursor-pointer truncate max-w-[8rem] text-lg sm:max-w-none sm:text-2xl"
		>
			Kraig Ochieng
		</p>
	</UTooltip>
</template>

<script lang="ts" setup>
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
</script>

<style></style>
