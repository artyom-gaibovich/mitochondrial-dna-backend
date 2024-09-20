export class FilledSbEbZeros {
	constructor(
		private count: number,
		private dataToInsert: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number | null;
			eb: number | null;
		}[],
		private zerosTitles: number[],
	) {}

	fill(): {
		count: number;
		dataToInsert: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number;
			eb: number;
		}[];
	} {
		return {
			count: this.count,
			dataToInsert: this.dataToInsert.map((el) => {
				if (this.zerosTitles.includes(el.title)) {
					return {
						...el,
						sb: 0,
						eb: 0,
					};
				}
				return el;
			}),
		};
	}
}
