import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
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
  usuarios:Usuario[] = [];
  userNameInput:String = "";
  userPassInput:Number;

  //CONSTRUCTOR
  constructor(public navCtrl: NavController) {
    this.usuarios = USUARIOS.slice(0);
  }

  //METODOS
  validarUsuario(){
    console.log("Validando usuario...");
    console.info(this.usuarios);
    for(let user of this.usuarios){
      if(this.userNameInput == user.nombre && this.userPassInput == user.clave)
      {
        this.ingresar();
        break;
      }
      else
        console.log("Error al iniciar sesión!");
    }
    // this.usuarios.forEach(function(){
    // });
  }

  ingresar(){
    this.navCtrl.push(HomePage);
  }

}
