import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoticiasService } from "./domain/noticias.service";

import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";

import {
    initializeNoticiasState,
    NoticiasEffects,
    NoticiasState,
    reducersNoticias
} from './domain/noticias-state.model'

// redux init
export interface AppState {
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias
}
const reducersInitialState = {
    noticias: initializeNoticiasState()
}
// fin redux init
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}),
        EffectsModule.forRoot([NoticiasEffects])
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        NoticiasService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
