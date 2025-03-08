export default class City {
    constructor(
        public country_code:String,
        public country_enName: String,
        public country_arName:string,
        public FrightAmount :number,
        public status:boolean =false,
    ) { }
}