import { AuthService } from './../services/auth/auth.service';
import { OtpComponent } from './otp/otp.component';
import { ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(10)]
      }),
    });
  }

  async signIn() {
    try {
      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      console.log(this.form.value);

      const response = await this.auth.signInWithPhoneNumber('+855' + this.form.value.phone);
      console.log(response);

      const options: ModalOptions = {
        component: OtpComponent,
        componentProps: {
          phone: this.form.value.phone
        },
        swipeToClose: true
      };
      const modal = this.modalCtrl.create(options);
      (await modal).present();
      const data: any = (await modal).onWillDismiss();
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }

}
