import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { FcmService } from 'src/services/fcm.service';


@Component({
  providers:[FcmService],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public installPrompt: any = null;

  // to show a popup of  update to native app
  constructor(
    private platform: Platform,
    private fcm: FcmService
  ) {
    this.platform.ready().then(() => {
      this.fcm.initPush();
    }).catch(e => {
      console.log('error fcm: ', e);
    });
  }
}