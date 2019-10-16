import {Component, OnInit ,DoCheck} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';
//import {PdfService} from '../../services/pdf.service';

import {Globals} from './../../globals'


@Component({
	selector: 'default',
	templateUrl : './default.component.html',
	providers: [UserService]
})

export class DefaultComponent implements OnInit{
	globals: Globals;

	public title: string = 'Inicio';
	public user: User;
	public status : string;
	public token;
	public identity;

	public infomsg;

	/*private _route : ActivatedRoute;
	private _router : Router;
	private _userService: UserService;*/

	constructor(
			globals: Globals,
			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			//private _pdfService : PdfService
		){
				this.globals = globals;
				this.infomsg = globals.infomsg;

				this.token = this._userService.getToken();
				this.identity = this._userService.getIdentity();

	}

	ngOnInit(){
		console.log('2º ---> default.component cargado correctamente !!');
		this.user =  new User(1, 'ROLE_USER','','','','');

		$(function() {
  			
			function getcolor(){
				var color;
				var r;
				var g;
				var b;

				r = Math.floor(Math.random() * 255);
				g = Math.floor(Math.random() * 180);
				b = Math.floor(Math.random() * 255);

				color = {'r':r,'g':g,'b':b,'a':0.7};

				return color;
			}
  			function setDivHomecolor(){
  				let cajas = $('.divhome');		
  				let i;

  				for (i=0;i<cajas.length;i++){
  					//var color = {'r':0,'g':128,'b':0,'a':0.5};
  					  var color = getcolor();
  					 // cajas.eq(i).css('background','linear-gradient(135deg, rgba(252,236,252,1) 0%,rgba('+(color.r+20)+','+(color.g + 20)+','+(color.b +20)+','+0.9+') 84%,rgba('+color.r+','+color.g+','+color.b+','+1+') 100%');
  					/* cajas.eq(i).css('background',
  					 	'linear-gradient(225deg, rgba(246,248,249,1) 0%,rgba(229,235,238,1) 30%,rgba(215,222,227,1) 31%,rgba(245,247,249,1) 100%)');*/
 					// esto al 0 del actual ! ! ---> rgba(246,248,249,1) 0%,
  					 	cajas.eq(i).css('background',
  					 	'linear-gradient(225deg,rgba('+color.r+','+color.g +','+color.b +','+color.a+')20%, rgba('+(color.r+40)+','+(color.g + 40)+','+(color.b +40)+','+color.a+') 31%,rgba(245,247,249,1) 100%)');

  				}
  			}

  			setDivHomecolor();
		});
	}

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	    this.token = this._userService.getToken();
  	}

  	setinfomsg(value){

    	this.globals.infomsg = value;
    	// igual no hace falta que cambie la local
 
	}
}
