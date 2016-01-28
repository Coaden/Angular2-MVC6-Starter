export class Hero {
    constructor(
        public id: number,
        public name: string,
        public power: string,
        public extraPower?: string,
        public alterEgo?: string) {
    }
}
