import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Player} from '../../app/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
//import { AgeValidator } from  '../validators/age';
import {PlayerServiceProvider} from '../../providers/player-service/player-service';


@IonicPage()
@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html',
})
export class AddPlayerPage {
  
  public addPlayerForm: FormGroup;
  title = 'role-call';
  playerToEdit:Player;

  playerDb: Player[] = [];
  public adding: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public playerService: PlayerServiceProvider) {


    //Binding form fields and setting validators  

    this.addPlayerForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      dob: ['', Validators.required],
      parentName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      parentNo: ['', Validators.required]
  });

  this.playerService.getPlayers();

  }

  ionViewDidLoad() {
    
  }

  public addNewItem() {
    
    let player:Player = {name: this.addPlayerForm.value.name, dob: this.addPlayerForm.value.dob, parentName: this.addPlayerForm.value.parentName, parentPhoneNo: this.addPlayerForm.value.parentNo};

    //This function will only work if all form fields are valid
    
    if(this.addPlayerForm.valid){
      console.log('Populating form with');
      console.log(player);

      //creating a "confirm" popup and passing the player to it

      this.showConfirm(player);
    }

  }

  showConfirm(player) {
    const confirm = this.alertCtrl.create({
      
      title: 'Player added',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //Add player to database once OK is clicked
            this.playerService.addPlayer(player);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
