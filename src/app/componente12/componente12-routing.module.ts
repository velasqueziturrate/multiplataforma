import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { Componente12Component } from "./componente12.component";

const routes: Routes = [
    { path: "", component: Componente12Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class Componente12RoutingModule { }
