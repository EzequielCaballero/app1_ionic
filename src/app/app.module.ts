import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms'
import { MyApp } from './app.component';
//PAGES
import { LoginPage, TabsPage, HomePage, HistorialPage, MensajePage  } from '../pages/indexPaginas';
//SERVICIOS
import { HistorialService } from '../providers/historial/historial';
//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//QR plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//PUBLICIDAD
import { AdMobFree } from '@ionic-native/admob-free';

export const firebaseConfig = {
  apiKey: "AIzaSyD5kqFPTff7hLEesaoi1AMLGYc-zeCB0lo",
  authDomain: "cargadecredito-c8933.firebaseapp.com",
  databaseURL: "https://cargadecredito-c8933.firebaseio.com",
  projectId: "cargadecredito-c8933",
  storageBucket: "cargadecredito-c8933.appspot.com",
  messagingSenderId: "915914225058"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    HistorialPage,
    MensajePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    HistorialPage,
    MensajePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialService,
    AdMobFree
  ]
})
export class AppModule {}
