import { describe, expect, it } from "vitest";
import { assignLanes, type Span } from "../app/utils/assignLanes";
import { InvalidSpanError } from "../app/utils/errors";

const month = (year: number, monthIndex: number): number =>
	year * 12 + monthIndex;

describe("assignLanes", () => {
	it("puts an overlapping contract in a second lane", () => {
		const robin: Span = { startMonth: month(2026, 0), endMonth: month(2026, 10) };
		const intellisoft: Span = {
			startMonth: month(2026, 1),
			endMonth: month(2026, 5),
		};
		expect(assignLanes({ spans: [robin, intellisoft] })).toEqual([0, 1]);
	});

	it("lets roles that do not overlap share a lane", () => {
		const first: Span = { startMonth: month(2023, 6), endMonth: month(2023, 9) };
		const second: Span = { startMonth: month(2024, 6), endMonth: month(2024, 8) };
		expect(assignLanes({ spans: [first, second] })).toEqual([0, 0]);
	});

	it("treats spans that share one month as overlapping", () => {
		const first: Span = { startMonth: month(2025, 0), endMonth: month(2025, 1) };
		const second: Span = { startMonth: month(2025, 1), endMonth: month(2025, 4) };
		expect(assignLanes({ spans: [first, second] })).toEqual([0, 1]);
	});

	it("keeps the input order when the input is not sorted by start", () => {
		const later: Span = { startMonth: month(2026, 0), endMonth: month(2026, 10) };
		const earlier: Span = { startMonth: month(2025, 1), endMonth: month(2025, 11) };
		const overlappingLater: Span = {
			startMonth: month(2026, 1),
			endMonth: month(2026, 5),
		};
		expect(assignLanes({ spans: [later, earlier, overlappingLater] })).toEqual([
			0, 0, 1,
		]);
	});

	it("reuses the lowest free lane", () => {
		const long: Span = { startMonth: month(2025, 0), endMonth: month(2025, 11) };
		const shortOverlap: Span = {
			startMonth: month(2025, 1),
			endMonth: month(2025, 2),
		};
		const afterShort: Span = { startMonth: month(2025, 4), endMonth: month(2025, 6) };
		expect(assignLanes({ spans: [long, shortOverlap, afterShort] })).toEqual([
			0, 1, 1,
		]);
	});

	it("returns an empty list for no spans", () => {
		expect(assignLanes({ spans: [] })).toEqual([]);
	});

	it("throws when a span ends before it starts", () => {
		const backwards: Span = { startMonth: month(2026, 5), endMonth: month(2026, 1) };
		expect(() => assignLanes({ spans: [backwards] })).toThrow(InvalidSpanError);
	});
});
