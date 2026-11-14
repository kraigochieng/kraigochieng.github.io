import { describe, expect, it } from "vitest";
import {
	buildFieldLines,
	fieldEdges,
	fieldPoints,
	highlightedPointIndex,
} from "../app/data/vectorField";

describe("vector field data", () => {
	it("keeps every point inside the 0 to 100 grid", () => {
		for (const point of fieldPoints) {
			expect(point.x).toBeGreaterThanOrEqual(0);
			expect(point.x).toBeLessThanOrEqual(100);
			expect(point.y).toBeGreaterThanOrEqual(0);
			expect(point.y).toBeLessThanOrEqual(100);
		}
	});

	it("points every edge at two different, real points", () => {
		for (const [fromIndex, toIndex] of fieldEdges) {
			expect(fromIndex).not.toBe(toIndex);
			expect(fieldPoints[fromIndex]).toBeDefined();
			expect(fieldPoints[toIndex]).toBeDefined();
		}
	});

	it("has no repeated edge", () => {
		const keys: string[] = fieldEdges.map(([fromIndex, toIndex]) =>
			[Math.min(fromIndex, toIndex), Math.max(fromIndex, toIndex)].join("-"),
		);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("highlights a real point", () => {
		expect(fieldPoints[highlightedPointIndex]).toBeDefined();
	});
});

describe("buildFieldLines", () => {
	it("builds one line for each edge", () => {
		expect(buildFieldLines(fieldPoints, fieldEdges)).toHaveLength(
			fieldEdges.length,
		);
	});

	it("copies the point coordinates into the line", () => {
		expect(
			buildFieldLines(
				[
					{ x: 1, y: 2 },
					{ x: 3, y: 4 },
				],
				[[0, 1]],
			),
		).toEqual([{ x1: 1, y1: 2, x2: 3, y2: 4 }]);
	});

	it("skips an edge that names a missing point", () => {
		expect(buildFieldLines([{ x: 1, y: 2 }], [[0, 5]])).toEqual([]);
	});
});
