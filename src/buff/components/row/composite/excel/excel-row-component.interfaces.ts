export interface BaseRowComponentInterface {
	process(): { index: number; title: string }[];
}

export interface HeadersRowComponentInterface {
	process(): { title: string; header: string; index: number }[];
}

export interface BeginRowComponentInterface {
	process(): { title: string; begin: string; index: number; header: string }[];
}

export interface EndRowComponentInterface {
	process(): {
		title: string | number;
		index: number;
		header: string;
		begin: string | number;
		end: string | number;
	}[];

	createColumns(): Promise<void>;
}

export interface ValueRowComponentInterface {
	process(): {
		count: number;
		dataToInsert: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number;
			eb: number;
		}[];
	};

	toSQLBuff(): string;

	executeSQLBuff(): Promise<number>;

	toSQLBuffVar(): Promise<string>;

	executeSQLBuffVar(): Promise<void>;
}
