import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,AdMob } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
    window['plugins'].sqlDB.copy("data.db", 0);
    StatusBar.styleDefault();
    Splashscreen.hide();
    AdMob.createBanner({
        adId: 'ca-app-pub-3029527126441173/4210911641',
        autoShow: true
    });
    AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3029527126441173/2756028044',
        autoShow: true
    });
   });
  }
}
