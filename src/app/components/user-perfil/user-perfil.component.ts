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

// si es admin y quiere editar a otro user de esta manera solo se podria editar el mismo 
// var -> id perfil = ver si se puede cojer con un parametro de url o algo asi
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

    /// si es un user admin y edita el perfil de otros el perfil a editar sería el de user.id y si es el de cada uno en verdad tmb por que en user 
    // se recogen los datos de ese usuario que se ha pasado en getUser();
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
