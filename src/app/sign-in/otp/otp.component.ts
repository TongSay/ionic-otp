import { SignInPage } from './../sign-in.page';
import { AuthService } from './../../services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonNavLink, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @Input() phone;
  isLoading = false;
  otp: string;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };
  toastController: any;
  handlerMessage: string;
  roleMessage: string;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService,
    private tosh: SignInPage
    ) { }

  ngOnInit() {}

  showLoader(msg) {
    if(!this.isLoading){
        this.isLoading = true;
        return this.loadingCtrl.create({
        message: msg,
        spinner: 'bubbles'
      }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      });
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    });
  }
}

  hideLoader(){
    if(this.isLoading){
      this.isLoading = false;
      return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log(e));
    }
  }

  onOtpChange(event){
    this.otp = event;
    console.log(this.otp);
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber('+855' + this.phone);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    try {
      const response = await this.auth.verifyOtp(this.otp);
      console.log(response);
      this.presentToast();
    } catch(e) {
      console.log(e);
    }
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Hello Styled World!',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }


}


