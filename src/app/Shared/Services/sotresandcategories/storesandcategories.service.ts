import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import City from 'app/Shared/Model/City';
import { WebSiteInfo } from 'app/Shared/Model/WebSiteInfo';
import Categorie from 'app/Shared/Model/category';


@Injectable({
  providedIn: 'root'
})
export class StoresandcategoriesService {
  token: string = localStorage.getItem('accessToken');
  server: string = "http://192.119.110.192:5001/api/"
  // server:string="http://31.220.60.223/server/";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });
  constructor(private http: HttpClient) { }
  getall() {
    return this.http.get<JSON>(this.server + "stores/getnav", { headers: this.headers });
  }
  getallCity() {
    return this.http.get<City[]>(this.server + "address/getcuntriesDash", { headers: this.headers });
  }
  EditcuntriesDash(cit:City) {
    return this.http.post<boolean>(this.server + "address/EditcuntriesDash",cit, { headers: this.headers });
  }

  deleteCity(cit:City) {
    return this.http.post<boolean>(this.server + "address/deleteCity",cit, { headers: this.headers });
  }
  getStoreCategories(catlevel, storeid) {
    return this.http.get<JSON>(this.server + "stores/storeCat/" + storeid + '/' + catlevel, { headers: this.headers });

  }
  savecategory(categoriyList: Categorie[], storeid) {
    let obj = {
      cat: categoriyList,
      storeID: storeid
    }
    return this.http.post<JSON>(this.server + "stores/savecategory", obj, { headers: this.headers });

  }



  getwebsiteinfo() {
    return this.http.get<WebSiteInfo>(this.server + "WebSiteInfo", { headers: this.headers });

  }


  UPDATEwebsiteinfo(w: WebSiteInfo) {
    return this.http.post<WebSiteInfo>(this.server + "manageWebSiteInfo", w, { headers: this.headers });
  }


  logochange(formData) {
    let server: string = "http://192.119.110.192:5001/logo"
    return this.http.post(server, formData);
  }

  savesubcategorymetaanddescription(sub) {

    return this.http.post<JSON>(this.server + "stores/savesubcategorymetaanddescription", sub, { headers: this.headers });

  }

  Termschanges(trsms: string) {
    let obj = { terms: trsms };
    return this.http.post<boolean>(this.server + "Termschanges", obj, { headers: this.headers });
  }
  aboutuschanges(aboutus: string) {
    let obj = { aboutus: aboutus };
    return this.http.post<boolean>(this.server + "aboutuschanges", obj, { headers: this.headers });
  }

  contactuschange(contactus: string) {
    let obj = { contactus: contactus };
    return this.http.post<boolean>(this.server + "contactuschange", obj, { headers: this.headers });
  }
  PrivacyPolicychange(PrivacyPolicy: string) {
    let obj = { PrivacyPolicy: PrivacyPolicy };
    return this.http.post<boolean>(this.server + "PrivacyPolicychange", obj, { headers: this.headers });
  }

  scrollingNewschange(scrollingNews: string) {
    let obj = { scrollingNews: scrollingNews };
    return this.http.post<boolean>(this.server + "scrollingNewschange", obj, { headers: this.headers });
  }

  GiftDescriptionchange(GiftDescription: string) {
    let obj = { GiftDescription: GiftDescription };
    return this.http.post<boolean>(this.server + "GiftDescriptionchange", obj, { headers: this.headers });
  }

  ForgotPasswordSevicechange(webis: WebSiteInfo) {
    // let obj = { scrollingNews: scrollingNews };
    return this.http.post<boolean>(this.server + "ForgotPasswordSevicechange", webis, { headers: this.headers });
  }
  getstores() {
    return this.http.get<any>(this.server + "stores/getallstores", { headers: this.headers });

  }
  savestore(store) {
    return this.http.post<boolean>(this.server + "stores/updatestores",store, { headers: this.headers });

  }
  startquantityandappearance(StoreID:Number) {
    return this.http.get<boolean>(this.server + "stores/startquantityandappearance/"+StoreID, { headers: this.headers });
  }
  updateMessage(mess:string,messageApiKey:string){
    let i={
      mee:mess,
      messageApiKey:messageApiKey
    }
    return this.http.post<boolean>(this.server + "updatemessage",i, { headers: this.headers });

  }


  catimagechange(formData) {
    return this.http.post(this.server+"stores/newcattimage", formData);
  }

  catimageRemove(namw) {
    return this.http.get(this.server+"stores/removeimagecat/"+namw, { headers: this.headers });
  }
}
