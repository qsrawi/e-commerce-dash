import OrderItem from "./OrderItem";
import { Address } from "./address";

export default class Order {
    constructor(
        public VoucherID:number,
        public CompanyID: Number,
        public IntervalID:number,
        public Voucher_Type:string,
        public AccID :number,
        public VatTypeID:number,
        public CurrencyID:number,
        public TheRate:number,
        public StatusID:number,
        public VoucherDate:Date,
        public DueDate:string,
        public EcommerceAddId:number,
        public orderItems:OrderItem[],
        public billingAddress:Address,
        public EcommerceCutomerId?:number,
        public FullName?:string,
        public CurruncySymbol?:string

    ) { }
}