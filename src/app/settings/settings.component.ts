import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs"
import * as Toast from "nativescript-toast";
import * as LS from "nativescript-localstorage";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    nombreUsuario: string;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    doLater(fn): void { setTimeout(fn, 1000); }

    ngOnInit(): void {
        this.usuario(LS.getItem('usuario'));
        this.doLater(() => Toast.makeText('Hello World', '2000').show());
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate(['/settings', navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    userActionAdd() {
        const user = LS.getItem('usuario');
        if (!user) {
            this.doLater(() => dialogs.prompt("Ingrese un nombre de usuario", 'username1')
                .then((res) => {
                    console.log("username: " + res.text);
                    localStorage.setItem('usuario', res.text);
                    dialogs.alert('Usuario creado correctamente');
                    this.usuario(res.text);
                })
            )
        }
    }

    userActionDel() {
        this.doLater(() =>
            dialogs.confirm('Realmente desea eleminar su usuario')
                .then((res) => {
                    console.log("resultado: " + res.valueOf());
                    localStorage.clear();
                    return this.nombreUsuario = null;
                }));
    }

    usuario(us: string) {
        if (us !== null) {
            this.nombreUsuario = us;
            return this.nombreUsuario;
        } else {
            return false;
        }
    }

}
