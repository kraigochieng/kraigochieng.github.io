import { describe, expect, it } from "vitest";
import { InvalidMonthYearError } from "../app/utils/errors";
import { parseMonthYear } from "../app/utils/parseMonthYear";

const nowMonth: number = 2026 * 12 + 10;

describe("parseMonthYear", () => {
	it("turns a month and year text into a month number", () => {
		expect(parseMonthYear({ text: "Jan 2026", nowMonth })).toBe(2026 * 12);
		expect(parseMonthYear({ text: "Dec 2024", nowMonth })).toBe(2024 * 12 + 11);
	});

	it("orders later months after earlier months across years", () => {
		const december: number = parseMonthYear({ text: "Dec 2025", nowMonth });
		const january: number = parseMonthYear({ text: "Jan 2026", nowMonth });
		expect(january - december).toBe(1);
	});

	it("returns the current month for an open end", () => {
		expect(parseMonthYear({ text: null, nowMonth })).toBe(nowMonth);
	});

	it("throws for an unknown month name", () => {
		expect(() => parseMonthYear({ text: "Foo 2026", nowMonth })).toThrow(
			InvalidMonthYearError,
		);
	});

	it("throws for a missing year", () => {
		expect(() => parseMonthYear({ text: "Jan", nowMonth })).toThrow(
			InvalidMonthYearError,
		);
	});

	it("keeps the bad text in the error", () => {
		try {
			parseMonthYear({ text: "Foo 2026", nowMonth });
			expect.unreachable();
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidMonthYearError);
			expect((error as InvalidMonthYearError).text).toBe("Foo 2026");
		}
	});
});
