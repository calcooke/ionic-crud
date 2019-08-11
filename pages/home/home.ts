import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import {PlayerServiceProvider} from '../../providers/player-service/player-service';

import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {EditPlayerPage} from '../edit-player/edit-player';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  //If this is set to true from the auth-service, a user wont have to login when editing
  isLoggedIn:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public playerService: PlayerServiceProvider, private auth:AuthServiceProvider) {

  }

  playerDb = [];

  ngOnInit(){

    
    this.playerService.getPlayers()
      .subscribe(docs => {
      this.playerDb =  docs.map(item => {
        
        return {
          id:  item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });    
      
      //The loggedin value is determined from the auth-service
      this.isLoggedIn = this.auth.isLoggedIn;
      console.log('Logged in??');
      console.log(this.isLoggedIn);
    });

  };

  //When clicking to edit a player, that player's details are passed along in the navParams
  // to the edit player page to populate the form fields there.

  editPlayer(player){
    this.navCtrl.push(EditPlayerPage,{
      data: player
    });
  }

}
