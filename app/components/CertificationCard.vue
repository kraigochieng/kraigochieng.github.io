<template>
	<UCard class="border border-neutral-300 dark:border-neutral-700 transition-colors hover:border-neutral-900 dark:hover:border-neutral-300">
		<template #header>
			<h3 class="text-xl font-bold tracking-tight text-primary py-0">
				{{ certification.name }}
			</h3>
			<p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
				{{ certification.issuer }}
			</p>
			<p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
				<template v-if="certification.expires">
					{{ certification.issued }} – {{ certification.expires }}
				</template>
				<template v-else>
					{{ t("cert_issued") }} {{ certification.issued }}
				</template>
			</p>
		</template>

		<p
			v-if="certification.credentialId"
			class="text-sm text-neutral-700 dark:text-neutral-300 mb-4"
		>
			ID: {{ certification.credentialId }}
		</p>

		<a
			:href="certification.link"
			target="_blank"
			class="text-sm underline text-primary"
			>{{ t("view_credential") }}</a
		>
	</UCard>
</template>

<script lang="ts" setup>
import type { Certification } from "@/types";

defineProps<{
	certification: Certification;
}>();

const { t } = useI18n();
</script>

<style></style>
