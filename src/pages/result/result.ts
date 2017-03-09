import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {SQLite,NativePageTransitions, NativeTransitionOptions,AdMob} from 'ionic-native';
/*
  Generated class for the Result page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
public database: SQLite;
public name: any;
public content: any;
public id_post: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public params: NavParams,private platform: Platform) {
         this.platform.ready().then(() => {
            this.id_post='anh';
       
            this.database = new SQLite();
               this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
               this.database.executeSql("SELECT * FROM tbl_post where id ="+this.params.get('id'), []).then((data) => {
               this.name=data.rows.item(0).name;
               this.content=data.rows.item(0).des;
               this.id_post=data.rows.item(0).id_post;
           }, (error) => {
               alert("Error")
           });  


               }, (error) => {
                   console.log("ERROR: ", error);
               });
        });

    }

  ionViewDidLoad() {

   }
}