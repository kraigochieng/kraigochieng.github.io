import { describe, expect, it } from "vitest";
import { collectSkills } from "../app/utils/collectSkills";
import type { Experience, Project } from "../app/types";

const project = (skills: string[], tools: string[]) =>
	({ skills, tools }) as unknown as Project;
const job = (skills: string[]) => ({ skills }) as unknown as Experience;

describe("collectSkills", () => {
	it("orders by how often a name appears, then alphabetically", () => {
		const r = collectSkills(
			[project(["B", "A"], ["Go"]), project(["B"], ["Go", "Rust"])],
			[],
		);
		expect(r.skills).toEqual(["B", "A"]);
		expect(r.tools).toEqual(["Go", "Rust"]);
	});

	it("merges project and experience skills and counts both", () => {
		const r = collectSkills([project(["AI"], [])], [job(["AI", "Databases"])]);
		expect(r.skills).toEqual(["AI", "Databases"]);
	});

	it("drops a skill that is already a tool, ignoring a bracketed suffix", () => {
		const r = collectSkills(
			[project(["AI"], ["Python"])],
			[job(["Python (Programming Language)", "Databases"])],
		);
		expect(r.skills).toEqual(["AI", "Databases"]);
		expect(r.tools).toEqual(["Python"]);
	});

	it("uses a bracketed acronym as the name", () => {
		const r = collectSkills(
			[project(["AI"], [])],
			[job(["Artificial Intelligence (AI)"])],
		);
		expect(r.skills).toEqual(["AI"]);
	});

	it("returns empty lists for empty input", () => {
		expect(collectSkills([], [])).toEqual({ skills: [], tools: [] });
	});
});
