<template>
	<UCard class="border-2 border-black dark:border-[#c0c0c0]">
		<template #header>
			<h3 class="text-lg font-semibold text-primary">
				{{ certification.name }}
			</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				{{ certification.issuer }}
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
			class="text-sm text-gray-700 dark:text-gray-300 mb-4"
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
