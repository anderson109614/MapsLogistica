import { Component, OnInit } from '@angular/core';
import {APISerService} from '../../servicios/api-ser.service';
@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css']
})
export class DispositivosComponent implements OnInit {
  listaDispositivos:any=[];
  listaDispositivosAux:any=[];
  constructor(private ser:APISerService) { }

  ngOnInit(): void {
this.CargarDispositivos();
  }
  CargarDispositivos(){
    this.ser.GetDispositivos().subscribe(
      res => {
        this.listaDispositivos = res;
        this.listaDispositivosAux = res;
      },
      err => console.log(err)
    );
  }
  checkBien($event: KeyboardEvent) {

    this.listaDispositivos = this.listaDispositivosAux;

    let value = (<HTMLInputElement>event.target).value;
    const result = this.listaDispositivos.filter(pedido => pedido.Id.search(value) >= 0
  
      || pedido.Fecha.toUpperCase().search(value.toUpperCase()) >= 0
      || pedido.UUID.toUpperCase().search(value.toUpperCase()) >= 0
      || pedido.manufacture.toUpperCase().search(value.toUpperCase()) >= 0
      || pedido.model.toUpperCase().search(value.toUpperCase()) >= 0

    );
    this.listaDispositivos = result;

  }
}
