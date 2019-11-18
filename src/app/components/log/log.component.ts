import {Component,DoCheck,OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';


//import { FileService } from './file.service';
//import * as fileSaver from 'file-saver';

import { UserService } from '../../services/user.service';
import {PdfService} from '../../services/pdf.service';

import {GLOBAL} from './../../services/global';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  providers: [UserService]
})
export class LogComponent implements OnInit{
	public url;
	public title: string = 'Log de la Aplicación';
	public token;
	public identity;
	public loading;
	public myapp: AppComponent;

	public logs;

public getParams:string = 'sort_by=id&order=desc';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';

  constructor(
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService : UserService
  	) { 
  			this.url = GLOBAL.baseUrl;
  			 this.identity = this._userService.getIdentity();
	  		 this.token = this._userService.getToken();
	  		 this.loading = true;
	  		 this.getLogs();
	  	}

  ngOnInit() {
  }

  ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken();

  	}

  	getLogs(){

  		 this._userService.get_logs(this.token,this.getParams).subscribe(
						              response =>{ 

						    			this.logs = response.logs.data;


					                   let pageInfo = {'page':response.logs.current_page,'lastpage':response.logs.last_page,
					                  'previous':response.logs.prev_page_url,'next':response.logs.next_page_url,
					                  'from':response.logs.from,'to':response.logs.to,'total':response.logs.total};
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

					                  this.loading = false;

						              },
						              error =>{
						                console.log(<any>error);
						              }
				            );
  		}


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

	     	 console.log(" getParams --lo transformado ->" + result);

	          this.getParams = result;
	          console.log("this.getParams _>"+this.getParams);
	           
	             // si es la pag sig o anteroir que haga ElScrollTop
	                if (operacion == 'slice'){
	                    AppComponent.myapp.scrollToTop();
	                }

	          this.getLogs();
       
    }
}
