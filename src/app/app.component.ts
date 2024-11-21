import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'; // Para Capacitor
// import { SplashScreen } from '@ionic-native/splash-screen/ngx'; // Para Cordova
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Para Capacitor
      SplashScreen.show({
        autoHide: true,
        // Você pode adicionar outras opções aqui
      });

      // Para Cordova
      // this.splashScreen.show();
    });
  }
}