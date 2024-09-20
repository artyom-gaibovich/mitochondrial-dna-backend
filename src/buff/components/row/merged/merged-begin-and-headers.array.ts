export class MergedBeginAndHeadersArray {
	constructor(
		private headers: { title: string; index: number; header: string }[],
		private begin: { title: string; index: number }[],
	) {}

	merge(): { title: string; begin: string; index: number; header: string }[] {
		return this.headers.map((el, index) => {
			return {
				title: el.title,
				index: el.index,
				begin: this.begin[index].title,
				header: el.header,
			};
		});
	}
}
