import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MinLenDirective } from "./directives/min-len.directive";
// import { NoticiasService } from "../domain/noticias.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        SearchFormComponent,
        MinLenDirective
    ],
    exports: [
        MinLenDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ] ,
    providers: [
        // NoticiasService
    ]
})
export class SearchModule { }
