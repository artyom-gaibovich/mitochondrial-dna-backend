export class MergedHeadersAndOptionsArray {
	constructor(
		private options: { title: string; index: number }[],
		private headers: { title: string; index: number }[],
	) {}

	merge(): { title: string; header: string; index: number }[] {
		return this.options.map((el, index) => {
			return {
				title: el.title,
				index: el.index,
				header: this.headers[index].title,
			};
		});
	}
}
