export class FilledSnpRflpSeqArrayByTitle {
	constructor(
		private options: { title: string; index: number }[],
		private headers: { title: string; index: number }[],
	) {}

	fill(): { title: string; index: number }[] {
		return this.headers.map((el, index) => {
			if (this.options[index].title === '0') {
				el.title = `seq_${el.title.toLowerCase()}`;
			}
			if (this.options[index].title === '1') {
				el.title = `snp_${el.title.toLowerCase()}`;
			}
			if (this.options[index].title === '3') {
				el.title = `rflp_${el.title.toLowerCase()}`;
			}
			return el;
		});
	}
}
