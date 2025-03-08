import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Coupons from 'app/Shared/Model/Coupons';
import CouponsDet from 'app/Shared/Model/CouponsDet';
import Campaigns_Detail from 'app/Shared/Model/Campaigns_Details';
import Items from 'app/Shared/Model/item';
import DataFromExcel from 'app/Shared/Model/DataFromExcel';


@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {
  server: string = "http://192.119.110.192:5001/api/"

  token: string = localStorage.getItem('accessToken');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  constructor(private http: HttpClient) {
    // this.itemlist=JSON.parse(this.ItemJson);

  }
  getcategories() {
    return this.http.get(this.server + `items/maincategories/0`, { headers: this.headers });

  }
  getcategoriesitem(storeid: number) {
    return this.http.get(this.server + `items/maincategories/${storeid}`, { headers: this.headers });

  }
  getsubcategories(LukID: number) {
    return this.http.get(this.server + "items/getsubcategory/" + LukID, { headers: this.headers });

  }

  getitems(catid: number, subcatID: number, page: number) {
    return this.http.get(this.server + "items/getall/" + catid + "/" + subcatID + "/" + page, { headers: this.headers });

  }
  changeCategoryDiscountPercentage(LKP_ID: Number, DiscountPercentage: Number) {
    return this.http.get(this.server + "items/changeCategoryDiscountPercentage/" + LKP_ID + "/" + DiscountPercentage, { headers: this.headers });

  }
  getitemBYid(itemid: number) {
    return this.http.get(this.server + "items/itembyid/" + itemid, { headers: this.headers });

  }  
  itembyiddetails(itemid: number) {
    return this.http.get(this.server + "items/itembyiddetails/" + itemid, { headers: this.headers });

  }
  getpoloparcodes() {
    return this.http.get(this.server + "stores/getpoloparcodes", { headers: this.headers });

  }

  getxmlpoloimages(reqxml) {
    // 'Authorization': 'Bearer ' + this.token,
    let parser = new DOMParser();

    let doc = parser.parseFromString(reqxml, "application/xml");
    console.log(doc);
    
    let headers11 = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': `Basic `+ btoa('lacasafash@aydinli-OCLG4N:,D+$%r8g4,NpsvGJ'),
      'username': 'lacasafash@aydinli-OCLG4N',
      'password': ',D+$%r8g4,NpsvGJ',
      'x-api-key': '5b53fe8d-c880-4df2-9619-940ec1896500',
      'Accept':'*/*'
    });
    console.log(headers11);
    
    return this.http.post("https://AYDBOOMIAPI.aydinligroup.com/ws/rest/ayd/getImages/", doc, { headers: headers11,responseType: 'text' as 'text' });

  }
  
  addimages(formData) {
    let server: string = "http://192.119.110.192:5001/itemspic"
    return this.http.post(server, formData);
  }
  deletefile(filename, imageid) {
    return this.http.get(this.server + "items/removeimage/" + filename + "/" + imageid, { headers: this.headers });
  }

  savedecription(image) {
    return this.http.post(this.server + "items/savedecription",image, { headers: this.headers });
  }  
  updateItem(item) {
    return this.http.post(this.server + "items/updateItem",item, { headers: this.headers });
  }
  itemImagesFromExcel(DataFromExcelList: DataFromExcel[]) {
    return this.http.post(this.server + "items/itemImagesFromExcel",DataFromExcelList, { headers: this.headers });
  }

  makeimageselected(imageid: number, itemid: number) {
    return this.http.get(this.server + "items/makeimagedefault/" + imageid + "/" + itemid, { headers: this.headers });
  }

  getrecomendedforyouItem(catid: number, subcat: number) {
    return this.http.get<Items[]>(this.server + `items/recomended/${catid}/${subcat}`, { headers: this.headers });

  }
  getsellingfastItem(catid: number, subcat: number) {
    return this.http.get<Items[]>(this.server + `items/sellingfast/${catid}/${subcat}`, { headers: this.headers });

  }
  updaterecomended(ItemID, recomended) {
    return this.http.get(this.server + `items/updaterecomended/${ItemID}/${recomended}`, { headers: this.headers });
  }
  updatevisabilty(ItemID, recomended) {
    return this.http.get(this.server + `items/changeisvisableforeccomerve/${ItemID}/${recomended}`, { headers: this.headers });
  }
  updateSellingFast(ItemID, sell) {
    return this.http.get(this.server + `items/updateSellingFast/${ItemID}/${sell}`, { headers: this.headers });
  }


  getallCampaigns() {
    return this.http.get(this.server + `Campaigns/getallCampaigns`, { headers: this.headers });
  } 

  getallCoupons() {
    return this.http.get(this.server + `Campaigns/getallCopunes`, { headers: this.headers });
  } 
  savecCampaingChanges(obj) {
    // return this.http.post(this.server + `Campaigns/setCampaigns_ecommerce`,camp, { headers: this.headers });
    return this.http.post<JSON>(this.server + `Campaigns/addnewCamp`, obj);

  }

  savecCoupons(obj:Coupons) {
    // return this.http.post(this.server + `Campaigns/setCampaigns_ecommerce`,camp, { headers: this.headers });
    return this.http.post<JSON>(this.server + `Campaigns/addnewCoupon`, obj);

  }
  UpdateCouponScrolling(obj:Coupons) {
    // return this.http.post(this.server + `Campaigns/setCampaigns_ecommerce`,camp, { headers: this.headers });
    return this.http.post<JSON>(this.server + `Campaigns/UpdateCouponScrolling`, obj);

  }
  insertCoupondet(obj:CouponsDet[]) {
    // return this.http.post(this.server + `Campaigns/setCampaigns_ecommerce`,camp, { headers: this.headers });
    return this.http.post<JSON>(this.server + `Campaigns/insertCoupondet`, obj);

  }
  setCampaignsDetails_ecommerce(camp:Campaigns_Detail) {
    return this.http.post(this.server + `Campaigns/setCampaignsDetails_ecommerce`,camp, { headers: this.headers });
  }
}
