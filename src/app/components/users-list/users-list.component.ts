import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';
// for scroll top
import {AppComponent} from '../../app.component';

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
  public myapp: AppComponent;

  public getParams:string = '';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';

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

                  //sacar el order 
                  if (response.order == 'asc'){
                      this.order = 'desc';
                  }
                  if (response.order == 'desc'){
                      this.order = 'asc';
                  }
                  this.order_now = response.order;
                  this.sort_by = response.sort_by;
                  
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

  //
  addgetParams(value, operacion){
    var result;
      console.log("getParams -- lo recibido ->" + value);

            //no se necesita cortar las url - lo que se pasa se añade a la url
           if (operacion == 'add'){
                  result = value;
              }
            //sse corta la url desde el ? y se añade
           if (operacion == 'slice'){
                  var n = value.indexOf("?");
                  result = value.slice(n+1,value.length); 
            }

            //se recogen los parametros de el form de busqueda
           if (operacion == 'search'){
                  var inputsearch = $("#inputsearch").val();
                  var selectsearch = $("#selectsearch").val();

                  result = 'search='+inputsearch+'&field='+selectsearch;
            }

            if (operacion == 'sorted_search'){
              var selectfield = $("#selectfield").val();
              var selectorder = $("#selectorder").val();

               result = this.getParams+'&sort_by='+selectfield+'&order='+selectorder;
            }

      console.log(" getParams --lo transformado ->" + result);

        if (operacion == 'search'){
             this.getParams = result;
             console.log("this.getParams _>"+this.getParams);
        }
        else{
          this.getParams = result;
          console.log("this.getParams _>"+this.getParams);
           
             // si es la pag sig o anteroir que haga ElScrollTop
                if (operacion == 'slice'){
                    AppComponent.myapp.scrollToTop();
                }

           this.getUsersAll();     
        }
    }

}
