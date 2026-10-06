import type { Experience, Project } from "@/types";

// Experience entries use LinkedIn names such as "Python (Programming Language)"
// or "Artificial Intelligence (AI)". Keep an acronym in brackets ("AI"),
// otherwise drop the bracketed suffix ("Python").
const canonical = (name: string) => {
	const m = name.match(/^(.*?)\s*\((.*)\)\s*$/);
	if (!m) return name;
	return /^[A-Z0-9]{2,6}$/.test(m[2]!) ? m[2]! : m[1]!.trim();
};

// Most used first, then alphabetical.
const byCount = (counts: Map<string, number>) =>
	[...counts.entries()]
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.map(([name]) => name);

const tally = (names: readonly string[]) => {
	const counts = new Map<string, number>();
	for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
	return counts;
};

export const collectSkills = (
	projects: readonly Project[],
	experiences: readonly Experience[],
) => {
	const tools = byCount(tally(projects.flatMap((p) => p.tools)));
	const toolKeys = new Set(tools.map((t) => t.toLowerCase()));

	const skillNames = [
		...projects.flatMap((p) => p.skills as readonly string[]),
		...experiences.flatMap((e) => e.skills.map(canonical)),
	].filter((s) => !toolKeys.has(s.toLowerCase()));

	return { skills: byCount(tally(skillNames)), tools };
};
