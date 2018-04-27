import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.models';

@Injectable()
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor() {
    console.log('Provider historial!');
  }

  agregar_historial(texto:string){
    let data = new ScanData(texto);
    this._historial.unshift( data ); //Inserta nuevos elementos al inicio, no al final (push).
    console.log(this._historial);
  }

  cargar_historial(){
    return this._historial;
  }

}
