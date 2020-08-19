import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APISerService } from '../../servicios/api-ser.service';
import { SocketcliService } from '../../servicios/socketcli.service';
import 'leaflet';
import 'leaflet-routing-machine';
declare let L: any;
@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements AfterViewInit {
  mymap: any;
  miId = '';
  listaPutos: any = [];
  listaCoordenadas: any = [];
  marcador;
  ruta;
  myFormattedDate;
  constructor(private rutaActiva: ActivatedRoute,
    public router: Router,
    private ser: APISerService,
    private webSocketSer: SocketcliService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    //this.rutaActiva.snapshot.params.id---    this.router.navigate(['/productos']);
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    this.myFormattedDate = year + "-" + (monthIndex + 1) + "-" + day;
    console.log('dato antes',this.myFormattedDate);
    this.miId = this.rutaActiva.snapshot.params.id
    this.crearMap();
    this.iniciarMarcagor();
    this.iniciarSocket();
    //this.marcarPunto('-1.3100716','-78.5111508');

  }
  iniciarSocket() {
    console.log('nicio soc', this.miId);
    this.webSocketSer.listen('Ubicacion:' + this.miId).subscribe((data) => {
      console.log(data);
      let d = <{ Id, Lat, lon, guardar }>data;
      this.marcarPunto(d.Lat, d.lon,d.guardar);



    });
  }

  marcarPunto(lat, lon,guardado:boolean) {
    
    if(guardado){
      this.listaCoordenadas.push(L.latLng(lat, lon));
    
      console.log(this.listaCoordenadas);
      this.ruta.setWaypoints(this.listaCoordenadas);
    }
    this.marcador.setLatLng(L.latLng(lat, lon));
    
    
  }

  iniciarMarcagor() {
    var greenIcon = L.icon({
      iconUrl: 'assets/img/camionSF.png',
      
      iconSize: [40, 40], // size of the icon
     /*shadowSize: [50, 64], // size of the shadow
      iconAnchor: [10, 30], // point of the icon which will correspond to marker's location 22, 94
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      */
    });
    this.marcador = L.marker(['0', '0'], { icon: greenIcon }).addTo(this.mymap);

  }
FechaSelected(){
   console.log((<HTMLInputElement>document.getElementById('txt_FechaIngreso')).value);
   let fecha=(<HTMLInputElement>document.getElementById('txt_FechaIngreso')).value;
   //let sep=fecha.split('-');
   //this.myFormattedDate=sep[2]+'-'+sep[1]+'-'+sep[0];
   console.log('dato change',fecha);
   this.ser.getRutaFecha(this.miId, fecha).subscribe(
    res => {

      this.listaPutos = res;
      this.listaCoordenadas=[];
      console.log('res change',this.listaPutos);
      for (let i = 0; i < this.listaPutos.length; i++) {
        this.listaCoordenadas.push(L.latLng(this.listaPutos[i].Latitud, this.listaPutos[i].Longitud));
      }
      console.log(this.listaCoordenadas);
      this.ruta.setWaypoints(this.listaCoordenadas);
    },
    err => console.log(err)
  );
}


  crearMap() {
    //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png //http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
    this.mymap = L.map('idMap').setView([-1.3105168, -78.5100714], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.mymap);
    //
    
    ///traer puntos

    this.ser.getRutaFecha(this.miId, this.myFormattedDate).subscribe(
      res => {

        this.listaPutos = res;
        console.log(res);
        for (let i = 0; i < this.listaPutos.length; i++) {
          this.listaCoordenadas.push(L.latLng(this.listaPutos[i].Latitud, this.listaPutos[i].Longitud));
        }
        console.log(this.listaCoordenadas);
       this.ruta= L.Routing.control({
          waypoints: this.listaCoordenadas,
          routeWhileDragging: true
        }).addTo(this.mymap);

      },
      err => console.log(err)
    );





  }

}
