import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css'],
   providers: [UserService]
})
export class UserPerfilComponent implements OnInit {
	public title: string = 'Perfil';
	public status:string;
	public errors :any[];
	public token;
	public identity;
	public user : User;

  public theid;

  constructor(	
  		private _route : ActivatedRoute,
		private _router : Router,
		private _userService: UserService,
  	) { 
  		
  		this.token = this._userService.getToken();
  		this.identity = this._userService.getIdentity();

   this._route.params.subscribe(
      params=>{
          this.theid = +params['id'];
          this.GetUser(this.theid);

      });
  }

  GetUser(id){
      this._userService.getUser(id,this.token).subscribe(
          response =>{
            if (response.status = 'success'){

              this.user = response.user;
              console.log(this.user);
            }

             if (response.status == 'error'){
                 //redireccion
                  
              }
          },
          error =>{
            // se puede comentar 
            console.log("$$$ - Error - $$$ -> "+<any>error.error.code);

          // SI EL ERROR ES DE CODIGO 401 UNAUTORIZEHD O ALGUNO DE ESTOS PUES --> AL HOME
             if (error.error.code == 401){
                this._router.navigate(['home']);
              }
           
          }
        );
  }

  ngOnInit() {
  	console.log("Perfil de usuario cargado correctamente !! ");
  }
  ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  onSubmit(form){

    /// si es un user admin y edita el perfil de otros el perfil a editar sería el de user.id y si es el de cada uno en verdad tmb por que en user 
    // se recogen los datos de ese usuario que se ha pasado en getUser();
  		this._userService.editUser(this.theid,this.user,this.token).subscribe(
  				response =>{
  					if (response.status == 'success'){
  						  this.status = 'success';   
            }

              this.GetUser(this.theid);

              if (this.theid == this.identity.sub){
                 // en this.user esta la nueva info so create a new identity and set u¡in local storage and getIdentity();
                let identidad = {'sub':this.user.id,'dni':this.user.dni,"email":this.user.email,'name':this.user.name,"surname":this.user.surname,"role":this.user.role,"iat":this.identity.iat,"exp":this.identity.exp};
                console.log("NUEVA IDENTIDAD -->"+identidad.name);
                  
                  this.identity = identidad;
                  localStorage.setItem('identity',JSON.stringify(this.identity));
              }
             
  				},
  				error =>{
             this.GetUser(this.theid);

  					this.status = 'error';
  					console.log(<any>error.error);
  					this.errors = error.error;
  				}
  			);
  }


}
