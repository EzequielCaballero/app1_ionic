import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mensaje',
  templateUrl: 'mensaje.html',
})
export class MensajePage {

  mensajeRecibido:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.mensajeRecibido = navParams.get("mensaje");
    console.log("Notificación: " + this.mensajeRecibido);
  }

  cerrarModal(){
      this.viewCtrl.dismiss();
  }

}
