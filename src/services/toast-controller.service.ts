import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastController: ToastController) { }

  // toast controller
  async showToast(message: string) {
    await this.toastController.create(
      {
        message,
        duration: 2000,
        color: "light",
        buttons: [
          {
            // icon: 'trash',
            text: "ok",
            role: 'cancel',
          },
        ],
      })
      .then((res) => res.present())
  }
}
