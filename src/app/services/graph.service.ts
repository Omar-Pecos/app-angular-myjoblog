import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()

export class GraphService {
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
		console.log('Hola mundo desde el graph service!');
	}

	data_line_pormes(token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'data_line',{headers : headers});
	}

	data_donut_porcentaje(token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'data_donut_porcentage',{headers : headers});
	}


}