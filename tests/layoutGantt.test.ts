import { describe, expect, it } from "vitest";
import { InvalidMonthYearError } from "../app/utils/errors";
import { experienceKey, layoutGantt } from "../app/utils/layoutGantt";
import type { Experience } from "../app/types";

const nowMonth: number = 2026 * 12 + 10;

const job = ({
	company,
	start,
	end,
}: {
	company: string;
	start: string;
	end: string | null;
}): Experience =>
	({ role: "Engineer", company, start, end }) as unknown as Experience;

const robin: Experience = job({ company: "Robin", start: "Jan 2026", end: null });
const intellisoft: Experience = job({
	company: "IntelliSOFT",
	start: "Feb 2026",
	end: "Jun 2026",
});

describe("layoutGantt", () => {
	it("returns an empty layout for no experiences", () => {
		const layout = layoutGantt({ experiences: [], nowMonth });
		expect(layout.bars).toEqual([]);
		expect(layout.laneCount).toBe(0);
	});

	it("puts an overlapping contract in a second lane", () => {
		const layout = layoutGantt({ experiences: [robin, intellisoft], nowMonth });
		expect(layout.bars.map((bar) => bar.lane)).toEqual([0, 1]);
		expect(layout.laneCount).toBe(2);
	});

	it("sizes each bar by its dates, with the open end stopping at now", () => {
		const layout = layoutGantt({ experiences: [robin, intellisoft], nowMonth });
		expect(layout.bars[0]!.leftPercent).toBeCloseTo(0);
		expect(layout.bars[0]!.widthPercent).toBeCloseTo(100);
		expect(layout.bars[1]!.leftPercent).toBeCloseTo((1 / 11) * 100);
		expect(layout.bars[1]!.widthPercent).toBeCloseTo((5 / 11) * 100);
	});

	it("marks only the role with no end date as an open end", () => {
		const layout = layoutGantt({ experiences: [robin, intellisoft], nowMonth });
		expect(layout.bars.map((bar) => bar.isOpenEnd)).toEqual([true, false]);
	});

	it("names the companies that overlap each role", () => {
		const layout = layoutGantt({ experiences: [robin, intellisoft], nowMonth });
		expect(layout.bars[0]!.overlapsWith).toEqual(["IntelliSOFT"]);
		expect(layout.bars[1]!.overlapsWith).toEqual(["Robin"]);
	});

	it("gives a role that overlaps nothing an empty overlap list", () => {
		const earlier: Experience = job({
			company: "Earlier",
			start: "Jul 2023",
			end: "Oct 2023",
		});
		const layout = layoutGantt({ experiences: [robin, earlier], nowMonth });
		expect(layout.bars[1]!.overlapsWith).toEqual([]);
		expect(layout.overlapZones).toEqual([]);
	});

	it("draws one overlap zone over the months that two roles share", () => {
		const layout = layoutGantt({ experiences: [robin, intellisoft], nowMonth });
		expect(layout.overlapZones).toHaveLength(1);
		expect(layout.overlapZones[0]!.leftPercent).toBeCloseTo((1 / 11) * 100);
		expect(layout.overlapZones[0]!.widthPercent).toBeCloseTo((5 / 11) * 100);
	});

	it("marks each year, with the first year clamped to the left edge", () => {
		const december: Experience = job({
			company: "Winter",
			start: "Dec 2025",
			end: "Feb 2026",
		});
		const layout = layoutGantt({ experiences: [december], nowMonth });
		expect(layout.yearTicks.map((tick) => tick.year)).toEqual([2025, 2026]);
		expect(layout.yearTicks[0]!.leftPercent).toBe(0);
		expect(layout.yearTicks[1]!.leftPercent).toBeCloseTo((1 / 3) * 100);
	});

	it("throws for a start text that is not a month and year", () => {
		const broken: Experience = job({ company: "Bad", start: "Soon", end: null });
		expect(() => layoutGantt({ experiences: [broken], nowMonth })).toThrow(
			InvalidMonthYearError,
		);
	});
});

describe("experienceKey", () => {
	it("joins company, role, and start", () => {
		expect(experienceKey({ experience: robin })).toBe("Robin-Engineer-Jan 2026");
	});
});
