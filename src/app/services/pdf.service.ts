import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()

export class PdfService {
	public url:string;
	public status : string;

	constructor( private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	/*ngOnInit(){
		//this.url = GLOBAL.url;
		this._http = new HttpClient();
	}*/

	pruebas(){
		console.log('Hola mundo desde el pdf service!');
		console.log("%&%&%&%&%& -- Pdf trigered -- &%&%&%&%&&");
	}

	generate_pdf(token,ids,user_id,year):Observable<any>{
		var arrayids;
		// si ids es distinto de 'all'
		if (ids != 'all'){
			arrayids = JSON.stringify(ids);
		}
		else{
			arrayids = 'all';
		}

		let headers = new HttpHeaders().set('Authorization',token);
		
		if (arrayids != 'all')	
			return this._http.get(this.url+'pdf?id='+arrayids+'&user_id='+user_id,{headers : headers});
		else{
			return this._http.get(this.url+'pdf?id='+arrayids+'&user_id='+user_id+'&year='+year,{headers : headers});
		}
	}

	get_trigger(token):Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_trigger',{headers : headers});
	}

	set_trigger(token,quantity,id_journeys):Observable<any>{
		var arrayids = JSON.stringify(id_journeys);
		var data = '{"quantity": '+quantity+',"id_journeys": '+arrayids+' }';

		//console.log("json => "+JSON.stringify(data));
		let params = 'json='+data;

		console.log("params => "+params);

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
									   .set('Authorization',token);
		return this._http.post(this.url+'set_trigger',params, {headers : headers});
	}


	get_files(token,getParams,tipo):Observable<any>{
		
		var urlparams = '';
		if (getParams != undefined){
			var urlparams = '?'+getParams;
		}
		let params = 'type='+tipo;

			let headers = new HttpHeaders()
								.set('Content-Type','application/x-www-form-urlencoded')
								.set('Authorization',token);
			return this._http.post(this.url+'get_files'+urlparams,params,{headers : headers});
	}


	/*see_pdf(name):Observable<any>{
			//let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'see_file?name='+name);
	}*/

	delete_pdf(token,name):Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'delete_file?name='+name,{headers : headers});
	}
}