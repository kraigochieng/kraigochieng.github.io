<script setup lang="ts">
const project = {
  name: 'MediLinda',
  tagline: 'AI-Driven Pharmacovigilance for Safer TB Treatment',
  description: `MediLinda is an AI-powered system that assists pharmacovigilance experts in assessing whether tuberculosis (TB) drugs are causing harmful side effects. 
  It combines machine learning, explainable AI (SHAP), and SMS communication to improve drug safety monitoring across Kenya, even in regions with limited internet access.`,
  scope: ['AI', 'Healthcare', 'Pharmacovigilance', 'Explainable AI'],
  objectives: [
    'Assist the Pharmacy and Poisons Board (PPB) in predicting ADR causality levels using machine learning.',
    'Provide interpretable predictions to support expert consensus and transparency.',
    'Enable SMS alerts and information requests for healthcare providers in low-connectivity areas.'
  ],
  technologies: [
    'Nuxt (Frontend)',
    'FastAPI (Backend)',
    'Python + Scikit-learn (Machine Learning)',
    'MLflow (Model Tracking)',
    'PostgreSQL + SQLite (Databases)',
    'MinIO (Object Storage)',
    'Africa’s Talking (SMS Integration)',
    'Docker (Deployment)'
  ],
  architectureImage: '/medilinda/architecture.png',
  github: 'https://github.com/kraigochieng/4th-year-project/tree/main'
}
</script>

<template>
  <UContainer class="py-12 space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3">
      <h1 class="text-4xl font-bold text-primary">{{ project.name }}</h1>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto">{{ project.tagline }}</p>
    </div>

    <!-- Description -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-information-circle" class="text-primary" />
          <span class="font-semibold">Project Overview</span>
        </div>
      </template>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ project.description }}
      </p>
    </UCard>

    <!-- Scope -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-sparkles" class="text-primary" />
          <span class="font-semibold">Project Scope</span>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="item in project.scope"
          :key="item"
          color="primary"
          variant="subtle"
        >
          {{ item }}
        </UBadge>
      </div>
    </UCard>

    <!-- Problem and Solution -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-light-bulb" class="text-primary" />
          <span class="font-semibold">Problem & Solution</span>
        </div>
      </template>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pharmacovigilance in Kenya faces delays and inconsistencies due to manual drug safety
        assessments, limited experts, and infrastructure constraints. MediLinda automates
        this process using machine learning models trained on synthetic ADR data for
        tuberculosis drugs — Pyrazinamide, Ethambutol, Isoniazid, and Rifampin.
      </p>
      <p class="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
        The system predicts the likelihood of a drug causing an adverse reaction and explains
        its reasoning via SHAP (SHapley Additive Explanations). It enhances transparency,
        speeds up causality decisions, and notifies healthcare institutions through SMS,
        ensuring rapid response even in low-connectivity areas.
      </p>
    </UCard>

    <!-- Architecture -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-cube-transparent" class="text-primary" />
          <span class="font-semibold">System Architecture</span>
        </div>
      </template>

      <div class="space-y-4">
        <img
          :src="project.architectureImage"
          alt="MediLinda System Architecture Diagram"
          class="rounded-lg border border-gray-200 dark:border-gray-700"
        />
        <p class="text-sm text-gray-500 text-center">
          Frontend (Nuxt) ↔ Backend (FastAPI) ↔ MLflow & Model Server ↔ Africa’s Talking SMS Gateway.
        </p>
      </div>
    </UCard>

    <!-- Objectives -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-flag" class="text-primary" />
          <span class="font-semibold">Objectives</span>
        </div>
      </template>
      <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li v-for="obj in project.objectives" :key="obj">{{ obj }}</li>
      </ul>
    </UCard>

    <!-- Technologies -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-cog-6-tooth" class="text-primary" />
          <span class="font-semibold">Technologies Used</span>
        </div>
      </template>
      <ul class="grid sm:grid-cols-2 gap-2">
        <li
          v-for="tech in project.technologies"
          :key="tech"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <UBadge color="primary" variant="subtle">{{ tech.split('(')[0] }}</UBadge>
          <span class="text-gray-700 dark:text-gray-300">{{ tech }}</span>
        </li>
      </ul>
    </UCard>

    <!-- Impact -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-chart-bar" class="text-primary" />
          <span class="font-semibold">Impact & Outcomes</span>
        </div>
      </template>
      <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>Improved speed and consistency of ADR causality assessments.</li>
        <li>Introduced explainability (via SHAP) for better trust in AI decisions.</li>
        <li>Digitized expert voting and feedback for audit-ready tracking.</li>
        <li>Enhanced communication through SMS alerts for remote facilities.</li>
        <li>Laid foundation for integration with Kenya’s PvERS system.</li>
      </ul>
    </UCard>

    <!-- Future Work -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-rocket-launch" class="text-primary" />
          <span class="font-semibold">Future Enhancements</span>
        </div>
      </template>
      <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>Integrate with PvERS and WHO’s VigiBase for real-world data exchange.</li>
        <li>Add OCR for digitizing paper-based ADR reports.</li>
        <li>Enable two-way SMS feedback loops for report follow-ups.</li>
        <li>Expand dataset with real ADR and lab test data to improve accuracy.</li>
        <li>Introduce anomaly detection for rare and early drug safety signals.</li>
      </ul>
    </UCard>

    <!-- GitHub -->
    <div class="text-center pt-6">
      <UButton
        color="primary"
        size="lg"
        icon="i-simple-icons-github"
        :to="project.github"
        target="_blank"
      >
        View Source on GitHub
      </UButton>
    </div>
  </UContainer>
</template>
