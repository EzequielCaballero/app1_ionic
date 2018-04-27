//Modelo de datos
export class ScanData{
  info:string; //lo que recibo al escanear
  tipo:string; //la conversión que quiero hacer de lo que recibo

  constructor(tipoArchivo:string){
    this.tipo = tipoArchivo;
  }
}
