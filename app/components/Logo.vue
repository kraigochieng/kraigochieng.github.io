<template>
	<UTooltip :text="t('portfolio_tooltip', { name: profile.name })">
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
			{{ profile.name }}
		</p>
	</UTooltip>
</template>

<script lang="ts" setup>
import { profile } from "@/data/profile";

const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
</script>

<style></style>
