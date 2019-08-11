import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {Player} from '../../app/player';

import { AngularFirestore} from 'angularfire2/firestore';



//IF YOU GET A TYPESCRIPT ERROR: ';' expected.
//COMMENT ONE OBSERVABLE AND UNCOMMENT THE OTHER ¯\_(ツ)_/¯

//https://github.com/ReactiveX/rxjs/issues/4512

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/map';



@Injectable()
export class PlayerServiceProvider {

  public players : any;
  public items: Observable<any[]>;

  constructor(public http: HttpClient, public fireStoreDb:AngularFirestore) {
   

    // this.fireStoreDb.collection('players').get().subscribe( (querySnapshot) => {
    //   querySnapshot.forEach( (doc) => {
    //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //   });
    // });


  }

  ngOnInit() {
    
  
  }

  
  getPlayers(){

    return this.fireStoreDb.collection("players").snapshotChanges();

  }

  addPlayer(player){
    this.fireStoreDb.collection("players").add(player);
  }

  editPlayer(id, player) {
    this.fireStoreDb.doc("players/"+id).update(player);
  }

  deletePlayer(id){
    this.fireStoreDb.doc("players/"+id).delete();
  }

}
