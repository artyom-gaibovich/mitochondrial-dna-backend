export class PreparedQueryToInsertBuffVar {
	constructor(
		private buffid: number,
		private insertData: {
			column: string;
			value: string | number;
			title: number;
			sb: number | null;
			eb: number | null;
		}[],
		private titleValues: number[],
	) {}

	prepare(): string {
		let buffVarValues = ``;
		const filteredColumns = this.insertData.filter((el) => this.titleValues.includes(el.title));
		for (let i = 0; i < filteredColumns.length; i++) {
			const sb = filteredColumns[i].sb;
			const eb = filteredColumns[i].eb;
			const vartype = filteredColumns[i].title;
			const vardata = filteredColumns[i].value ? `'${filteredColumns[i].value}'` : `null`;

			buffVarValues += `(${this.buffid}, ${sb}, ${eb}, ${vartype}, ${vardata}), `;
		}
		return (
			`insert into buff_var (buffid, spos, epos, vartype, vardata) values ${buffVarValues}`.slice(
				0,
				-2,
			) + `returning * ;`
		);
	}
}
