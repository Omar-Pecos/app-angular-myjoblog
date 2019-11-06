import {Component,DoCheck,OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';

import { UserService } from '../../services/user.service';
import {PdfService} from '../../services/pdf.service';

import {AppComponent} from '../../app.component';
import {GLOBAL} from './../../services/global';
import {Globals} from './../../globals'

@Component({
  selector: 'app-archivos-admin',
  templateUrl: './archivos-admin.component.html',
  providers: [UserService,PdfService]
})
export class ArchivosAdminComponent implements OnInit{
	globals: Globals;
	public url;

	public title: string = 'Generar Archivos';
	public token;
	public identity;
	public loading;
	public myapp: AppComponent;

	public files;
	public deletedexport;

	public selecteduser;
	public year;
	public ListUsers;
	public infomsg;

public getParams:string = '';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';

  constructor(
  		globals: Globals,
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService : UserService,
		private _pdfService : PdfService
  	) { 			
  					this.url = GLOBAL.baseUrl;
  					this.globals = globals;
					this.infomsg = globals.infomsg;

		  			 this.identity = this._userService.getIdentity();
			  		 this.token = this._userService.getToken();
			  		 this.loading = true;

			  		  this._userService.getUsers(this.token,this.getParams).subscribe(
		              response =>{

		                  this.ListUsers = response.users.data;

		                   this.getMyFiles('generated');
		              },
		              error =>{
		                  console.log(<any>error);
		              }
          )
	  		
  }

  ngOnInit() {
  }

  ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken();

  	}

  	GenPdf(value){
  		let ids = 'all';
  		let identificador;

  		if (value == 'id'){
  			identificador = this.selecteduser;
  		}else{
  			identificador = 0;
  		}

  		console.log("<<<<<<>>>>>>>>trigered el PDF <<<<<<<<>>>>>>>");
					/* TRIGGER EL PDF */ 
						this._pdfService.generate_pdf(this.token,ids,identificador,this.year).subscribe(
				              response =>{ 
				    				console.log(<any>response);

				    				this.infomsg = "Se ha terminado de generar el Pdf que solicitaste ";
				    				this.globals.infomsg = this.infomsg;

				    				// Volver a cargar de nuevo la lista de pdfs
				    				this.getMyFiles('generated');
				              },
				              error =>{
				                console.log(<any>error);
				              }
		            );	
  	}

  	// call to gen for All 

  	getMyFiles(tipo){
  		 this._pdfService.get_files(this.token,this.getParams,tipo).subscribe(
						              response =>{ 
						    			console.log(<any>response);

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
		var url = this.url+'api/down_file?name='+name;
			//1_66190088M_pdf_16_10_19__10_25.pdf
				
				console.log(url);

  				window.open(url,'_self');

	}

	deletePdf(name){
		// call service delete 
		this._pdfService.delete_pdf(this.token,name).subscribe(
						              response =>{ 
						    			//console.log(<any>response);

						    			this.deletedexport = response.deletedexport;


						    				this.getMyFiles('generated');
								           

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

	          this.getMyFiles('generated');
       
    }

    setinfomsg(value){

    	this.globals.infomsg = value;
    	// igual no hace falta que cambie la local
 
	}
}