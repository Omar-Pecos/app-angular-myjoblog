import { Component ,OnInit,Inject,HostListener, DoCheck } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import * as $ from 'jquery';
import {UserService} from './services/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{

    static myapp;

    public title = 'WebTime App';
    public windowScrolled: boolean;
    public identity;
  	public token;

  	constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,

      @Inject(DOCUMENT) private document: Document
  			){}

    @HostListener("window:scroll", [])
    
    /// Funciones de ScrollTop
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();

        console.log("Se ha hecho el scrollTop");
    }

  ngOnInit()
  {
	  /*  $(document).ready(function(){
	        $("body").click(function(){
	            alert("tus muelaas!");
	        });
	    });*/

	    console.log("1º -> APPComponent cargado !");
      AppComponent.myapp = this;
	}

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	    this.token = this._userService.getToken();
  }
}
