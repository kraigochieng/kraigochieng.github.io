import { assignLanes, type Span } from "./assignLanes";
import { parseMonthYear } from "./parseMonthYear";
import type { Experience } from "../types";

/** One role drawn as a bar, with its place on the time axis in percent. */
export interface GanttBar {
	key: string;
	role: string;
	company: string;
	startText: string;
	endText: string | null;
	lane: number;
	leftPercent: number;
	widthPercent: number;
	isOpenEnd: boolean;
	overlapsWith: string[];
}

/** One year mark on the time axis. */
export interface GanttYearTick {
	year: number;
	leftPercent: number;
}

/** One stretch of time in which two or more roles run at the same time. */
export interface GanttOverlapZone {
	leftPercent: number;
	widthPercent: number;
}

/** Everything the Gantt strip needs to draw, with no date math left. */
export interface GanttLayout {
	bars: GanttBar[];
	laneCount: number;
	yearTicks: GanttYearTick[];
	overlapZones: GanttOverlapZone[];
}

/** Builds the stable key of one experience, for lists and for page anchors. */
export const experienceKey = ({
	experience,
}: {
	experience: Experience;
}): string => `${experience.company}-${experience.role}-${experience.start}`;

const emptyLayout: GanttLayout = {
	bars: [],
	laneCount: 0,
	yearTicks: [],
	overlapZones: [],
};

const spansOverlap = ({ first, second }: { first: Span; second: Span }): boolean =>
	first.startMonth <= second.endMonth && second.startMonth <= first.endMonth;

/** Finds each run of months in which two or more spans are active. */
const findOverlapRuns = ({
	spans,
	minMonth,
	maxMonth,
}: {
	spans: readonly Span[];
	minMonth: number;
	maxMonth: number;
}): Span[] => {
	const runs: Span[] = [];
	let runStartMonth: number | null = null;
	for (let month: number = minMonth; month <= maxMonth + 1; month += 1) {
		const activeCount: number = spans.filter(
			(span: Span) => span.startMonth <= month && month <= span.endMonth,
		).length;
		const isOverlap: boolean = month <= maxMonth && activeCount >= 2;
		if (isOverlap && runStartMonth === null) {
			runStartMonth = month;
			continue;
		}
		if (!isOverlap && runStartMonth !== null) {
			runs.push({ startMonth: runStartMonth, endMonth: month - 1 });
			runStartMonth = null;
		}
	}
	return runs;
};

/**
 * Turns the experiences into bars, lanes, year marks, and overlap zones.
 * The open end of a role stops at `nowMonth`.
 */
export const layoutGantt = ({
	experiences,
	nowMonth,
}: {
	experiences: readonly Experience[];
	nowMonth: number;
}): GanttLayout => {
	if (experiences.length === 0) return emptyLayout;

	const spans: Span[] = experiences.map(
		(experience: Experience): Span => ({
			startMonth: parseMonthYear({ text: experience.start, nowMonth }),
			endMonth: parseMonthYear({ text: experience.end, nowMonth }),
		}),
	);
	const lanes: number[] = assignLanes({ spans });
	const minMonth: number = Math.min(...spans.map((span: Span) => span.startMonth));
	const maxMonth: number = Math.max(...spans.map((span: Span) => span.endMonth));
	const totalMonths: number = maxMonth - minMonth + 1;
	const toPercent = (months: number): number => (months / totalMonths) * 100;

	const bars: GanttBar[] = experiences.map(
		(experience: Experience, index: number): GanttBar => {
			const span: Span = spans[index]!;
			return {
				key: experienceKey({ experience }),
				role: experience.role,
				company: experience.company,
				startText: experience.start,
				endText: experience.end,
				lane: lanes[index]!,
				leftPercent: toPercent(span.startMonth - minMonth),
				widthPercent: toPercent(span.endMonth - span.startMonth + 1),
				isOpenEnd: experience.end === null,
				overlapsWith: experiences
					.filter(
						(other: Experience, otherIndex: number) =>
							otherIndex !== index &&
							spansOverlap({ first: span, second: spans[otherIndex]! }),
					)
					.map((other: Experience) => other.company),
			};
		},
	);

	const firstYear: number = Math.floor(minMonth / 12);
	const lastYear: number = Math.floor(maxMonth / 12);
	const yearTicks: GanttYearTick[] = Array.from(
		{ length: lastYear - firstYear + 1 },
		(_unused: unknown, offset: number): GanttYearTick => {
			const year: number = firstYear + offset;
			const leftPercent: number = Math.max(0, toPercent(year * 12 - minMonth));
			return { year, leftPercent };
		},
	);

	const overlapZones: GanttOverlapZone[] = findOverlapRuns({
		spans,
		minMonth,
		maxMonth,
	}).map(
		(run: Span): GanttOverlapZone => ({
			leftPercent: toPercent(run.startMonth - minMonth),
			widthPercent: toPercent(run.endMonth - run.startMonth + 1),
		}),
	);

	return {
		bars,
		laneCount: Math.max(...lanes) + 1,
		yearTicks,
		overlapZones,
	};
};
