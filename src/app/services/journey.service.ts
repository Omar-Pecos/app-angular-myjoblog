import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()

export class JourneyService {
	public url:string;
	public status : string;
	public jornada;
	public jsondata;

	constructor( private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	/*ngOnInit(){
		//this.url = GLOBAL.url;
		this._http = new HttpClient();
	}*/

	pruebas(){
		console.log('Hola mundo desde el journey service!');
	}

	hasactiveJourney(token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'has_journey',{headers : headers});
	}

	init_journey(data,token):Observable<any>{

		//let json = JSON.stringify(data);
		let params = 'json='+data;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
									   .set('Authorization',token);
		return this._http.post(this.url+'init_journey',params, {headers : headers});
	}

	pause_journey(token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'pause_journey',{headers : headers});
	}

	continue_journey(token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'continue_journey',{headers : headers});
	}

	end_journey(data,token):Observable<any>{

		let params = 'json='+data;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
									   .set('Authorization',token);
		return this._http.post(this.url+'end_journey',params, {headers : headers});

	}

	getMyJourneys(id,token,getParams):Observable<any>{
		var urlparams = '';
		if (getParams != undefined){
			var urlparams = '?'+getParams;
		}

		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'journeys/'+id+urlparams,{headers : headers});
	}

	getAllJourneys(token,getParams):Observable<any>{
		var urlparams = '';
		if (getParams != undefined){
			var urlparams = '?'+getParams;
		}

		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'journeys'+urlparams,{headers : headers});
	}

	// dame getImage 
	getImage(name,token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization',token);
		return this._http.get(this.url+'getimage/'+name,{headers : headers});
	}

	getData(){
		let data = localStorage.getItem('datajson');

		if (data != "undefined"){
			this.jsondata = data;
		}else{
			this.jsondata = null;
		}

		return this.jsondata;
	}

	/*register(user) : Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.post(this.url+'register',params,{headers : headers});
	}
	*/
	/*getToken(){
		let token = localStorage.getItem('token');

		if (token != "undefined"){
			this.token  = token;
		}else{
			this.token = null;
		}

		return this.token;
	}*/

}