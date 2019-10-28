import { Component, OnInit} from '@angular/core';
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

  public users;
  public id = -1;
  public idselected = -1;
  public color = '0';

   constructor(
  		 private _userService : UserService
  	) { 
  			 this.identity = this._userService.getIdentity();
	   		this.token = this._userService.getToken(); 

        this._userService.getUsers(this.token,undefined).subscribe(
              response =>{
                if (response.status == 'success'){
                    this.users = response.users.data;
                    console.log(this.users);

                    this.id = this.users[0].id;

                    /*// coje los 2 primeros ids de los users 
                      this.oldusers = [];
                    for (let i=0;i<2;i++){
                      this.oldusers.push(this.users[i].id);
                    }*/

                }
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
        console.log("COLOR DESDE EL PARENT ->"+this.color);
  }

}
