import {Component,DoCheck,OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';


//import { FileService } from './file.service';
//import * as fileSaver from 'file-saver';

import { UserService } from '../../services/user.service';
import {PdfService} from '../../services/pdf.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css'],
  providers: [UserService,PdfService]
})
export class ArchivosComponent implements OnInit ,DoCheck{

	public title: string = 'Mis Archivos';
	public token;
	public identity;

	public files;
	public deletedexport;

  constructor(
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService : UserService,
		private _pdfService : PdfService
  	) { 
  			 this.identity = this._userService.getIdentity();
	  		 this.token = this._userService.getToken();

	  		 this._pdfService.get_files(this.token).subscribe(
						              response =>{ 
						    			console.log(<any>response);

						    			this.files = response.files;

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

  	seePdf(name){

  			var url = 'http://webtime.com.devel/api/see_file?name='+name;
			//1_66190088M_pdf_16_10_19__10_25.pdf
  				console.log(url);

  				window.open(url,'_blank');
  
	}

	downloadPdf(name){
		var url = 'http://webtime.com.devel/api/down_file?name='+name;
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


						    							// then call myfiles ()
										    			this._pdfService.get_files(this.token).subscribe(
										              response =>{ 
										    			console.log(<any>response);

										    			this.files = response.files;

										              },
										              error =>{
										                console.log(<any>error);
										              }
								            );

						              },
						              error =>{
						                console.log(<any>error);
						              }
				            );

			
	}
}
