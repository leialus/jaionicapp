import { Component, AfterViewInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../app/user.service';
import { Global } from "../app/global";

import { MapasComponent } from '../pages/mapas.component';

declare const gapi: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements AfterViewInit   {

	public auth2:any;
	//public loginStatus: boolean = false;
	
	token: string = "";
	name: string = "";
	id: string = "";
	
	resposta : string = "nd";
	verificadoGet: boolean = false;
	verificado: boolean = false;
	

  constructor(	
				public navCtrl: NavController, 
				private userService: UserService) {

  }
  
	ngAfterViewInit() {
		 
		 gapi.load('auth2',  () => {
		  this.auth2 = gapi.auth2.init({
			client_id: '1019213811868-0ufbc2v6ti0cp3d3gp5593jd1kknv5ik.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
			scope: 'profile email'
		  });
		  this.attachSignin(document.getElementById('glogin'));
		});
		
		this._timerTick();
	}
	
	_timerTick() {
		
		
		if(Global.email != "" && this.verificadoGet == false){
			
			this.userService.getUserCadastrado(Global.id).subscribe(resposta => this.resposta = resposta);
			this.verificadoGet = true;
		}
		
		
		if (this.verificado == false && this.verificadoGet == true){
			if (this.resposta == "true"){
				this.resposta = "tem";
				
				this.verificado = true;
				
				this.navCtrl.setRoot(MapasComponent);
				//this.router.navigate(['mapa']);
			}else if(this.resposta == "false"){
				this.resposta = "N tem";
				
				this.userService.userCadastrar(this.name, Global.email, Global.id).subscribe((resposta: string) => {this.resposta = resposta; });

				
				this.verificado = true;
				
				
			}
			
		}
		
		if(this.resposta == "ok"){
			this.navCtrl.setRoot(MapasComponent);
			//this.router.navigate(['mapa']);
		}
			
		//this.router.navigate(['mapa']);
		setTimeout(() => this._timerTick(), 1000);
	}
	 

	public attachSignin(element : any){
		
		this.auth2.attachClickHandler(element, {},
		(loggedInUser : any) => {  
			
			let profile = loggedInUser.getBasicProfile();
			
			Global.token = loggedInUser.getAuthResponse().id_token;
			this.name = profile.getName();
			Global.id = profile.getId();
			Global.email = profile.getEmail();
			
			/*
			console.log('Token || ' + loggedInUser.getAuthResponse().id_token);
			console.log('ID: ' + profile.getId());
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail());
			*/
			
			//this.loginStatus = true;
			
			//console.log( loggedInUser);
			//this.router.navigate([this.redrect]);
			 //window.location.href='/hero';
			//this.router.recognize('hero').then((instruction) => this.router.navigateByInstruction(instruction));
		}, function (error : any) {
			// alert(JSON.stringify(error, undefined, 2));
			console.log( "erro");

			//this.loginStatus = false;
		});
	
	}
	
}
