
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import AuthProvider = firebase.auth.AuthProvider;


@Injectable()
export class AuthServiceProvider {

  private user: firebase.User;
	
	//Using this boolean to determine if a user needs to sign in or not when editing a player
  isLoggedIn:boolean = false;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	//This sign in function is called from login.ts, credentials consist of email and password.

	signInWithEmail(credentials) {
        console.log('Sign in with email');
        this.isLoggedIn = true;
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
             credentials.password);
        
	}

}