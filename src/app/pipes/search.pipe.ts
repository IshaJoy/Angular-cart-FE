import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any[],searchKey:string):any[]  {
    const result:any=[]
    if (!allProducts || searchKey=="") {
      return allProducts
    }
    allProducts.forEach((item:any)=>{
      if (item["title"].trim().toLowerCase().includes(searchKey.toLowerCase().trim())) {
        result.push(item)
      }
    })
    return result;
  }

}
