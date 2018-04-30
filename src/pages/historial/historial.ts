import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { HistorialService } from '../../providers/historial/historial';

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  historialTotal:any[] = [];
  registros:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _historialService: HistorialService) {
  }

  ionViewDidEnter() {
    this.historialTotal = [];
    if(this._historialService.cargar_historial().length > 0){
      for (let i = 0; i < this._historialService.cargar_historial().length; i++) {
          this.historialTotal.push(this._historialService.cargar_historial()[i]);
      }
      this.registros = true;
    }else{
      this.historialTotal[0] = "No hay registros";
      this.registros = false;
    }

    console.log("Historial hasta el momento: " + JSON.stringify(this.historialTotal));
  }

  limpiarHistorial(){
    this._historialService.limpiar_historial();
    this.registros = false;
  }
}
