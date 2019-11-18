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
	public year;

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

				this.year = new Date().getFullYear();

	}


	ngOnInit(){
		console.log('2º ---> default.component cargado correctamente !!');
		this.user =  new User(1, 'user','','','',0,'');

		$(function() {
  			
			function getcolor(){
				var color;
				var r;
				var g;
				var b;

				r = Math.floor(Math.random() * 255);
				g = Math.floor(Math.random() * 255);
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
  					
  					 /*	cajas.eq(i).css('background',
  					 	'linear-gradient(225deg,rgba('+color.r+','+color.g +','+color.b +','+color.a+')10%, rgba('+(color.r+40)+','+(color.g + 40)+','+(color.b +40)+','+color.a+') 31%,rgba(245,247,249,0.7) 50%,rgba('+(color.r+40)+','+(color.g + 40)+','+(color.b +40)+','+color.a+') 69%,rgba('+color.r+','+color.g +','+color.b +','+color.a+')90%)');
					*/
					cajas.eq(i).css('background',
  					 	'linear-gradient(225deg,rgba('+color.r+','+color.g +','+color.b +','+color.a+')0%,rgba(245,247,249,0.7) 50%,rgba('+color.r+','+color.g +','+color.b +','+color.a+') 100%)');
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
