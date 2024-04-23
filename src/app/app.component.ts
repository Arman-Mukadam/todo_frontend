import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public installPrompt: any = null;

  // to show a popup of  update to native app
  constructor(private swUpdate: SwUpdate) {

    // if (this.swUpdate.available) {
    //   this.swUpdate.available.subscribe(() => {
    //     if (confirm("A new version is available, please update"))
    //       window.location.reload();
    //   })
    // }
    // Check for updates on application startup
    this.swUpdate.checkForUpdate();
  }

  // gettint install prompt
  getInstallPrompt() {
    window.addEventListener('beforinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e;
    })
  }

  // ask user to install
  askUserToInstallApp() {
    this.installPrompt.prompt();
  }
}
