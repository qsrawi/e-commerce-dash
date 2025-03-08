export interface Newsletterecommerce {
    ID?:Number;
    type:string;
    title: string;
    decription: string;
    imagePath: string;
    active:boolean;
}



export const newsletterecommerceinit:Newsletterecommerce={
    ID:null,
    type:'',
    title: '',
    decription: '',
    imagePath:'',
    active: false
}