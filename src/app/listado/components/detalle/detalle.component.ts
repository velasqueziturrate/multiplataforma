import { Component, OnInit, ViewChild, ElementRef, } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import { isAndroid } from "@nativescript/core/platform";
import { ActivatedRoute } from "@angular/router";
import * as Toast from "nativescript-toast"
// import { View } from "@nativescript/core/ui/page";
import { Color } from "@nativescript/core/color";
import {AnimationCurve} from "@nativescript/core/ui/enums";
import { View } from "@nativescript/core";

@Component({
  selector: 'detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  plataforma: boolean;
  resultados: Array<string> = [];
  detail$;
  @ViewChild('product', { static: true }) layout: ElementRef;

  constructor(private route: ActivatedRoute) { }

  doLater(fn) { setTimeout(fn, 1000); }

  ngOnInit(): void {
    this.plataforma = isAndroid;
    this.detail$ = this.route.snapshot.paramMap.get('detail');
    const toast = Toast.makeText("Visualizando Detalle del Producto", "long");
    this.doLater(() => toast.show());
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  animarAhora() {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      backgroundColor: new Color("blue"),
      duration: 200,
      delay: 150
    }).then(() => layout.animate({
      backgroundColor: new Color("#414b7d"),
      curve: AnimationCurve.easeOut,
      delay: 300,
      duration: 3000,
      iterations: 3,
      opacity: 0.8,
      rotate: 360,
      scale: {
        x: 2,
        y: 2
      },
      translate: {
        x: 0,
        y: 200
      }
    })).then(() => layout.animate({
      backgroundColor: new Color("white"),
      duration: 200,
      delay: 150,
      scale: {
        x: 1,
        y: 1
      },
      translate: {
        x: 0,
        y: 0
      }
    }));
  }

}
