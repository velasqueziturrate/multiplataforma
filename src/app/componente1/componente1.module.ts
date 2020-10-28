import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { Componente1RoutingModule } from "./componente1-routing.module";
import { Componente1Component } from "./componente1.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Componente1RoutingModule
    ],
    declarations: [
        Componente1Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
