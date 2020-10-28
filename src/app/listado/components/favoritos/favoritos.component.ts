import { Component, OnInit } from '@angular/core';
import { NoticiasService } from "~/app/domain/noticias.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-favoritos',
  templateUrl: './favoritos.component.html'
})
export class FavoritosComponent implements OnInit {

  favoritos: [];
  imagesource: string;

  constructor(
    private routerExtensions: RouterExtensions,
    private noticiasService: NoticiasService
    ) {
      this.imagesource = '~/images/icon2.png';
    }

  ngOnInit(): void {
    this.noticiasService.getDBFavs((db) => {
      console.dir(db);
      db.all('select texto from favoritos',
        (err, fila) => {
          this.favoritos = fila;
          console.log('fila: ', fila)
        },
        (errr, totales) => console.log('Filas  totales: ', totales));
    }, () => console.log('error on getDBFavs'));
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate(['/list', navItemRoute], {
      transition: {
        name: "fade"
      }
    });

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

}
