import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { Componente1Component } from "./componente1.component";

const routes: Routes = [
    { path: "", component: Componente1Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class Componente1RoutingModule { }
