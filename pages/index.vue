<template>
	<select v-model="$colorMode.preference">
		<option value="system">System</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
	<h1>Kraig Ochieng</h1>
	<h2>Data Scientist | Web Developer</h2>
	<a href="https://github.com/kraigochieng" target="_blank">Github</a>
	<a
		href="https://www.linkedin.com/in/kraig-ochieng-911121215/"
		target="_blank"
	>
		LinkedIn
	</a>
	<a href="https://coff.ee/kraigochieng">Buy me a Coffee</a>
	<h2>Projects</h2>
	<ul>
		<li>
			<NuxtLink to="/projects/medilinda">
				MediLinda. Web Development with Machine Learning
			</NuxtLink>
		</li>
	</ul>

	<h2>Experience</h2>
	<ul>
		<li>Software Developer | Intellisoft Consulting</li>
		<li>AI Developer | Chanzo Technologies</li>
	</ul>
	<h2>Experience with healthcare</h2>
	<ul>
		<li>Experience working with FHIR and FSH</li>
	</ul>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

useHead({ title: "Kraig Ochieng | Data scientist and Web Developer" });

// <h2>Skills</h2>
// 	<ul>
// 		<li>Web Development</li>
// 		<li>Machine Learning</li>
// 		<li>Data Analysis</li>
// 		<li>Deep Learning</li>
// 		<li>Web Scraping</li>
// 		<li>AI Agent Development</li>
// 		<li>CI/CD</li>
// 		<li>Containerisation</li>
// 	</ul>
// 	<h2>Languages</h2>
// 	<ul>
// 		<li>Python</li>
// 		<li>Javascript</li>
// 		<li>SQL</li>
// 	</ul>
// 	<h2>Agent Tools</h2>
// 	<ul>
// 		<li>n8n</li>
// 	</ul>
// 	<h2>Hackathons</h2>
// 	<ul>
// 		<li>KenyaRE</li>
// 		<li>Nairobi DSRH</li>
// 	</ul>
</script>
