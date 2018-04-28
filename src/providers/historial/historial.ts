import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.models';

@Injectable()
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor() {
    //console.log('Provider historial!');
  }

  agregar_historial(texto:string, msj:string){
    let data = new ScanData(texto, msj);
    this._historial.push( data ); // .unshift Inserta nuevos elementos al inicio, no al final (push).
    console.log("Nuevo historial: " + this._historial);
  }

  cargar_historial(){
    return this._historial;
  }

  limpiar_historial(){
    this._historial = [];
  }

}
