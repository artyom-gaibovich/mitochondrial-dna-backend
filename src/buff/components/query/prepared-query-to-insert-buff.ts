export class PreparedQueryToInsertBuff {
	constructor(
		private count: number,
		private insertData: { column: string; value: string | number; title: null | number }[],
		private titleValues: number[],
	) {}

	prepare(): string {
		const dataToInsert = {};
		for (let i = 0; i < Object.values(this.insertData).length; i++) {
			if (this.titleValues.includes(this.insertData[i].title)) {
				dataToInsert[`${this.insertData[i].column}`] = this.insertData[i].value
					? `'${this.insertData[i].value}'`
					: `null`;
			} else {
				dataToInsert[`${this.insertData[i].column}`] = this.insertData[i].value
					? `'${this.insertData[i].value}'`
					: `null`;
			}
		}
		const columns: string = `(${Object.keys(dataToInsert).join(', ')})`;
		const values: string = `(${Object.values(dataToInsert).join(', ')}), `;
		return (
			`insert into buff ${columns} values ${values.repeat(this.count)}`.slice(0, -2) +
			`returning buffid;`
		);
	}
}
