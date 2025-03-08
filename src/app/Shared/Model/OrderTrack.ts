export interface OrderTrack {
    ID:Number;
    LKP_ID: number;
    LKP_Type: string;
    AR_LKP_Type: string;
    ArName:string;
    EnName:string;
    IsActive:boolean;
}



export const OrderTrackinit:OrderTrack={
    ID:null,
    LKP_ID:null,
    LKP_Type: '',
    AR_LKP_Type: '',
    ArName:'',
    EnName: '',
    IsActive:false
}