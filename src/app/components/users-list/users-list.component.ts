import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
   providers: [UserService, JourneyService]
})
export class UsersListComponent implements DoCheck {
	public url = 'http://webtime.com.devel';
	public title: string = 'Usuarios';
	public token;
	public identity;
	public users: any[];

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity(); 

  			this._userService.getUsers(this.token).subscribe(
  						response =>{
  							if (response.status == 'success'){
  								this.users = response.users;
  								console.log(JSON.stringify(this.users));
  							}
  						},
  						error =>{
  							console.log(<any>error);
  						}
  					);
  		}

   ngOnInit() {

  }
   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

}
