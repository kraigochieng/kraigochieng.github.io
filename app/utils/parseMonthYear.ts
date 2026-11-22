import { InvalidMonthYearError } from "./errors";

const monthNames: readonly string[] = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/**
 * Turns a "Mon YYYY" text into a month number (year times 12 plus month index).
 * A null text means an open end, so the function returns `nowMonth`.
 */
export const parseMonthYear = ({
	text,
	nowMonth,
}: {
	text: string | null;
	nowMonth: number;
}): number => {
	if (text === null) return nowMonth;
	const parts: string[] = text.trim().split(/\s+/);
	const monthIndex: number = monthNames.indexOf(parts[0] ?? "");
	const year: number = Number(parts[1]);
	const isValid: boolean =
		parts.length === 2 &&
		monthIndex !== -1 &&
		Number.isInteger(year) &&
		/^\d{4}$/.test(parts[1] ?? "");
	if (!isValid) throw new InvalidMonthYearError({ text });
	return year * 12 + monthIndex;
};
