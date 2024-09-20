export class FilledRowWithAdditionalColumns {
	constructor(
		private count: number,
		private insertData: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number | null;
			eb: number | null;
		}[],
		private additionalParams: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number | null;
			eb: number | null;
		}[],
	) {}

	add(): {
		count: number;
		data: {
			title: number | null;
			column: string;
			value: string | number;
			sb: number | null;
			eb: number | null;
		}[];
	} {
		return {
			data: [...this.insertData, ...this.additionalParams],
			count: this.count,
		};
	}
}
