<template>
	<article class="grid gap-3 py-8 md:grid-cols-[11rem_1fr] md:gap-10">
		<p class="text-xs text-neutral-500 dark:text-neutral-400">
			<template v-if="certification.expires">
				{{ certification.issued }} – {{ certification.expires }}
			</template>
			<template v-else>
				{{ t("cert_issued") }} {{ certification.issued }}
			</template>
		</p>

		<div>
			<h3 class="text-xl font-semibold tracking-tight text-primary py-0">
				{{ certification.name }}
			</h3>
			<p
				class="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
			>
				{{ certification.issuer }}
			</p>

			<p
				v-if="certification.credentialId"
				class="mt-3 text-sm text-neutral-600 dark:text-neutral-400"
			>
				ID: {{ certification.credentialId }}
			</p>

			<a
				:href="certification.link"
				target="_blank"
				class="mt-3 inline-block text-sm underline underline-offset-4 text-primary"
				>{{ t("view_credential") }}</a
			>
		</div>
	</article>
</template>

<script lang="ts" setup>
import type { Certification } from "@/types";

defineProps<{
	certification: Certification;
}>();

const { t } = useI18n();
</script>

<style></style>
