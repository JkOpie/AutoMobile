import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Post} from '../model/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {

  post= {} as Post;
  id : any;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl:NavController
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPostById(this.id)
  }

  async getPostById(id:String){

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });

    (await loader).present();

    this.firestore
    .doc("posts/" + id )
    .valueChanges()
    .subscribe(data => {
      this.post.title = data["title"],
      this.post.desc = data["desc"]
    });

    (await loader).dismiss();

  }

  async getUpdate(post:Post){

    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });

    (await loader).present();

    this.firestore.doc("posts/" + this.id ).update(post);

    (await loader).dismiss();

    this.navCtrl.navigateRoot("home");

  }


}
