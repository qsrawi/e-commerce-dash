import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  token:string=localStorage.getItem('accessToken');
  server:string="http://192.119.110.192:5001/api/"
  headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'Bearer '+this.token });
  constructor(private http:HttpClient) { }  getall(){
    return this.http.get(this.server+"stores/getall",{ headers: this.headers });
  }

  getStoreCategories(storeid){
    return this.http.get(this.server+"stores/storeCat/"+storeid,{ headers: this.headers });

  }
  addfiles(formData){
    let server:string="http://192.119.110.192:5001/sliderimage"
    return this.http.post(server,formData);
  }
  getallslides(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('accessToken') });
      //console.log(this.headers);
      
    return this.http.get(this.server+"stores/imagesname",{ headers: this.headers });


  }
  deletefile(id,filename){
                                
    return this.http.get(`http://192.119.110.192:5001/api/stores/removeimage/${filename}/${id}`,{ headers: this.headers });
  }



  /* START MIDDLE IMAGES SERVICES */

  addfilesMIDDLE(formData){
    return this.http.post(this.server+"middleimages/middleimage",formData);
  }
  getallmiddileimagesMIDDLE(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('accessToken') });
      //console.log(this.headers);
      
    return this.http.get(this.server+"middleimages/imagesname",{ headers: this.headers });


  }
  deletefileMIDDLE(filename){
                                
    return this.http.get(this.server+`middleimages/removeimage/${filename}`,{ headers: this.headers });
  }


}
