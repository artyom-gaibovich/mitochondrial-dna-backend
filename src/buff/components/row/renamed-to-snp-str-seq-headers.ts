export class RenamedToSnpStrSeqHeaders {
	constructor(private headers: { title: string; header: string; index: number }[]) {}

	rename(): { title: string; header: string; index: number }[] {
		return this.headers.map((el) => {
			if (el.title === '3') {
				el.header = `rflp_${el.header.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase()}`;
			}
			if (el.title === '1') {
				el.header = `snp_${el.header.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase()}`;
			}
			if (el.title === '0') {
				el.header = `seq_${el.header.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase()}`;
			}
			return el;
		});
	}
}
