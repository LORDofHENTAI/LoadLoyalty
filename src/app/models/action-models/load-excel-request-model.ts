export class LoadExcelRequestModel {
    constructor(
        public token: string,
        public file: File
    ) { }
}