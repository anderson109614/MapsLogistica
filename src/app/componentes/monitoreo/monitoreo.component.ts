import { Component, OnInit } from '@angular/core';
import { SocketcliService } from '../../servicios/socketcli.service';
declare let L: any;
@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit {
  mymap: any;
  constructor( private webSocketSer: SocketcliService) { }
  marcadores:any=[];
  ngOnInit(): void {
    this.crearMap();
    this.iniciarSocket();

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
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = year + "-" + (monthIndex + 1) + "-" + day;
    






  }
  iniciarSocket() {
    
    this.webSocketSer.listen('Ubicacion').subscribe((data) => {
      console.log(data);
      let d = <{ Id,UUID,manufacture,model, Lat, lon, guardar }>data;
      this.marcarPunto(d.Lat, d.lon,d.Id,d.UUID,d.manufacture,d.model);



    });
  }

  marcarPunto(lat, lon,id,UUID,manufacture,model) {
    
    
    //this.
    for (let index = 0; index < this.marcadores.length; index++) {
      if(this.marcadores[index].id==id){
        this.marcadores[index].marcador.setLatLng(L.latLng(lat, lon));
        
        return;
      }
      
    }
    this.iniciarMarcagor(id,lat,lon,UUID,manufacture,model);
  }
  
  iniciarMarcagor(idDis,lat,lon,UUID,manufacture,model) {
    console.log('inicio marcador',idDis);
    var greenIcon = L.icon({
      iconUrl: 'assets/img/camionSF.png',
      
      iconSize: [40, 40] // size of the icon
      //shadowSize: [50, 64], // size of the shadow
      //iconAnchor: [10, 30], // point of the icon which will correspond to marker's location 22, 94
      //shadowAnchor: [4, 62],  // the same for the shadow
     // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    let marcadorAux = L.marker([lat, lon], { icon: greenIcon }).addTo(this.mymap);
    marcadorAux.bindPopup("<b>"+manufacture+" "+model+"</b><br>"+UUID).openPopup();
    this.marcadores.push({id:idDis,marcador:marcadorAux});
    console.log(this.marcadores);
  }
}
