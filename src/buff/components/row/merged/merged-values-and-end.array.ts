export class MergedValuesAndEndArray {
	constructor(
		private end: {
			title: string | number;
			index: number;
			begin: string | number;
			header: string;
			end: string | number;
		}[],
		private values: { title: string; index: number }[],
	) {}

	merge(): {
		title: string | number;
		index: number;
		begin: string | number;
		header: string;
		end: string | number;
		value: string;
	}[] {
		return this.end.map((el, index) => {
			return {
				title: el.title,
				index: el.index,
				begin: el.begin,
				header: el.header,
				end: el.end,
				value: this.values[index].title,
			};
		});
	}
}
