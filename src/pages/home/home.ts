import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, NavParams, App, Platform } from 'ionic-angular';
//PAGINAS
import { LoginPage, MensajePage } from '../indexPaginas';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import{ AngularFireDatabase } from 'angularfire2/database';
//INTERFACES
import { CodigoQR } from '../../interfaces/code_interface';
//SERVICIOS
import { HistorialService } from '../../providers/historial/historial';
//QR plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //codigos:Observable<any[]>;
  codeData:CodigoQR[] = [];
  userEmail:string = this.afAuth.auth.currentUser.displayName;
  audio = new Audio();
  counter:number = 1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth:AngularFireAuth,
              private afDB: AngularFireDatabase,
              public _app:App,
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform:Platform,
              private _historialService: HistorialService,
              private modalCtrl:ModalController) {

          console.log(this.userEmail);
          this.reproducirSonido();

          //LECTURA DE CODIGOS QR
          this.afDB.list('/codigoQR').valueChanges().subscribe(
            (data:any) => {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    this.codeData.push(data[i]);
                }
                console.log(this.codeData[0]);
            },
            err => console.log(err)
          );

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

  scannStart(){

    if(!this.platform.is('cordova')){
      this._historialService.agregar_historial("http://google.com");
      //return;
    }

    this.barcodeScanner.scan().then((result) => {
      //Detalle de lo escaneado:
      console.log("Result: " + result.text + "\n"); //!!!
      console.log("Format: " + result.format + "\n");
      console.log("Cancelled: " + result.cancelled);

      if( !result.cancelled && result.text != null){
        for(let code of this.codeData){
          if(code.codigo == result.text){
            this._historialService.agregar_historial(result.text);
            this.mostrarModalMensaje("Crédito cargado: " + code.cantidad);
            break;
          }
          this.counter++;
        }
        if(this.counter == 3)
          this.mostrarModalMensaje("Código desconocido!");
      }

    }).catch(err => {
        console.log('Error', err);
        this.mostrarAlerta("X%$ - Error al escanear!");
    });
  }

  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  mostrarModalMensaje(msj:string){
    this.modalCtrl.create(MensajePage, {mensaje:msj}).present();
  }

}
