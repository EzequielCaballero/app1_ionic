import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { LoginPage, TabsPage } from '../indexPaginas';
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userEmail:string = this.afAuth.auth.currentUser.displayName;
  audio = new Audio();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth:AngularFireAuth,
              public _app:App) {
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
      this._app.getRootNav().setRoot(LoginPage); // IMPORTANT!
  }
}
