import {Component, OnInit ,DoCheck} from '@angular/core';
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
	public token;
	public identity;

	/*private _route : ActivatedRoute;
	private _router : Router;
	private _userService: UserService;*/

	constructor(
			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService
		){
		this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity(); 

			 // verifica que sea admin sino pues pag de error
        if (this.identity.role == 'user'){
         this._router.navigate(['error',403]);
        }
	}

	ngOnInit(){
		//console.log('Create.component cargado correctamente !!');
		this.user =  new User(99, 'user','','','',0,'');
		//this._userService = new UserService();
	}
	ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

	onSubmit(form){
		
		////console.log(this.user);
		////console.log(this._userService.pruebas());

		this._userService.register(this.user).subscribe(
				response => {
					
					if (response.status == 'success'){
						this.status = response.status;

						// vaciar el form
						this.user =  new User(99, 'user','','','',0,'');
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