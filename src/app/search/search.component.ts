import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import { NoticiasService } from "../domain/noticias.service";
import { isAndroid } from "@nativescript/core/platform";
import * as Toast from 'nativescript-toast';
import { AppState } from '../app.module';
import { Noticia, NuevaNoticiaAction } from '../domain/noticias-state.model';
import { Store } from '@ngrx/store';
import * as socialShare from 'nativescript-social-share';
import * as imageSourceModule from 'nativescript-camera';


@Component({
    selector: "Search",
    templateUrl: "./search.component.html"/* ,
    providers: [NoticiasService] */
})

export class SearchComponent implements OnInit {

    plataforma: boolean;
    resultados: Array<string>;
    @ViewChild('layout', { static: true }) layout: ElementRef;

    constructor(
        private noticias: NoticiasService,
        private store: Store<AppState>
        ) { }

    ngOnInit(): void {
        this.plataforma = isAndroid;
        this.store.select((state) => state.noticias.sugerida)
        .subscribe((data) => {
            const f = data;
            if ( f != null) {
                Toast.makeText(`Sugerimos leer: ${f.titulo}`).show();
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(e): void {
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(e.view.bindingContext)));
    }

    onLongPress(x) {
        socialShare.shareText(x, 'Asunto compartido desde el curso!')
    }

    buscarAhora(s: string) {

        console.dir('buscarAhora' + s);
        this.noticias.buscar(s)
            .then((r: any) => {
                console.log('resultados buscarAhora: ' + JSON.stringify(r));
                this.resultados = r;
            }, (e) => {
                console.log('error buscarAhora ' + e);
                Toast.makeText('Error en la busqueda').show();
            })
    }

    agregarFav(x: string) {
        this.noticias.agregar(x)
        .then((res) => {
            if (res.statusCode === 200) {
                console.log(`Respuesta: ${res.statusCode}`);
            } else {
                console.log(`Error: ${res.statusCode}`);
            }
        })
    }

}