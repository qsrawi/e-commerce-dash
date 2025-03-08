import ItemImages from "./ItemImages";


export default class Items {
    constructor(public ItemID: Number,
        public ItemIDForUser: string,
        public ItemArName: string,
        public ItemEnName: string,
        public CategoryID1: Number,
        public CategoryID2: Number,
        public CategoryID: Number,
        public RecordDateEntry: Date,
        public PriceLevel_Price?: number,
        public ImagePath?: string,
        public IsRecommendedForYou?: boolean,
        public ItemNote?: string,
        public IsOutOfStock?: boolean,
        public Note?: string,
        public ColorID?: number,
        public colorArName?: string,
        public colorEnName?: number,
        public SizeID?: number,
        public sizeArName?: string,
        public sizeEnName?: string,
        public StoreID?:number,
        public StoreArName?:string,
        public StoreEnName?:string,
        public IsSellingFaset?:boolean,
        public itemimages: ItemImages[]=[],
        public haveImage?:boolean,
        public IsVisibleForEcommerce?:boolean,
        public Barcode?:string 
    ) { }
}