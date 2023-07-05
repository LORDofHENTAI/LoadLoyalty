export class ActionGroupModel {
    constructor(
        public id: number,
        public token: string,
        public groupId: string,
        public group: string,
        public percent: string,
        public nameGroup: string
    ) { }
}