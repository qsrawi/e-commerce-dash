import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'checksfilter'
    // pure: false
})


export class MychecksfilterPipe implements PipeTransform {
    transform(Itemslist:JSON[],fiter:string):JSON[]{
        //console.log(fiter);
        // //console.log(searchtitle);
        if(!Itemslist || !fiter){
            //console.log("nothing")
            return Itemslist;
        }
        else{
            //console.log("rationfilter")
            return Itemslist.filter(element=>element['checkid'].includes(fiter));

        }
    }
}