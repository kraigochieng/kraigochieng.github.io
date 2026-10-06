import { describe, expect, it } from "vitest";
import { certifications } from "../app/data/certifications";
import { experiences } from "../app/data/experience";
import { projects } from "../app/data/projects";

describe("projects data", () => {
	it("has unique slugs", () => {
		const slugs = projects.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it("has https links where a link is set", () => {
		for (const p of projects) {
			for (const url of [p.link, p.github]) {
				if (url) expect(url).toMatch(/^https:\/\//);
			}
		}
	});

	it("has a name, description and at least one domain", () => {
		for (const p of projects) {
			expect(p.name).not.toBe("");
			expect(p.description).not.toBe("");
			expect(p.domain.length).toBeGreaterThan(0);
		}
	});
});

describe("experience data", () => {
	it("has at least one current role", () => {
		const current = experiences.filter((e) => e.end === null);
		expect(current.length).toBeGreaterThan(0);
	});

	it("has achievements for every role", () => {
		for (const e of experiences) {
			expect(e.achievements.length).toBeGreaterThan(0);
		}
	});
});

describe("certifications data", () => {
	it("has an https link for every certification", () => {
		for (const c of certifications) {
			expect(c.link).toMatch(/^https:\/\//);
		}
	});
});
