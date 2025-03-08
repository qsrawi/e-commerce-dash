import { Pipe, PipeTransform } from '@angular/core';
import Items from '../Model/item';
@Pipe({
    name: 'ItemfilterPipe'
    // pure: false
})


export class ItemfilterPipe implements PipeTransform {
    transform(Itemslist:Items[],fiter:string):Items[]{
        //console.log(fiter);
        // //console.log(searchtitle);
        if(!Itemslist || !fiter){
            //console.log("nothing")
            return Itemslist;
        }
        else{
            //console.log("rationfilter")
            return Itemslist.filter(element=>element.ItemID.toString().includes(fiter) 
            || element.ItemID.toString().includes(fiter)
            || element.ItemIDForUser.toString().includes(fiter)
            || element.ItemArName.toString().includes(fiter)
            || element.ItemEnName.toString().includes(fiter)
            );

        }
    }
}