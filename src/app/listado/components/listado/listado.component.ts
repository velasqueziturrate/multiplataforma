import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs"

@Component({
  selector: 'listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  plataforma: boolean;
  resultados: Array<string> = [];
  imagesource: string;
  favoritos: string;

  constructor(
    private routerExtensions: RouterExtensions
  ) {
    this.resultados.push("Producto x");
    this.imagesource = '~/images/icon2.png';
  }

  doLater(fn): void { setTimeout(fn, 1000); }

  ngOnInit(): void {
    this.plataforma = isAndroid;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate(['/list/detail', navItemRoute], {
      transition: {
        name: "fade"
      }
    });

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  onPull(e) {
    console.log(e);
    const pullRefresh = e.object;
    const numArt = this.resultados.length
    setTimeout(() => {
      this.resultados.push(`Producto ${numArt + 1}`);
      if (numArt % 2 === 0) {
        this.imagesource = 'res://icon';
      } else {
        this.imagesource = '~/images/icon.png';
      }
      pullRefresh.refreshing = false;
    }, 2000);
  }

  newProduct(e) {
    return dialogs.action("A continuacion seleccione la accion que desea realizar:", "Cancelar!", ["Agregar", "Eliminar"])
      .then((result) => {
        console.log("resultado: " + result);
        if (result === "Agregar") {
          this.doLater(() =>
            dialogs.alert({
              title: "Agregar producto",
              message: "Estas agregando un nuevo producto",
              okButtonText: "Agregar"
            }).then(() => dialogs.confirm("¿Estas seguro de agregar un nuevo producto?"))
              .then((res) => {
                if (res) {
                  this.onPull(e);
                  console.log("Agregado!");
                } else {
                  console.log("Cancelado!");
                }
              }));
        } else if (result === "Eliminar") {
          this.doLater(() =>
            dialogs.alert({
              title: "Eliminar un Producto",
              message: "¿Estas seguro de eliminar un producto x?",
              okButtonText: "Eliminar"
            }).then(() => dialogs.confirm("¿Estas seguro de eliminar un nuevo producto?"))
              .then((res) => {
                if (res) {
                  const i = this.resultados.length;
                  this.resultados.splice(i - 1, 1);
                  console.log("Eliminado!")
                } else {
                  console.log("Cancelo!")
                }
              }));
        }
      });
  }

}
