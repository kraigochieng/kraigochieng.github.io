import { describe, expect, it } from "vitest";
import { filterProjects } from "../app/utils/filterProjects";
import type { Project } from "../app/types";

const make = (name: string, p: Partial<Project> = {}) =>
	({
		name,
		order: 0,
		slug: name.toLowerCase(),
		domain: [],
		description: "",
		skills: [],
		tools: [],
		link: null,
		github: null,
		...p,
	}) as unknown as Project;

const none = { domains: [], skills: [], tools: [], sort: "asc" as const };
const byOrder = { ...none, sort: "order" as const };

const list = [
	make("Beta", { order: 1, domain: ["Healthcare"], tools: ["Python"] }),
	make("Alpha", { order: 3, domain: ["Finance"], tools: ["Nuxt", "Python"] }),
	make("Gamma", { order: 2, domain: ["Healthcare"], tools: ["Nuxt"] }),
];

describe("filterProjects", () => {
	it("returns everything when no filter is set", () => {
		expect(filterProjects(list, none)).toHaveLength(3);
	});

	it("matches any value within one filter", () => {
		const r = filterProjects(list, { ...none, domains: ["Finance", "Healthcare"] });
		expect(r).toHaveLength(3);
	});

	it("requires a match in every filter that is set", () => {
		const r = filterProjects(list, {
			...none,
			domains: ["Healthcare"],
			tools: ["Nuxt"],
		});
		expect(r.map((p) => p.name)).toEqual(["Gamma"]);
	});

	it("sorts by name in both directions", () => {
		expect(filterProjects(list, none).map((p) => p.name)).toEqual([
			"Alpha",
			"Beta",
			"Gamma",
		]);
		expect(
			filterProjects(list, { ...none, sort: "desc" }).map((p) => p.name),
		).toEqual(["Gamma", "Beta", "Alpha"]);
	});

	it("sorts by importance order", () => {
		expect(filterProjects(list, byOrder).map((p) => p.name)).toEqual([
			"Beta",
			"Gamma",
			"Alpha",
		]);
	});

	it("does not change the input list", () => {
		const copy = [...list];
		filterProjects(list, { ...none, sort: "desc" });
		expect(list).toEqual(copy);
	});
});
