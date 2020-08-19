import { Component, Inject, Injectable } from '@angular/core';
import { Usuario } from './Modelos/Usuario';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {APISerService} from './servicios/api-ser.service';
import 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MapsLogistica';

  log: boolean = false;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
    public router: Router,
    private serApi:APISerService) { }

  ngOnInit() {
    let lg: Usuario = this.storage.get('Usuario');
    if (lg != null) {
      this.MostrarLogin(false);
    } else {
      this.MostrarLogin(true);
    }




  }
  MostrarLogin(estado: boolean) {
    console.log('entro');
    if (estado) {
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('DivLogin')).style.display = 'block';
    } else {
      (<HTMLDivElement>document.getElementById('DivPagina')).style.display = 'block';
      (<HTMLDivElement>document.getElementById('DivLogin')).style.display = 'none';

    }

  }

  onClickLogin() {

    var usr = (<HTMLInputElement>document.getElementById("txt-login-username")).value;
    var cont = (<HTMLInputElement>document.getElementById("txt-login-password")).value;
 
     this.serApi.getAuth(usr,cont).subscribe(
       res => {
         try {
           if(res[0].id!=0){
             this.MostrarLogin(false);
             this.storage.set('Usuario',res[0]);
             this.router.navigateByUrl('/');
           } 
         }
         catch(e) {
           (<HTMLLabelElement>document.getElementById('lbl_error')).style.display='block';
           (<HTMLLabelElement>document.getElementById('lbl_error')).textContent="Error.... Ingrese un usuario y contraseña validos!!";
 
         }
 
 
         
       },
       err => console.log(err)
     );
       /* 
    let usrAux: Usuario = { Id: '1', Apellido: 'admin', Cedula: 'admin', Contrasena: 'admin', Nombre: 'admin' };
    if (usr == "admin" && cont == "admin") {
      this.MostrarLogin(false);
      this.storage.set('Usuario', usrAux);
      this.router.navigateByUrl('/');
    } else {
      (<HTMLLabelElement>document.getElementById('lbl_error')).style.display = 'block';
      (<HTMLLabelElement>document.getElementById('lbl_error')).textContent = "Error.... Ingrese un usuario y contraseña validos!!";
    }
*/

  }
}
