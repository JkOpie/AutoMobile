import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post= {} as Post;

  constructor(
    private firestore : AngularFirestore,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async createPost(post:Post){  
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });

    (await loader).present();

    await this.firestore.collection("posts").add(post);

    (await loader).dismiss();

    this.navCtrl.navigateRoot("home");
  }

}
