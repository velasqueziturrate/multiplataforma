import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Componente12RoutingModule } from "./componente12-routing.module";
import { Componente12Component } from "./componente12.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Componente12RoutingModule
    ],
    declarations: [
        Componente12Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
