import { describe, expect, it } from "vitest";
import { glyphPaths } from "../app/data/glyphs";

const sectionIds: string[] = [
	"experience",
	"projects",
	"certifications",
	"contact",
];

describe("glyph data", () => {
	it("has one glyph for each page section", () => {
		expect(Object.keys(glyphPaths).sort()).toEqual([...sectionIds].sort());
	});

	it("gives every glyph at least one path", () => {
		for (const paths of Object.values(glyphPaths)) {
			expect(paths.length).toBeGreaterThan(0);
		}
	});

	it("keeps every path as a valid move-first path command", () => {
		for (const paths of Object.values(glyphPaths)) {
			for (const path of paths) {
				expect(path).toMatch(/^M[-\d. ,a-zA-Z]+$/);
			}
		}
	});
});
