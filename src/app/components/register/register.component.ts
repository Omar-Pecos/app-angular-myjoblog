import {Component, OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'register',
	templateUrl : './register.component.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit{
	public title: string = 'Regístrate';
	public user: User;
	public status : string;

	/*private _route : ActivatedRoute;
	private _router : Router;
	private _userService: UserService;*/

	constructor(
			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService
		){
		//this.title = ;
	}

	ngOnInit(){
		//console.log('register.component cargado correctamente !!');
		this.user =  new User(1, 'user','','','',0,'');
		//this._userService = new UserService();
	}

	onSubmit(form){
		////console.log(this.user);
		////console.log(this._userService.pruebas());

		this._userService.register(this.user).subscribe(
				response => {
					
					if (response.status == 'success'){
						this.status = response.status;

						// vaciar el form
						this.user =  new User(1, 'ROLE_USER','','','',0,'');
						form.reset();
					}
				},
				error =>{
					console.log(<any>error);
					this.status = 'error';
				}
			);
	}
}