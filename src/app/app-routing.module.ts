import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DispositivosComponent} from './componentes/dispositivos/dispositivos.component';
import {RutaComponent} from './componentes/ruta/ruta.component';
import {MonitoreoComponent} from './componentes/monitoreo/monitoreo.component';
const routes: Routes = [
  {path:'dispositivos',component:DispositivosComponent},
  {path:'ruta/:id',component:RutaComponent},
  {path:'monitoreo',component:MonitoreoComponent},
  {path:'**',component:DispositivosComponent},
  {path:'',component:DispositivosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
