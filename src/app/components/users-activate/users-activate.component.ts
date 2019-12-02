import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
// for scroll top
import {AppComponent} from '../../app.component';

@Component({
  selector: 'users-activate',
  templateUrl: './users-activate.component.html',
   providers: [UserService]
})
export class UsersActivateComponent implements DoCheck {
	public title: string = 'Activar Usuarios';
	public token;
	public identity;
	public users: any[];


  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
       private _userService: UserService,
  	) { 
     
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity(); 

  			this.getUsersAll();
  		}

    getUsersAll(){
      this._userService.getUsers(this.token,'search=0&field=active').subscribe(
              response =>{
                if (response.status == 'success'){
                  
                  this.users = response.users.data;
  
                }
              },
              error =>{
                 let code = error.error.code;
                  this._router.navigate(['error',code]);
              }
            );
    }
   ngOnInit() {

  }
   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  ActivateUser(id,valor){
      this._userService.setActive(this.token,id,valor).subscribe(
              response =>{
                  this.getUsersAll();
              },
              error =>{
                  console.log(<any>error);
              }
            );
  }
}