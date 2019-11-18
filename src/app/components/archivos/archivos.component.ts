import {Component,DoCheck,OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';


//import { FileService } from './file.service';
//import * as fileSaver from 'file-saver';

import { UserService } from '../../services/user.service';
import {PdfService} from '../../services/pdf.service';

import {GLOBAL} from './../../services/global';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css'],
  providers: [UserService,PdfService]
})
export class ArchivosComponent implements OnInit{
	public url;
	public title: string = 'Mis Archivos';
	public token;
	public identity;
	public loading;
	public myapp: AppComponent;

	public files;
	public deletedexport;

public getParams:string = 'sort_by=datetime&order=desc';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';

  constructor(
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService : UserService,
		private _pdfService : PdfService
  	) { 
  			this.url = GLOBAL.baseUrl;
  			 this.identity = this._userService.getIdentity();
	  		 this.token = this._userService.getToken();
	  		 this.loading = true;
	  		 this.getMyFiles('auto');
	  	}

  ngOnInit() {
  }

  ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken();

  	}

  	getMyFiles(tipo){

  		 this._pdfService.get_files(this.token,this.getParams,tipo).subscribe(
						              response =>{ 

						    			this.files = response.files.data;


					                   let pageInfo = {'page':response.files.current_page,'lastpage':response.files.last_page,
					                  'previous':response.files.prev_page_url,'next':response.files.next_page_url,
					                  'from':response.files.from,'to':response.files.to,'total':response.files.total};
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

  	seePdf(name){

  				var url = this.url+'api/see_file?name='+name;
				//1_66190088M_pdf_16_10_19__10_25.pdf
  				console.log(url);

  				window.open(url,'_blank');
  
	}

	downloadPdf(name){
				var url =  this.url+'api/down_file?name='+name;
					//1_66190088M_pdf_16_10_19__10_25.pdf
				
				console.log(url);

  				window.open(url,'_self');

	}

	deletePdf(name){
		// call service delete 
		this._pdfService.delete_pdf(this.token,name).subscribe(
						              response =>{ 
						    			console.log(<any>response);

						    			this.deletedexport = response.deletedexport;


						    			this.getMyFiles('auto');

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

	          this.getMyFiles('auto');
       
    }
}
