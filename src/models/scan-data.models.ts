//Modelo de datos
export class ScanData{
  info:string; //lo que recibo al escanear
  tipo:string; //la conversión que quiero hacer de lo que recibo

  constructor(texto:string){
    this.tipo = "no definido";
    this.info = texto;
    if(texto.startsWith("http")){
      this.tipo = "http";
    }
  }
}
