import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import * as camera from "nativescript-camera";
import * as socialSare from "nativescript-social-share";
import { ImageSource } from "@nativescript/core";
import { Device, Screen } from "@nativescript/core/platform";
import {
    connectionType,
    getConnectionType,
    startMonitoring,
    stopMonitoring
} from "@nativescript/core/connectivity";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    monitoreando: boolean = false;

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

    onButtonTap() {
        camera.requestCameraPermissions()
            .then(function success() {
                const options = { width: 300, height: 300, keepAspectRatio: false, savetoGallery: true };
                camera.takePicture(options)
                    .then((imageAsset) => {
                        console.log('Tamaño: ' + imageAsset.options.width + 'x' + imageAsset.options.height);
                        console.log('keepAspectRatio: ' + imageAsset.options.keepAspectRatio);
                        console.log('Foto guarda!');
                        ImageSource.fromAsset(imageAsset)
                            .then((imageSource) => {
                                socialSare.shareImage(imageSource, 'Asunto: compartido desde el curso!');
                            }).catch((err) => {
                                console.log('Error -> ' + err.message);
                            });
                    })
                    .catch((err) => console.log('Error -> ' + err.message));
            },
                function failere() {
                    console.log('Permiso de camara no aceptado por el usuario!')
                }
            );
    }

    onDatosPlataforma(): void {
        console.log("modelo", Device.model);
        console.log("tipo dispositivo", Device.deviceType);
        console.log("Sistema operativo", Device.os);
        console.log("versión sist operativo", Device.osVersion);
        console.log("Versión sdk", Device.sdkVersion);
        console.log("lenguaje", Device.language);
        console.log("fabricante", Device.manufacturer);
        console.log("código único de dispositivo", Device.uuid);
        console.log("altura en pixels normalizados", Screen.mainScreen.heightDIPs); // DIP (Device Independent Pixel), también conocido como densidad de píxeles independientes.Un píxel virtual que aparece aproximadamente del mismo tamaño en una variedad de densidades de pantalla.
        console.log("altura pixels", Screen.mainScreen.heightPixels);
        console.log("escala pantalla", Screen.mainScreen.scale);
        console.log("ancho pixels normalizados", Screen.mainScreen.widthDIPs);
        console.log("ancho pixels", Screen.mainScreen.widthPixels);
    }

    onMonitoreoDatos(): void {
        const myConnectionType = getConnectionType();
        switch (myConnectionType) {
            case connectionType.none:
                console.log("Sin Conexion");
                break;
            case connectionType.wifi:
                console.log("WiFi");
                break;
            case connectionType.mobile:
                console.log("Mobile");
                break;
            case connectionType.ethernet:
                console.log("Ethernet"); // es decir, cableada
                break;
            case connectionType.bluetooth:
                console.log("Bluetooth");
                break;
            default:
                break;
        }
        this.monitoreando = !this.monitoreando;
        if (this.monitoreando) {
            startMonitoring((newConnectionType) => {
                switch (newConnectionType) {
                    case connectionType.none:
                        console.log("Cambió a sin conexión.");
                        break;
                    case connectionType.wifi:
                        console.log("Cambió a WiFi.");
                        break;
                    case connectionType.mobile:
                        console.log("Cambió a mobile.");
                        break;
                    case connectionType.ethernet:
                        console.log("Cambió a ethernet.");
                        break;
                    case connectionType.bluetooth:
                        console.log("Cambió a bluetooth.");
                        break;
                    default:
                        break;
                }
            });
        } else {
            stopMonitoring();
        }
    }

}
