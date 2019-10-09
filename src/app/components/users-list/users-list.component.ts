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

  			this.getUsersAll();
  		}

    getUsersAll(){
      this._userService.getUsers(this.token,this.getParams).subscribe(
              response =>{
                if (response.status == 'success'){
                  this.users = response.users.data;
                  //console.log(JSON.stringify(this.users));

                   let pageInfo = {'page':response.users.current_page,'lastpage':response.users.last_page,
                  'previous':response.users.prev_page_url,'next':response.users.next_page_url,
                  'from':response.users.from,'to':response.users.to,'total':response.users.total};
                  this.pageInfo = pageInfo;
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

  addgetParams(value){

     /* if (this.getParams !=''){
        this.getParams = '';
      }*/
      console.log("getParams -- lo recibido ->" + value);

          var n = value.indexOf("?");
          var result = value.slice(n+1,value.length);

           console.log(" getParams --lo transformado ->" + result);
           this.getParams = result;

            this.getUsersAll();
  }

}
