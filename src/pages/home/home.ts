import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    menu: FirebaseListObservable<any[]>;

    constructor(public afd: AngularFireDatabase, private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController) {
        this.menu = this.afd.list('/Menu/milk_tea');
        console.log(this.menu);

  }

    pageWillLoad() {
        this.afAuth.authState.subscribe(data => {
            if (data && data.email && data.uid) {
                this.toast.create({
                    message: "Welcome to BobaGo, ${data.email}",
                    duration: 3000
                }).present();
            }
            else {
                this.toast.create({
                    message: "Could not find your authentication details.",
                    duration: 3000
                }).present();
            }
        });
    }
    
}
