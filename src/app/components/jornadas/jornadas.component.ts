import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css'],
  providers: [UserService, JourneyService]
})
export class JornadasComponent implements DoCheck {
	public url = 'http://webtime.com.devel';
	public title: string = 'Mis Jornadas';
	public token;
	public identity;
	public journeys: any[];

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();

  			this._journeyService.getMyJourneys(this.identity.sub,this.token).subscribe(
  						response =>{
  							if (response.status == 'success'){
  								//console.log("MyJourneys response ->"+response);
  								this.journeys = response.journeys;
  							}
  						},
  						error =>{
  							console.log(<any>error);
  						}
  					);
  	}

  ngOnInit() {
  		console.log("jornada component de user "+this.identity.name+" cargadas ok");
  }

   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }



//  A ESTO NO LE ECHES CUENTA !!!!!!!!!!!!!!!!!!
  // getImage()

  getImage(){
    this._journeyService.getImage('f8-1561385730.png',this.token).subscribe(
          response =>{
              return response;
          },
          error =>{
           console.log(<any>error);
          }
      );
  }

}
