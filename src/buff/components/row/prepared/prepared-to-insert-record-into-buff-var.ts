export class PreparedToInsertRecordIntoBuffVar {
	constructor(
		private readData: {
			title: string | number;
			index: number;
			begin: string | number;
			header: string;
			end: string | number;
			value: string | number;
		}[],
		private titleValues: number[],
		private titleHeaders: string[],
		private nValue: string,
	) {}

	prepare(): {
		count: number;
		dataToInsert: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number;
			eb: number;
		}[];
	} {
		const dataToInsert: {
			sb: number;
			eb: number;
			column: string;
			value: string | number;
			title: number | null;
		}[] = [];

		for (let i = 0; i < this.readData.length; i++) {
			let escapedValue;
			if (this.readData[i].value && typeof this.readData[i].value === 'string') {
				escapedValue = (this.readData[i].value as string).replace(/'/g, "''");
			}

			if (this.titleValues.includes(this.readData[i].title as number)) {
				dataToInsert.push({
					sb: this.readData[i].begin as number,
					eb: this.readData[i].end as number,
					column: this.readData[i].header,
					value: escapedValue ? escapedValue : this.readData[i].value,
					title: this.readData[i].title as number,
				});
			}
			if (this.titleHeaders.includes(this.readData[i].title as string)) {
				dataToInsert.push({
					sb: this.readData[i].begin as number,
					eb: this.readData[i].end as number,
					column: this.readData[i].title as string,
					value: escapedValue ? escapedValue : this.readData[i].value,
					title: null,
				});
			}
		}
		return {
			count: this.readData.find((el) => el.title === this.nValue).value as number,
			dataToInsert: dataToInsert,
		};
	}
}
