import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mensaje',
  templateUrl: 'mensaje.html',
})
export class MensajePage {

  mensajeRecibido:string;
  audio = new Audio();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.mensajeRecibido = navParams.get("mensaje");
    this.reproducirSonido();
    console.log("Notificación: " + this.mensajeRecibido);
  }

  reproducirSonido(){
    this.audio.src = "assets/sounds/beep_2.mp3";
    this.audio.load();
    this.audio.play();
  }

  cerrarModal(){
      this.viewCtrl.dismiss();
  }

}
