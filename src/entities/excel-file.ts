import fs from 'node:fs';

export class ExcelFile {
	constructor(private filePath: string) {}

	public get(): string {
		return this.filePath;
	}

	public deleteFile(): void {
		fs.unlink(this.filePath, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('ExcelFile is deleted.');
			}
		});
	}
}
