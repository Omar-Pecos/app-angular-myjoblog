import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';


@Component({
  selector: 'app-all-jornadas',
  templateUrl: './all-jornadas.component.html',
  styleUrls: ['./all-jornadas.component.css'],
   providers: [UserService, JourneyService]
})
export class AllJornadasComponent implements DoCheck {
	public url = 'http://webtime.com.devel';
	public title: string = 'Jornadas de todos los trabajadores';
	public token;
	public identity;
	public journeys: any[];
	public selecteduser:string = 'Identificador';

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();

  			this._journeyService.getAllJourneys(this.token).subscribe(
  						response =>{
  							if (response.status == 'success'){
  								//console.log("MyJourneys response ->"+response);
  								this.journeys = response.journeys;
  								console.log(JSON.stringify(this.journeys));
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
