import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async startPageLoading() {
    const loading = await this.loadingController.create({
      spinner:  'lines',
    });
    return await loading.present();
  }

  hidePageLoading() {
    this.loadingController.dismiss();
  }
}
