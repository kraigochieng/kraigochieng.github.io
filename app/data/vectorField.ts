/** One point in the hero's vector field, on a 0 to 100 grid. */
export interface FieldPoint {
	x: number;
	y: number;
}

/** One line between two points, in grid coordinates. */
export interface FieldLine {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

/** A connection, as the indexes of two points in `fieldPoints`. */
export type FieldEdge = readonly [number, number];

/** The points sit on the right, away from the hero text. */
export const fieldPoints: FieldPoint[] = [
	{ x: 62, y: 22 },
	{ x: 71, y: 30 },
	{ x: 80, y: 18 },
	{ x: 88, y: 27 },
	{ x: 67, y: 44 },
	{ x: 78, y: 40 },
	{ x: 90, y: 45 },
	{ x: 73, y: 58 },
	{ x: 84, y: 60 },
	{ x: 94, y: 70 },
	{ x: 66, y: 72 },
	{ x: 80, y: 78 },
];

/** Nearest-neighbor links between the points above. */
export const fieldEdges: FieldEdge[] = [
	[0, 1],
	[1, 2],
	[2, 3],
	[1, 5],
	[3, 5],
	[0, 4],
	[4, 5],
	[5, 6],
	[3, 6],
	[4, 7],
	[5, 7],
	[7, 8],
	[6, 8],
	[8, 9],
	[7, 10],
	[10, 11],
	[8, 11],
];

/** The point drawn larger, like the query in a nearest-neighbor search. */
export const highlightedPointIndex: number = 5;

/** Turns edges into lines. Skips an edge that names a missing point. */
export const buildFieldLines = (
	points: FieldPoint[],
	edges: FieldEdge[],
): FieldLine[] =>
	edges.flatMap(([fromIndex, toIndex]): FieldLine[] => {
		const from: FieldPoint | undefined = points[fromIndex];
		const to: FieldPoint | undefined = points[toIndex];
		if (!from || !to) return [];
		return [{ x1: from.x, y1: from.y, x2: to.x, y2: to.y }];
	});
