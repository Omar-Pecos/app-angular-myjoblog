import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css'],
   providers: [UserService]
})
export class UserPerfilComponent implements OnInit {
	public title: string = 'Mi Perfil';
	public status:string;
	public errors :any[];
	public token;
	public identity;
	public user : User;

  constructor(	
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService: UserService,
  	) { 
  		
  		this.token = this._userService.getToken();
  		this.identity = this._userService.getIdentity();

  		this._userService.getUser(this.identity.sub,this.token).subscribe(
  				response =>{
  					if (response.status = 'success'){

  						this.user = response.user;
  						console.log(this.user);
  					}
  				},
  				error =>{
  					console.log(<any>error);
  				}
  			)
  }

  ngOnInit() {
  	console.log("Perfil de usuario cargado correctamente !! ");
  }
  ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  onSubmit(form){
  		this._userService.editUser(this.identity.sub,this.user,this.token).subscribe(
  				response =>{
  					if (response.status == 'success'){
  						this.status = 'success';
  					}
  				},
  				error =>{
  					this.status = 'error';
  					console.log(<any>error.error);
  					this.errors = error.error;
  				}
  			);
  }


}
