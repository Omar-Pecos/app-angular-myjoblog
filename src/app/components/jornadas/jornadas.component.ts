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

  public getParams:string = '';
  public pageInfo:any;

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();

  			this.getJourneysofOne();
  	}

  getJourneysofOne(){
    this._journeyService.getMyJourneys(this.identity.sub,this.token,this.getParams).subscribe(
              response =>{
                if (response.status == 'success'){
                  //console.log("MyJourneys response ->"+response);
                  this.journeys = response.journeys.data;

                   let pageInfo = {'page':response.journeys.current_page,'lastpage':response.journeys.last_page,
                  'previous':response.journeys.prev_page_url,'next':response.journeys.next_page_url,
                  'from':response.journeys.from,'to':response.journeys.to,'total':response.journeys.total};
                  this.pageInfo = pageInfo;
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

  addgetParams(value){

     /* if (this.getParams !=''){
        this.getParams = '';
      }*/
      console.log("getParams -- lo recibido ->" + value);

          var n = value.indexOf("?");
          var result = value.slice(n+1,value.length);

           console.log(" getParams --lo transformado ->" + result);
           this.getParams = result;

            this.getJourneysofOne();
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
