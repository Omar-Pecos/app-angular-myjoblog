import { Component, OnInit} from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.css'],
    providers : [UserService]
})
export class GraficosAdminComponent implements OnInit {
	public title = 'Gráficos';
	public identity;
	public token;

  public users = [];
  public id = -1;
  public idselected = -1;
  public color = '0';

   constructor(
       private _route : ActivatedRoute,
        private _router : Router,
  		 private _userService : UserService
  	) { 
  			 this.identity = this._userService.getIdentity();
	   		this.token = this._userService.getToken(); 

       /* // verifica que sea admin sino pues pag de error
        if (this.identity.role == 'user'){
         this._router.navigate(['error',403]);
        }*/

        this._userService.getUsers(this.token,undefined).subscribe(
              response =>{

                if (response.status == 'success'){
                  let users = response.users.data;
                    for (let i = 0;i<users.length;i++){
                        if (users[i].active == 1){
                           this.users.push(users[i]);
                        }
                      }
                    this.id = this.users[2].id; // el pos 2 que sera el sig 

                    /*// coje los 2 primeros ids de los users 
                      this.oldusers = [];
                    for (let i=0;i<2;i++){
                      this.oldusers.push(this.users[i].id);
                    }*/

                }
              },
              error =>{
                console.log(<any>error);
                let code = <any>error.error.code;
                
                      if (this.identity.role == 'user'){
                         this._router.navigate(['error',code]);
                      }else{
                         this._router.navigate(['error',code]);
                      }
              }
            );
  }

  ngOnInit() {
  	
  }

   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  GenColor(){
      var color;
        var r;
        var g;
        var b;

        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);

        color = {'r':r,'g':g,'b':b};

        return color;
  }

  passID(){
        var color = this.GenColor();

        this.idselected = this.id;
        this.color = color;
        //console.log("COLOR DESDE EL PARENT ->"+this.color);
  }

}
