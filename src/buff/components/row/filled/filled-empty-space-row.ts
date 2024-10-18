export class FilledEmptySpaceRow {
	constructor(
		private rowToFill: { index: number; title: string }[],
		private emptyValue: '' | null,
	) {}

	fill(): { index: number; title: string }[] {
		const filledArray: { index: number; title: string }[] = [];
		for (let i = 0; i < this.rowToFill.length; i++) {
			filledArray.push({
				title: this.rowToFill[i] ? this.rowToFill[i].title : this.emptyValue,
				index: this.rowToFill[i] ? this.rowToFill[i].index : i,
			});
		}
		return filledArray;
	}
}
