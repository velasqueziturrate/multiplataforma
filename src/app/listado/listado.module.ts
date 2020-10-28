import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { ListadoRoutingModule } from './listado-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ListadoComponent } from './components/listado/listado.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';


@NgModule({
  declarations: [
    DetalleComponent,
    ListadoComponent,
    FavoritosComponent
  ],
  imports: [
    ListadoRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ListadoModule { }
