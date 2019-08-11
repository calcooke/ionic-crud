import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditPlayerPage} from '../edit-player/edit-player';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginForm: FormGroup;
    loginError: string;
    paramData:any;

	constructor(
		private navCtrl: NavController,
        private auth: AuthServiceProvider,
        public navParams: NavParams,
		fb: FormBuilder ) 
	
		{

		//Binding the form fields and also setting their validators in the constructor.

		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
		
		
		//passing the player details along in the nav params
        this.paramData = navParams.data;
        console.log('Nav params passed to Login page');
        console.log(this.paramData);
  }
  
  login() {

		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		//Create an object from the login form data

		let credentials = {
			email: data.email,
			password: data.password
		};

		//Pass the detail to auth-service.ts. If it returns true, navigate to
		// the edit player page with the data, which are the details of the player
		// to edit retrieved from the list item

		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.push(EditPlayerPage, {
                    data: this.paramData
                }),
				error => this.loginError = error.message
			);
	}

}
