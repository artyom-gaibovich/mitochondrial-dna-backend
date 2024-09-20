export class MappedHeadersToOptions {
	constructor(
		private options: { title: string; index: number }[],
		private headers: { title: string; index: number }[],
		private ignoreWords: string[],
	) {}

	map(): { title: string; index: number }[] {
		return this.headers.map((el, index) => {
			if (!this.ignoreWords.includes(this.options[index].title)) {
				el.title = this.options[index].title;
				return el;
			}

			return el;
		});
	}
}
