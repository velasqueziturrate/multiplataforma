import { Injectable } from '@angular/core';
import { Http } from '@nativescript/core';
const sqlite: any = require('nativescript-sqlite');
// import * as couchbaseModule from "nativescript-couchbase";

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  // database: couchbaseModule.Couchbase;
  api: string = 'https://6c9ae79c4e4f.ngrok.io';
  private noticias: Array<string> = [];

  constructor() {
    // this.database = new couchbaseModule.Couchbase("test-database");

    this.getDB((db) => {
      console.dir(db);
      db.each('select * from logs',
        (err, fila) => console.log('fila: ', fila),
        (errr, totales) => console.log('Filas  totales: ', totales));
    }, () => console.log('error on getDB'));
    this.getDBFavs((db) => {
      console.dir(db);
      db.each('select * from favoritos',
        (err, fila) => console.log('fila: ', fila),
        (errr, totales) => console.log('Filas  totales: ', totales));
    }, () => console.log('error on getDBFavs'));

    // this.database.createView("logs", "1", (document, emitter) =>
    //   emitter.emit(document._id, document));
    // const rows = this.database.executeQuery("logs", { limit: 200 });
    // console.log("documentos: " + JSON.stringify(rows));
  }

  // crearDoc(s) {
  //   const documentId = this.database.createDocument({ texto: s });
  //   console.log("nuevo id couchbase: ", documentId);
  // }
  // crearVista() {
  //   this.database.createView("logs", "1", (document, emitter) => emitter.emit(document._id, document));
  //   // le estás pasando: nombre de vista, versión de vista y mapeador de
  //   // documentos para saber cómo deben verse en la vista.
  //   const documentos = this.database.executeQuery("logs", { limit: 200 });
  //   console.log("documentos: " + JSON.stringify(documentos));
  // }

  getDB(fnOk, fnError) {
    return new sqlite('mi_db_logs', (err, db) => {
      if (err) {
        console.error('Error al abrir db!', err);
      } else {
        console.log('Esta la db abierta: ', db.isOpen() ? 'si' : 'no');
        db.execSQL('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)')
          .then((id) => {
            console.log('CREATE TABLE logs OK');
            fnOk(db);
          }, (error) => {
            console.log('CREATE TABLE logs ERROR: ', error);
            fnError(error);
          });
      }
    });
  }

  getDBFavs(fnOk, fnError) {
    return new sqlite('db_favs', (err, db) => {
      if (err) {
        console.error('Error al abrir db!', err);
      } else {
        console.log('Esta la db abierta: ', db.isOpen() ? 'si' : 'no');
        db.execSQL('CREATE TABLE IF NOT EXISTS favoritos (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)')
          .then((id) => {
            console.log('CREATE TABLE favoritos OK');
            fnOk(db);
          }, (error) => {
            console.log('CREATE TABLE favoritos ERROR: ', error);
            fnError(error);
          });
      }
    });
  }

  agregar(s: string) {
    this.getDBFavs((db) => {
      db.execSQL('insert into favoritos (texto) values (?)', [s],
        (err, id) => console.log('nuevo id: ', id));
    }, () => console.log('Error en getDBFavs'));

    return Http.request({
      url: this.api + '/favs',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      content: JSON.stringify({
        nuevo: s
      })
    });
  }

  favs() {
    return Http.getJSON(this.api + '/favs');
  }

  buscar(s: string) {
    this.getDB((db) => {
      db.execSQL('insert into logs (texto) values (?)', [s],
        (err, id) => console.log('nuevo id: ', id));
    }, () => console.log('Error en getDB'));

    // const documentId = this.database.createDocument({ texto: s });
    // console.log("nuevo id couchbase: ", documentId);

    return Http.getJSON(this.api + '/get?q=' + s);
  }

}
