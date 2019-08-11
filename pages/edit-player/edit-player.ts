import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Player} from '../../app/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {PlayerServiceProvider} from '../../providers/player-service/player-service';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'


@IonicPage()
@Component({
  selector: 'page-edit-player',
  templateUrl: 'edit-player.html',
})
export class EditPlayerPage {

  public editPlayerForm: FormGroup;
  paramData:any =[];
  playerID:any;

  constructor(public navCtrl: NavController,  private auth: AuthServiceProvider, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public playerService: PlayerServiceProvider) {

    this.paramData = navParams.data;
    console.log('Nav params hopefully retrieved');
    console.log(this.paramData);
    
   

    //Binding the form fields
    this.editPlayerForm = formBuilder.group({
        name: [''],
        dob: [''],
        parentName: [''],
        parentNo: ['']
    });

   
  }

  ionViewDidLoad() {

    console.log('Are we still logged in??');
    console.log(this.auth.isLoggedIn);


    //I have two different populate form functions that do the same thing
    //Populate from login happens when a user has had to log in to edit. 
    //The player details in the nav params got altered slightly so it wasn't compatable with
    //the ordinary populate form.

    if(this.auth.isLoggedIn == false){
      this.populateForm();
    }else{
      this.populateFromLogin();
    }


  }

  //Populate the form fields from the nav params

  populateFromLogin(){

    this.editPlayerForm.setValue({
      name: this.navParams.data.data.name,
      dob: this.navParams.data.data.dob,
      parentName: this.navParams.data.data.parentName,
      parentNo: this.navParams.data.data.parentPhoneNo
    })

    this.playerID = this.navParams.data.data.id;

  }

  //Populate the form fields from the nav params

  populateForm(){

    this.editPlayerForm.setValue({
      name: this.paramData.name,
      dob: this.paramData.dob,
      parentName: this.paramData.parentName,
      parentNo: this.paramData.parentPhoneNo
    })

    
    this.playerID = this.paramData.id;

  }


  //This editPlayer function is called when you click "OK" in the 
  //confirmEdit popup function below this

  editPlayer(){

    let player:Player = 
    {
      name: this.editPlayerForm.value.name, 
      dob: this.editPlayerForm.value.dob,
      parentName: this.editPlayerForm.value.parentName, 
      parentPhoneNo: this.editPlayerForm.value.parentNo
    };

    console.log('Editing player with');
    console.log(player);

    this.playerService.editPlayer(this.playerID, player)

  }

  showConfirmEdit() {
    const confirm = this.alertCtrl.create({
      title: 'Player edited',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.editPlayer();
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

  //This popup appears when you click the delete button
  //The delete function is called in the player service
  // once you agree to delete

  showConfirmDelete() {
    const confirm = this.alertCtrl.create({
      cssClass: 'confirmDelete',
      title: 'Delete player',
      message: 'Do you want to remove this player from the database?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.playerService.deletePlayer(this.playerID);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

}
