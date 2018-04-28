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
  credito:number = 0;
  codigoLeido:any;
  flag:boolean;

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
                //console.log(data)
                for (let i = 0; i < data.length; i++) {
                    this.codeData.push(data[i]);
                }
                console.log("DATA: " + JSON.stringify(this.codeData));
            },
            err => console.log(JSON.stringify(err))
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
      this._historialService.limpiar_historial();
      this._app.getRootNav().setRoot(LoginPage); // IMPORTANT!
  }

  scannStart(){
    //Validación para el navegador web (probar servicio)
    if(!this.platform.is('cordova')){
      this._historialService.agregar_historial("Indefinido", "Mensaje");
      return;
    }

    this.barcodeScanner.scan().then((result) => {
      //Detalle de lo escaneado:
      console.log("DETALLE DE LO ESCANEADO:");
      console.log("Result: " + result.text + "\n"); //!!!
      console.log("Format: " + result.format + "\n");
      console.log("Cancelled: " + result.cancelled);

      if( !result.cancelled && result.text != null){
          if(this.validarCodigo(result.text)){
            if(this.validarHistorial(result.text)){
              this._historialService.agregar_historial(result.text, "Crédito cargado: " + this.credito);
              this.mostrarModalMensaje("Crédito cargado: " + this.credito);//Existe el código y no fue cargado aún
              console.log("Codigo cargado: " + result.text);
            }else
              this.mostrarModalMensaje("El monto: " + this.credito + ", ya fue acreditado!");//Existe el código y YA fue cargado
          }else
            this.mostrarModalMensaje("Código desconocido!");//No existe el código

      }//FIN de la validación general

    }).catch(err => {
        console.log('Error', JSON.stringify(err));
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

  //VALIDACIONES***************************************************************
  validarCodigo(codigoLeido:any){//Busco que exista
    this.flag = false;
    console.log("VALIDANDO! codigos totales: " + this.codeData.length);
    console.log("Codigo leido: " + codigoLeido);
    for (let i = 0; i < this.codeData.length; i++) {
        if(codigoLeido.toString().trim() == this.codeData[i].codigo.toString().trim()){
          this.credito = this.codeData[i].cantidad;
          this.flag = true;
          break;
        }
    }
    // for(let code of this.codeData){
    //   if(code.codigo == codigoLeido){
    //     this.credito = code.cantidad;
    //     this.flag = true;
    //     break;
    //   }
    // }
    return this.flag;
  }

  validarHistorial(codigoLeido:any){//Busco que NO exista (logica inversa)
    this.flag = true;
    if(this._historialService.cargar_historial().length > 0){ // Hay historial
      for (let i = 0; i < this._historialService.cargar_historial().length; i++) {
          if(codigoLeido == this._historialService.cargar_historial()[i].info){
            this.flag = false;
            break;
          }
      }
    }else
      this.flag = true; // No hay historial

    return this.flag;// Hay historial y ya existe el código a cargar
  }

}
