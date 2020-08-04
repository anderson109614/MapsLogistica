import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APISerService {
  urlP:string='http://localhost:3000/'; 
  constructor(private http: HttpClient) { }
  GetDispositivos(){
    return this.http.get(this.urlP+'dispositivos' );
  }
  getRutaFecha(id,fecha){
    return this.http.get(this.urlP+'ruta/'+id+"&"+fecha );
  }
}
