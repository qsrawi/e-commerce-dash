export interface NewsLetter {
    ID?:Number;
    Subject: string;
    SenderName: string;
    SenderEmail: string;
    Content:string;
    imagepath:string;
    typeId:string;
}



export const newsLetterinit:NewsLetter={
    ID:null,
    Subject: '',
    SenderName: '',
    SenderEmail:'',
    Content: '',
    imagepath:'',
    typeId:null
}