import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINA
import { HomePage } from '../home/home';
//MANEJO DE DATOS
import { USUARIOS } from "../../data/data_usuarios"; // FUENTE
import { Usuario } from "../../interfaces/usuario_interface"; //FORMATO
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import{ Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //ATRIBUTOS
  user: Observable<firebase.User>;
  myLoginForm:FormGroup;
  flag:boolean = false;
  focus1:boolean = false;
  focus2:boolean = false;
  usuarios:Usuario[] = [];
  userNameTxt:string;
  userPassTxt:string;
  emailFormat:string = '^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i';
  audio = new Audio();
  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder,
              public afAuth:AngularFireAuth) {
        this.user = afAuth.authState;
        this.userNameTxt = "";
        this.userPassTxt = null;
        this.usuarios = USUARIOS.slice(0);
        this.myLoginForm = this.fbLogin.group({
          userEmail: ['', [Validators.required, Validators.email]],
          userPassword: ['', [Validators.required]],
    });
  }

  //METODOS
  perdioFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = false;
      console.log("Perdio foco 1!");
      break;
      case 2:
      this.focus2 = false;
      console.log("Perdio foco 2!");
      break;
    }
  }

  tieneFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = true;
      console.log("Tiene foco 1!");
      break;
      case 2:
      this.focus2 = true;
      console.log("Tiene foco 2!");
      break;
    }
  }

  validarUsuarioAuth(){
    this.afAuth
      .auth
      .signInWithEmailAndPassword(this.myLoginForm.value.userEmail, this.myLoginForm.value.userPassword)
      .then(value => {
        console.log('Funciona!' + JSON.stringify(value));
        this.ingresar();
        //this.ingresar(value);
      })
      .catch(err => {
        console.log('Algo salió mal: ',err.message);
        this.reproducirSonido();
        this.mostrarAlerta();
      });
  }

  validarUsuarioManual(){
    this.flag = false;
    console.log("Validando usuario...");
    console.info(this.usuarios);
    for(let user of this.usuarios){
      if(this.myLoginForm.value.userEmail == user.nombre && this.myLoginForm.value.userPassword == user.clave)
      {
        //this.ingresar(user);
        this.flag = true;
        break;
      }
    }
    if(!this.flag){
      console.log("El usuario no existe!");
      this.reproducirSonido();
      this.mostrarAlerta();
    }
  }

  ingresar(){
    this.navCtrl.push(HomePage);
  }

  // ingresar(usuario:any){
  //   this.navCtrl.push(HomePage, {'userData': usuario});
  // }

  ingresoDePrueba(user:string){
    switch(user){
      case 'admin':
        this.userNameTxt = "admin@gmail.com";
        this.userPassTxt = "admin11";
        break;
      case 'user':
        this.userNameTxt = "usuario@gmail.com";
        this.userPassTxt = "user33";
        break;
      case 'invited':
        this.userNameTxt = "invitado@gmail.com";
        this.userPassTxt = "invitado22";
        break;
      case 'tester':
        this.userNameTxt = "tester@gmail.com";
        this.userPassTxt = "tester55";
        break;
    }
  }

  mostrarAlerta(){
    let toast = this.toastCtrl.create({
      message: 'Usuario y/o contraseña incorrectos!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  reproducirSonido(){
    this.audio.src = "assets/sounds/windows_xp_error.mp3";
    this.audio.load();
    this.audio.play();
  }
}
