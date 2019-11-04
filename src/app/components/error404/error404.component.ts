import {Component, OnInit ,DoCheck} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';

import {Globals} from './../../globals'


@Component({
	selector: 'error404',
	templateUrl : './error404.component.html',
	providers: [UserService]
})

export class Error404Component implements OnInit{
	globals: Globals;
	public title = '';

	public user: User;
	public status : string;
	public token;
	public identity;

	public infoerror;

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
				this.infoerror = globals.infoerror;

				this.token = this._userService.getToken();
				this.identity = this._userService.getIdentity();

				this.title = 'Error 404';

	}

	ngOnInit(){
		
	}


	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	    this.token = this._userService.getToken();
  	}

  	/*setinfoerror(value){
    	this.globals.infoerror = value;
	}*/
}