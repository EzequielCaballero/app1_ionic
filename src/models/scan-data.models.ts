//Modelo de datos
export class ScanData{
  info:string; //lo que recibo del escanear
  tipo:string; //la conversión que quiero hacer de lo que recibo
  msj:string; //información extra

  constructor(texto:string, msj:string){
    this.tipo = "no definido";
    this.info = texto;
    this.msj = msj;
  }
}
