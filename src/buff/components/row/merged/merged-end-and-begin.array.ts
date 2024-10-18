export class MergedEndAndBeginArray {
	constructor(
		private begin: { title: string; index: number; begin: string; header: string }[],
		private end: { title: string; index: number }[],
	) {}

	merge(): { title: string; end: string; index: number; header: string; begin: string }[] {
		return this.begin.map((el, index) => {
			return {
				title: el.title,
				index: el.index,
				begin: el.begin,
				header: el.header,
				end: this.end[index].title,
			};
		});
	}
}
