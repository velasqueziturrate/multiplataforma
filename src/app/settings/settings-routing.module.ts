import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SettingsComponent } from "./settings.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

const routes: Routes = [
    { path: "", component: SettingsComponent },
    { path: ":user", component: UserEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
