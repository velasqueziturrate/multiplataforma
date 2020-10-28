import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import { GestureEventData } from "@nativescript/core";
import { GridLayout } from "@nativescript/core/ui/layouts/grid-layout";
import { compose } from "nativescript-email";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onLongPress(args: GestureEventData) {
        const grid = <GridLayout>args.object;
        grid.rotate = 0;
        grid.animate({
            rotate: 360,
            duration: 2000
        })
    }

    sendMail() {
        const fs = require("file-system"); // usas el filesystem para adjuntar un archivo
        const appFolder = fs.knownFolders.currentApp(); // esto te da un objeto de tipo Folder
        const appPath = appFolder.path; // .path esto te da el path a la carpeta src
        const logoPath = appPath + "/res/icon.png"; // aquí armas el path del archivo copiado
        compose({
            subject: "Mail de Prueba", // asunto del mail
            body: "Hola <strong>mundo!</strong> :)", // cuerpo que será enviado
            to: ["mail@mail.com"], //lista de destinatarios principales
            cc: [], //lista de destinatarios en copia
            bcc: [], //lista de destinatarios en copia oculta
            attachments: [ //listado de archivos adjuntos
                // {
                //     fileName: "arrow1.png", // este archivo adjunto está en formato base 64 representado por un string
                //     path: "base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/ QDAJNpcv6v + k1ZAAAAAElFTkSuQmCC",
                //     mimeType: "image/png"
                // },
                {
                    fileName: "icon.png", // este archivo es el que lees directo del filesystem del mobile
                    path: logoPath,
                    mimeType: "image/png"
                }
            ]
        }).then(() => console.log("Enviador de mail cerrado"), (err) => console.log("Error: " + err));
    }
}
