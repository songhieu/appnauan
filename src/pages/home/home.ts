import { Component } from '@angular/core';
import {NavController, Platform,LoadingController } from 'ionic-angular';
import {SQLite,Keyboard} from 'ionic-native';
import {ResultPage} from '../result/result'
import {MonAn} from '../../services/MonAn'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    public database: SQLite;
    public monan: Array<MonAn>;
    public items: Array<MonAn>;
    constructor(public navCtrl: NavController, private platform: Platform,public loadingController: LoadingController) {
        this.platform.ready().then(() => {
        let loader = this.loadingController.create({
        content: "Loading"
        });  
        loader.present();
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.database.executeSql("SELECT * FROM tbl_post ORDER BY  RANDOM()", []).then((data) => {
                this.monan = [];
                if(data.rows.length > 0) {
                    for(var i = 0; i < data.rows.length; i++) {
                        let ma = new MonAn(data.rows.item(i).id,data.rows.item(i).id_post,data.rows.item(i).name);
                        this.monan.push(ma);
                    }
                }
                this.items=this.monan;

            }, (error) => {
                alert("ERROR");
            });    
        }, (error) => {
        console.log("ERROR: ", error);
        });
        
        loader.dismiss();
        });

    }
    clicktopage(page){
        let loader = this.loadingController.create({
        content: "Loading"
        });  
        loader.present();
        this.navCtrl.push(ResultPage,{id:page},{animate:false});
        loader.dismiss();
    }
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (this.locdau(item.name.toLowerCase()).indexOf(this.locdau(val.toLowerCase())) > -1);
        })
      }
    }
    initializeItems(){
        this.items=this.monan;
    }
    enterkey(){
    Keyboard.close();
    }

    locdau(str){
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,"-");
    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
    }


  }
  
