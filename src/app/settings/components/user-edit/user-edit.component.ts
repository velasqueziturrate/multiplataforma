import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs"
import * as Toast from "nativescript-toast";
import * as LS from "nativescript-localstorage";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  nombreUsuario: string;

  constructor(private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject providers.
    this.nombreUsuario = LS.getItem('usuario');
  }

  doLater(fn): void { setTimeout(fn, 1000); }

  ngOnInit(): void {
    this.doLater(() => Toast.makeText('Hello World', '2000').show());
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  userActionEdit(user: string) {
    this.doLater(() => {
      console.log('usuario editado: ', user);
      localStorage.setItem('usuario', user);
      dialogs.alert('Ususario se edito Exitosamente')
        .then(() => this.routerExtensions.navigate(['/settings']));
    })
  }

}
