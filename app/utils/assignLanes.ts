import { InvalidSpanError } from "./errors";

/** A time span in month numbers. Both ends count as inside the span. */
export interface Span {
	startMonth: number;
	endMonth: number;
}

/**
 * Gives each span a lane index so that no two overlapping spans share a lane.
 * Spans that share only one month overlap. The result keeps the input order.
 */
export const assignLanes = ({ spans }: { spans: readonly Span[] }): number[] => {
	for (const span of spans) {
		if (span.startMonth > span.endMonth) {
			throw new InvalidSpanError({
				startMonth: span.startMonth,
				endMonth: span.endMonth,
			});
		}
	}

	const spanIndexesByStart: number[] = spans
		.map((_span: Span, spanIndex: number) => spanIndex)
		.sort(
			(first: number, second: number) =>
				spans[first]!.startMonth - spans[second]!.startMonth || first - second,
		);

	const lanes: number[] = new Array<number>(spans.length).fill(0);
	const laneEndMonths: number[] = [];

	for (const spanIndex of spanIndexesByStart) {
		const span: Span = spans[spanIndex]!;
		const freeLane: number = laneEndMonths.findIndex(
			(laneEndMonth: number) => laneEndMonth < span.startMonth,
		);
		const chosenLane: number =
			freeLane === -1 ? laneEndMonths.length : freeLane;
		laneEndMonths[chosenLane] = span.endMonth;
		lanes[spanIndex] = chosenLane;
	}

	return lanes;
};
