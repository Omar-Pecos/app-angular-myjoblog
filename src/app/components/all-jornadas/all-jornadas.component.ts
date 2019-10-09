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

  			this.getJourneysofAll();

  	 }

  ngOnInit() {

  }
   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  getJourneysofAll(){
    this._journeyService.getAllJourneys(this.token,this.getParams).subscribe(
              response =>{
                if (response.status == 'success'){
                  //console.log("MyJourneys response ->"+response);
                  this.journeys = response.journeys.data;

                  let pageInfo = {'page':response.journeys.current_page,'lastpage':response.journeys.last_page,
                  'previous':response.journeys.prev_page_url,'next':response.journeys.next_page_url,
                  'from':response.journeys.from,'to':response.journeys.to,'total':response.journeys.total};
                  this.pageInfo = pageInfo;

                 // console.log("Journeys --->"+JSON.stringify(this.journeys));
                  console.log("pageInfo --->"+JSON.stringify(this.pageInfo));
                }
              },
              error =>{
                console.log(<any>error);
              }
            );
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

     this.getJourneysofAll();
  }

}
