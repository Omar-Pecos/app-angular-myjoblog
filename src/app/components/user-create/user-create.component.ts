import {Component, OnInit} from '@angular/core';
import { Router , ActivatedRoute ,Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'create',
	templateUrl : './user-create.component.html',
	providers: [UserService]
})

export class UserCreateComponent implements OnInit{
	public title: string = 'Crear Usuario';
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
		console.log('Create.component cargado correctamente !!');
		this.user =  new User(99, 'user','','','','');
		//this._userService = new UserService();
	}

	onSubmit(form){
		
		//console.log(this.user);
		//console.log(this._userService.pruebas());

		this._userService.register(this.user).subscribe(
				response => {
					
					if (response.status == 'success'){
						this.status = response.status;

						// vaciar el form
						this.user =  new User(99, 'user','','','','');
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