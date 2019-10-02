import {Component, OnInit ,DoCheck} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
	selector: 'default',
	templateUrl : './default.component.html',
	providers: [UserService]
})

export class DefaultComponent implements OnInit{
	public title: string = 'Inicio';
	public user: User;
	public status : string;
	public token;
	public identity;

	/*private _route : ActivatedRoute;
	private _router : Router;
	private _userService: UserService;*/

	constructor(
			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
		){
			this.token = this._userService.getToken();
	}

	ngOnInit(){
		console.log('2º ---> default.component cargado correctamente !!');
		this.user =  new User(1, 'ROLE_USER','','','','');
	}

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	    this.token = this._userService.getToken();
  }
}
