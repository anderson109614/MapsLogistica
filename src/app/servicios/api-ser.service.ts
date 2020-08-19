import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'md5-typescript';
@Injectable({
  providedIn: 'root'
})
export class APISerService {
  urlP:string='http://157.245.248.79:3000/'; 
 //urlP:string='http://localhost:3000/'; 
  constructor(private http: HttpClient) { }
  GetDispositivos(){
    return this.http.get(this.urlP+'dispositivos' );
  }
  getRutaFecha(id,fecha){
    return this.http.get(this.urlP+'ruta/'+id+"&"+fecha );
  }
  getAuth(cedula,pass){
    return this.http.post(this.urlP+'auth/',{cedula:cedula,contrasena: Md5.init(pass)} );
  }
}
