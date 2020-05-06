
import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestore } from '@angular/fire/firestore';
import {LoadingController, ToastController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts:any;

  constructor(
    private firestore : AngularFirestore,
    private loadingCtrl: LoadingController,
    private navCtrl:NavController
  ) {}

  ionViewWillEnter(){
    this.getPost();
  }

  async getPost(){
    this.firestore
    .collection("posts")
    .snapshotChanges()
    .subscribe( data => {
      this.posts = data.map( e => {
          return {
            id: e.payload.doc.id,
            desc: e.payload.doc.data()["desc"],
            title: e.payload.doc.data()["title"],
          };
      });
    });

  }

  async deletepost(id : string){

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });

    (await loader).present();

    await this.firestore.doc("posts/" + id).delete();

    (await loader).dismiss();

  }

  

}
