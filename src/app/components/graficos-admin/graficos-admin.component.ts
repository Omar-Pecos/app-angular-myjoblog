import { Component, OnInit} from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.css'],
    providers : [UserService]
})
export class GraficosAdminComponent implements OnInit {
	public title = 'Gráficos';
	public identity;
	public token;

  public users;
  public id = -1;
  public idselected = -1;

   constructor(
  		 private _userService : UserService
  	) { 
  			 this.identity = this._userService.getIdentity();
	   		this.token = this._userService.getToken(); 

        this._userService.getUsers(this.token,undefined).subscribe(
              response =>{
                if (response.status == 'success'){
                    this.users = response.users.data;
                    console.log(this.users);

                    this.id = this.users[0].id;
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

  passID(){
        // set var global ; idselected = this.idselected;
        this.idselected = this.id;
        console.log(this.idselected);
  }

}
