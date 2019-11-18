import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';

/*import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';*/

@Injectable()

export class UserService {
	public url:string;
	public identity;
	public token;

	constructor( private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	/*ngOnInit(){
		//this.url = GLOBAL.url;
		this._http = new HttpClient();
	}*/

	pruebas(){
		return 'Hola mundo!';
	}

	register(user) : Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this._http.post(this.url+'register',params,{headers : headers});
	}

	signup(user ,gettoken = null) : Observable<any>{
		if (gettoken != null){
			user.gettoken = 'darmelodatos';
		}

		let json = JSON.stringify(user);
			let params = 'json='+json;

			let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
			return this._http.post(this.url+'login',params,{headers : headers});
	}

	getIdentity(){
		let identity = localStorage.getItem('identity');  // estaba antes con el json parse y no me iba bien

		if (identity != "undefined"){
			this.identity  = JSON.parse(identity);
		}else{
			this.identity = null;
		}

		return this.identity;
	}
	getToken(){
		let token = localStorage.getItem('token');

		if (token != "undefined"){
			this.token  = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	// Mas operaciones de usuarios editar,crear == registrar o casi , eliminar ....

	getUser(id,token) : Observable<any>{

			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'users/'+id,{headers : headers});
	}

	getUsers(token,getParams): Observable<any>{
		
		let urlparams = '';
		if (getParams != undefined){
			 urlparams = '?'+getParams;
		}
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'users'+urlparams,{headers : headers});
	}

	get2First(token): Observable<any> {
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_first_users',{headers : headers});
	}

	editUser(id,user,token) : Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
										.set('Authorization',this.token);
		return this._http.patch(this.url+'users/'+id,params,{headers : headers});
	}

	setActive(token,id,active) : Observable<any> {
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'set_active?id='+id+'&active='+active,{headers : headers});
	}

	makeAdmin(token,id) : Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'make_admin?id='+id,{headers : headers});
	}

	deleteUser(token,id) : Observable<any>{
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.delete(this.url+'users/'+id,{headers : headers});
	}


	/* ENDPOINT PARA EL LOG DE APLICACION */

	get_logs(token,getParams): Observable<any>{
		
		let urlparams = '';
		if (getParams != undefined){
			urlparams = '?'+getParams;
		}
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_logs'+urlparams,{headers : headers});
	}

	/*get_userlogs(token,getParams,id): Observable<any>{
		
		let urlparams = '';
		if (getParams != undefined){
			urlparams = '?'+getParams;
		}
			let headers = new HttpHeaders().set('Authorization',token);
			return this._http.get(this.url+'get_userlogs/'+id+urlparams,{headers : headers});
	}*/

}