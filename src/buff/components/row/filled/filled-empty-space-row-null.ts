export class FilledEmptySpaceRowNull {
	constructor(private rowToFill: { index: number; title: string }[]) {}

	fill(): { index: number; title: string }[] {
		const filledArray: { index: number; title: string }[] = [];
		for (let i = 0; i < this.rowToFill.length; i++) {
			filledArray.push({
				title: this.rowToFill[i] ? this.rowToFill[i].title : null,
				index: this.rowToFill[i] ? this.rowToFill[i].index : i,
			});
		}
		return filledArray;
	}
}
