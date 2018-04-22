import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINA
import { HomePage } from '../home/home';
//MANEJO DE DATOS
import { USUARIOS } from "../../data/data_usuarios"; // FUENTE
import { Usuario } from "../../interfaces/usuario_interface"; //FORMATO

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //ATRIBUTOS
  myLoginForm:FormGroup;
  flag:boolean = false;
  usuarios:Usuario[] = [];
  emailFormat:string = '^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i';

  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder) {
    this.usuarios = USUARIOS.slice(0);
    this.myLoginForm = this.fbLogin.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  //METODOS
  validarUsuario(){
    this.flag = false;
    console.log("Validando usuario...");
    console.info(this.usuarios);
    for(let user of this.usuarios){
      if(this.myLoginForm.value.userEmail == user.nombre && this.myLoginForm.value.userPassword == user.clave)
      {
        this.ingresar();
        this.flag = true;
        break;
      }
    }
    if(!this.flag){
      console.log("El usuario no existe!");
      this.mostrarAlerta();
    }
  }

  ingresar(){
    this.navCtrl.push(HomePage);
  }

  mostrarAlerta(){
    let toast = this.toastCtrl.create({
      message: 'Usuario y/o contraseña incorrectos!',
      duration: 2000
    });
    toast.present();
  }

}
