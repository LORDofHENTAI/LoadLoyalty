export class CreateActionModel {
    constructor(
        public token: string,
        public name: string,
        public efts: string,
        public dateFrom: string,
        public dateTo: string,
        public timeFrom?: string,
        public timeTo?: string,
        public mon: number = 1,
        public tue: number = 1,
        public wed: number = 1,
        public thu: number = 1,
        public fri: number = 1,
        public sat: number = 1,
        public sun: number = 1,
        public id?: number[]
    ) { }
}