export class CutHeadersByOptionsRow {
	constructor(
		private options: { title: string | number; index: number }[],
		private headers: { title: string; index: number }[],
		private emptyValue: '' | null,
	) {}

	cut(): { title: string; index: number }[] {
		const cutHeadersArray: { title: string; index: number }[] = [];
		for (let i = 0; i < this.options.length; i++) {
			cutHeadersArray.push({
				title: this.headers[i] ? this.headers[i].title : this.emptyValue,
				index: this.headers[i] ? this.headers[i].index : i,
			});
		}
		return cutHeadersArray;
	}
}
