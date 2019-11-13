import { Component, OnInit ,DoCheck } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserService } from './../../services/user.service';
import { VacationService } from './../../services/vacation.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers :[UserService,VacationService]
})
export class CalendarioComponent implements OnInit {
public title = 'Calendario de Vacaciones';
public token;
public identity;
public loading;

public users = [];
public userselected = 1;
public eventselected;
public calendarPlugins = [dayGridPlugin]; // important!
public events;
public userevents = [];
public selectedDate1;
public selectedDate2;
public seeDatePicker = 0;
public operacion;
public festivo = false;
public titleevent;

  constructor(
  			private datePipe: DatePipe,
  			private _userService : UserService,
  			private _vacationService : VacationService
  	) { 

  		this.token = this._userService.getToken(); 

  		this.loading = true;

  		 this._userService.getUsers(this.token,undefined).subscribe(
              response =>{

                  let users = response.users.data;

                  this.users = [{id: 0,name: 'Festivos ',surname : 'personales'}];

                  for (let i=0;i<users.length;i++){
                  	if (users[i].active == 1){
                  		this.users.push(users[i]);
                  	}
                  }
                   
		                  this.getEvents();
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
  
  /* La pipe de date */
  transformDate(date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

/* Retorna eventos */
  getEvents(){
     this._vacationService.get_events(this.token).subscribe(
                  response =>{
                    this.events = response.events;
                    this.loading = false;

                    this.selectedDate1 = null;
                    this.selectedDate2 = null;
                    this.festivo = false;
                  },
                  error =>{
                    console.log(<any>error);
                  }
              );
  }

   cargarEventos(userid){
      this._vacationService.get_userevents(this.token,userid).subscribe(
                  response =>{
                    this.userevents = response.events;
                  },
                  error =>{
                    console.log(<any>error);
                  }
              );
  }
/* ADD , EDIT , DELETE */
  addEvent(){

  let user_data;  
  let ranColor;
  let newevent;

    if (this.festivo == false){

        		for (let i = 0;i<this.users.length;i++){
        			if (this.users[i].id == this.userselected){
        				user_data = this.users[i];
        			}
        		}

        		 ranColor = this.GenColor();
        		newevent = { user_id: user_data.id, title: user_data.id+' - '+user_data.name+' '+user_data.surname, start: this.transformDate(this.selectedDate1),end: this.transformDate(this.selectedDate2),color:ranColor };
	  	}
      else{
             ranColor = 'rgb(0,0,0)';
             newevent = { user_id: 0, title: this.titleevent, start: this.transformDate(this.selectedDate1),end: this.transformDate(this.selectedDate2),color:ranColor };
      }

      /* en calendar local 
	  	this.events = this.events.concat( 
	      	newevent
	    ); */

	    this.loading = true;
	    /* ó call to service*/
	    this._vacationService.add_event(this.token,newevent).subscribe(
			  					response =>{
			  						 this.seeDatePicker = 0;
	   								 //this.userselected = 1;

	   								 this.getEvents();
			  						
			  					},
			  					error =>{
			  						console.log(<any>error);
			  					}
		  				);

  }

 

  editEvent(idevent){
  		let editedevent = { event_id: idevent, start: this.transformDate(this.selectedDate1),end: this.transformDate(this.selectedDate2)};

  		this.loading = true;
  		 this._vacationService.edit_event(this.token,editedevent).subscribe(
			  					response =>{
			  						
	   								 this.getEvents();
                     this.cargarEventos(this.userselected);

                     this.seeDatePicker = 0;
                     //this.userselected = 1;
			  					},
			  					error =>{
			  						console.log(<any>error);
			  					}
		  				);
  }

  deleteEvent(idevent){
   
       this.loading = true;
         this._vacationService.delete_event(this.token,idevent).subscribe(
                    response =>{
                       
                       this.getEvents();
                       this.cargarEventos(this.userselected);

                       this.seeDatePicker = 0;
                      // this.userselected = 1; 
                    },
                    error =>{
                      console.log(<any>error);
                    }
                );
  }
/* Metodos auxiliares */
  verDatePicker(num){
  		this.seeDatePicker = num;
  }
  setOperacion(nombreOp){
  		this.operacion = nombreOp;
  }
   
   GenColor(){
      var color;
        var r;
        var g;
        var b;

        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);

       // color = {'r':r,'g':g,'b':b};
        color = 'rgb('+r+','+g+','+b+')';

        return color;
  }

 



}
