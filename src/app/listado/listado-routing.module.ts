import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ListadoComponent } from './components/listado/listado.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

const routes: Routes = [
  {
    path: '',
    component: ListadoComponent
  },
  {
    path: 'detail/:detail',
    component: DetalleComponent
  },
  {
    path: 'favoritos',
    component: FavoritosComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ListadoRoutingModule { }
