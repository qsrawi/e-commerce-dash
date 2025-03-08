import { Pipe, PipeTransform } from '@angular/core';
import City from '../Model/City';

@Pipe({
    name: 'CityfilterPipe'
    // pure: false
})


export class CityfilterPipe implements PipeTransform {
    transform(CityList:City[],fiter:string):City[]{
        //console.log(fiter);
        // //console.log(searchtitle);
        if(!CityList || !fiter){
            //console.log("nothing")
            return CityList;
        }
        else{
            //console.log("rationfilter")
            return CityList.filter(element=>element.country_code.toString().toLocaleLowerCase().includes(fiter.toLocaleLowerCase()) 
            || element.country_arName.toString().toLocaleLowerCase().includes(fiter.toLocaleLowerCase())
            || element.country_enName.toString().toLocaleLowerCase().includes(fiter.toLocaleLowerCase())
            );

        }
    }
}