/** Base error type for every failure that this site expects. */
export class PortfolioError extends Error {
	constructor({ message }: { message: string }) {
		super(message);
		this.name = new.target.name;
	}
}

/** Raised when a month and year text does not match the "Mon YYYY" format. */
export class InvalidMonthYearError extends PortfolioError {
	readonly text: string;

	constructor({ text }: { text: string }) {
		super({ message: `Invalid month and year text: "${text}"` });
		this.text = text;
	}
}

/** Raised when a time span ends before it starts. */
export class InvalidSpanError extends PortfolioError {
	readonly startMonth: number;
	readonly endMonth: number;

	constructor({
		startMonth,
		endMonth,
	}: {
		startMonth: number;
		endMonth: number;
	}) {
		super({
			message: `Span ends before it starts: ${startMonth} to ${endMonth}`,
		});
		this.startMonth = startMonth;
		this.endMonth = endMonth;
	}
}
