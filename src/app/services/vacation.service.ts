import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()

export class VacationService {
	public url:string;
	public status : string;

	constructor( private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	pruebas(){
		console.log('Hola mundo desde el vacation service!');
	}

	get_events(token):Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_vacations',{headers : headers});
	}

	get_userevents(token,id):Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_uservacations/'+id,{headers : headers});
	}

	add_event(token,event) : Observable<any>{
		let json = JSON.stringify(event);
		let params = 'json='+json;

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
											.set('Authorization',token);
			return this._http.post(this.url+'add_vacation',params,{headers : headers});
	}

	edit_event(token,event) : Observable<any>{
		let json = JSON.stringify(event);
		let params = 'json='+json;

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
											.set('Authorization',token);
			return this._http.post(this.url+'edit_vacation',params,{headers : headers});
	}
	
	delete_event(token,id):Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'delete_vacation/'+id,{headers : headers});
	}

}