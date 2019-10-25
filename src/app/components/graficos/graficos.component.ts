import { Component, OnInit} from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
  providers : [UserService]
})
export class GraficosComponent implements OnInit{
	public title = 'Mis Gráficos';
	public identity;
	public token;

  constructor(
  		 private _userService : UserService
  	) { 
  			 this.identity = this._userService.getIdentity();
	   		this.token = this._userService.getToken(); 
  }

  ngOnInit() {
  }

   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

}
