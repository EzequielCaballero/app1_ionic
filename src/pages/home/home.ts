import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userEmail:string = this.afAuth.auth.currentUser.email;
  audio = new Audio();
  //sesionUsuario:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth:AngularFireAuth) {

          console.log(this.userEmail);
          this.reproducirSonido();

  }

  reproducirSonido(){
    this.audio.src = "assets/sounds/msg_notice.mp3";
    this.audio.load();
    this.audio.play();
  }

  cerrarSesion(){
    this.afAuth
      .auth
      .signOut();
      
    this.navCtrl.push(LoginPage);
  }

}
