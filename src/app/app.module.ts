import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { DispositivosComponent } from './componentes/dispositivos/dispositivos.component';
import { MonitoreoComponent } from './componentes/monitoreo/monitoreo.component';
import { RutaComponent } from './componentes/ruta/ruta.component';
import { HttpClientModule } from '@angular/common/http';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    DispositivosComponent,
    MonitoreoComponent,
    RutaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
