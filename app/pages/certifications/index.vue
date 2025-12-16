<script setup lang="ts">
useHead({
	title: "Certifications – Kraig Ochieng",
	meta: [
		{
			name: "description",
			content:
				"AI, Machine Learning, and Data Engineering certifications from Huawei.",
		},
	],
});

const certifications = [
	{
		name: "HCIA-AI (Huawei Certified ICT Associate – Artificial Intelligence)",
		issuer: "Huawei",
		issued: "Nov 2024",
		expires: "Nov 2027",
		credentialId: "010102001441809658772554048",
		link: "https://www.linkedin.com/in/kraig-ochieng-911121215/overlay/1731924227444/single-media-viewer/?type=DOCUMENT&profileId=ACoAADZNCd0BDDg_4QrhhEHVwuFlq5cOR2qAcb0", // Replace with your real badge
		icon: "i-simple-icons-huawei",
		color: "text-red-600",
	},
];
</script>

<template>
	<UContainer class="py-16 max-w-4xl">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-4">Certifications</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Industry-recognized credentials in AI, data analytics, and
				software engineering.
			</p>
		</div>

		<!-- Certifications Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<UCard
				v-for="cert in certifications"
				:key="cert.name"
				class="h-full flex flex-col hover:shadow-lg transition-shadow"
			>
				<!-- Icon + Issuer -->
				<div class="flex items-center gap-3 mb-3">
					<UIcon
						:name="cert.icon"
						class="w-8 h-8"
						:class="cert.color"
					/>
					<div>
						<p class="font-semibold text-sm">{{ cert.issuer }}</p>
					</div>
				</div>

				<!-- Name -->
				<h3 class="text-lg font-medium mb-2 line-clamp-2">
					{{ cert.name }}
				</h3>

				<!-- Dates -->
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
					<template v-if="cert.expires">
						{{ cert.issued }} – {{ cert.expires }}
					</template>
					<template v-else> Issued {{ cert.issued }} </template>
				</p>

				<!-- Credential ID (optional) -->
				<p v-if="cert.credentialId" class="text-xs text-gray-500 mb-3">
					ID: {{ cert.credentialId }}
				</p>

				<!-- View Button -->
				<UButton
					:to="cert.link"
					target="_blank"
					variant="outline"
					class="mt-auto"
					size="sm"
				>
					<template #leading>
						<UIcon
							name="i-heroicons-arrow-top-right-on-square"
							class="w-4 h-4"
						/>
					</template>
					View Credential
				</UButton>
			</UCard>
		</div>
	</UContainer>
</template>
