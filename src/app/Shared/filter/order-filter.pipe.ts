import { Pipe, PipeTransform } from '@angular/core';
import Order from '../Model/Order';
@Pipe({
    name: 'MyOrderfilter'
    // pure: false
})


export class MyOrderfilter implements PipeTransform {
    transform(orderlist:Order[],fiter:number):Order[]{
        //console.log(fiter);
        // //console.log(searchtitle);
        if(!orderlist || !fiter){
            //console.log("nothing")
            return orderlist;
        }
        else{
            //console.log("rationfilter")
            return orderlist.filter(element=>element.StatusID==fiter);

        }
    }
}