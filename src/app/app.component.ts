import { Component ,OnInit, DoCheck } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import * as $ from 'jquery';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'WebTime App';
    public identity;
  	public token;

  	constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
  			){}

  ngOnInit()
  {
	  /*  $(document).ready(function(){
	        $("body").click(function(){
	            alert("tus muelaas!");
	        });
	    });*/

	    console.log("1º -> APPComponent cargado !");
	}

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	    this.token = this._userService.getToken();
  }
}
