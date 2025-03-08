export default class Categorie {
    constructor(public ID: Number,
        public ArName?: string,
        public EnName?: string,
        public AR_LKP_Type?: string,
        public LKP_ID?: number,
        public LKP_Type?: string,
        public RelatedID?: number,
        public subcategorylist?:Categorie[],
        public ImageToUpload?: string,
        public ImageToShow: string=null,
        public DiscountPercentage:Number=0
        ) { }
}