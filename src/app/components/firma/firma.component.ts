import {Component,DoCheck, ViewChild,OnInit,AfterViewInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
//import { User} from '../../models/user';
import { Journey} from '../../models/journey';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

// signature pad
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
	selector: 'default',
	templateUrl : './firma.component.html',
	providers: [UserService, JourneyService]
})

export class FirmaComponent implements AfterViewInit{
	public title: string = 'Jornada sin iniciar';
	public jornada_activa : boolean;
	public firma : boolean;
	public _canvas;
	public token;
	public identity;
	public journey;
	public paused ;

	@ViewChild('signpad', {static: false}) signaturePad : SignaturePad;
 	private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
		    'minWidth': 5,
		    'canvasWidth': 340,
		    'canvasHeight': 300
		  	};

			constructor(
						private _route : ActivatedRoute,
						private _router : Router,
						private _userService: UserService,
						public _journeyService : JourneyService,

					){
						this.token = this._userService.getToken();
						this.journey = new Journey('nadadeimagen','nada','nada');
						//this.jsondata = this._journeyService.getData();
						//console.log(this.jsondata);
						//this.jornada_activa = this._journeyService.getActiveJourney();

						// chapuza pero va cuando se recarga la pag
						if (window.innerWidth > 700){
							this.signaturePadOptions.canvasWidth = 500;
						}
							
						this._journeyService.hasactiveJourney(this.token).subscribe(
							
							response => {
								if (response.status == 'success'){
									//this.status = response.status;
									// vaciar el form
									this.jornada_activa = response.journey;
									this.firma = response.journey;
									this.paused = response.paused;

									if (response.journey == true){
										this.title = "Jornada Iniciada";

										if (response.paused == true){
											this.title = "Jornada Pausada";
										}
									}
									
									console.log("hasactiveJourney _>"+response);
								}else{
									//this.status = 'error';
								}
							},
							error =>{
								console.log(<any>error);
							}
						);	



				}

			ngOnInit(){	
						
				}


		  	ngAfterViewInit() {	/// esto por lo menos el set no me lo hace aunque despues en el runtime si !!! 
			    // this.signaturePad is now available
			  /*  console.log("AfterViewInit ():");
			    console.log("signaturePad   --> "+this.signaturePad);
			    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
			    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API*/

		  }
		
		   clear(){
		  		this.signaturePad.clear();
		  }

		  undo(){
			  	 var data = this.signaturePad.toData();

	            if (data) {
	              data.pop(); // remove the last dot or line
	              this.signaturePad.fromData(data);
	            }
		  }

		  change_color(){
		  		 var r = Math.round(Math.random() * 255);
	            var g = Math.round(Math.random() * 255);
	            var b = Math.round(Math.random() * 255);
	            var color = "rgb(" + r + "," + g + "," + b +")";

	            this.signaturePad.set('penColor',color);
		  }


		 
		 // confirma la imagen la saca del canvas y guarda la firma en en el campo hidden
		clickconfirmar(){

			//let canvas = document.getElementById('ficharcanvas') as HTMLCanvasElement;
			// se puede hacer con una propiedad de este componente o de firma o tal 
			let imagen = this.signaturePad.toDataURL("image/png");
	         $("#imagenpng").val(imagen);

	         //document.getElementById('imagenpng').value = imagen;

	  		this.firma = true;
	  		this.title = "Firma Guardada . Inicie la jornada"
		}

		// muestra el modal de InitJornada
		initModal(){
					 function getLocation() {
		                      if (navigator.geolocation) {
		                     	navigator.geolocation.getCurrentPosition(putPosition);
		                      } else {
		                        alert("La Geolocalización no está disponible en este navegador");
		                        // hacer la peticion tmb con unos valores nodisponible o algo así!!!
		                      }
		                    }

		         function putPosition(position) {
		                    
		                   
		                      // mandar por post el form de iniciar
		                     // $('#formini').submit();

		              /*  let imagevalue = $("#imagenpng").val();
		            	let datajson = {"image":imagevalue, "lat": position.coords.latitude,
		            	"lon":position.coords.longitude};
						
						/*if (localStorage.getItem("datajson") != null){
		            		localStorage.removeItem("datajson");
		            	}else{
		            		localStorage.setItem("datajson",JSON.stringify(datajson));
		            	}

						localStorage.setItem("datajson",JSON.stringify(datajson));*/
		            	
		            	//localStorage.setItem("datajson",JSON.stringify(datajson))

		            	   $('#latini').val(position.coords.latitude);
		                    $('#lonini').val(position.coords.longitude);
		            	
		          }

		          	getLocation();

		}
	// Comienza la jornada desde rl modal de InitJornada
	iniciar_jornada(){ 

		
         /* 	let datajson = {"image":$("#imagenpng").val(), "lat": $("#latini").val(),
            	"lon":$("#lonini").val()};
          	//let data = localStorage.getItem("datajson");
          	 this.jsondata = this._journeyService.getData();
          	console.log("jsondata =>> "+this.jsondata);*/

          	this.journey.image = $('#imagenpng').val();
          	this.journey.lat = $('#latini').val();
          	this.journey.lon =$('#lonini').val();

          	this._journeyService.init_journey(JSON.stringify(this.journey),this.token).subscribe
				(	
						response =>{
							console.log(response);
							// jornada == true
							this.jornada_activa = true;
							this.title = "Jornada Iniciada";
						},
						error =>{
							console.log(<any>error);
						}

					);

	}
	// Muestra el modal de EndJornada
	endModal(){
				 function cogerLocation() {
		                      if (navigator.geolocation) {
		                     	navigator.geolocation.getCurrentPosition(ponerPosition);
		                      } else {
		                        alert("La Geolocalización no está disponible en este navegador");
		                        // hacer la peticion tmb con unos valores nodisponible o algo así!!!
		                      }
		                    }

		         function ponerPosition(position) {
		                   
		            	/*let datajson = {"lat": position.coords.latitude,
		            	"lon":position.coords.longitude};

		            	localStorage.setItem("datajson",JSON.stringify(datajson));
		            	console.log(datajson);*/

		            	  $('#latend').val(position.coords.latitude);
		                    $('#lonend').val(position.coords.longitude);
		          }

		          	cogerLocation();
	}
	// Finaliza la jornada desde el modal de EndJornada
	finalizar_jornada(){		
          //	let datajson = localStorage.getItem("datajson");

          /* this.jsondata = this._journeyService.getData();
          	console.log("jsondata =>> "+this.jsondata);

          	let datajson = {"image":$("#imagenpng").val(), "lat": $("#latend").val(),
            	"lon":$("#lonend").val()};*/

            this.journey.image = 'no_image';
          	this.journey.lat = $('#latend').val();
          	this.journey.lon = $('#lonend').val();

          	this._journeyService.end_journey(JSON.stringify(this.journey),this.token).subscribe
				(	
						response =>{
							console.log(response);
							// jornada == true
							this.jornada_activa = false;
							this.title = "Jornada sin Iniciar";
							this.firma = false;
						},
						error =>{
							console.log(<any>error);
						}

					);

	}


	// Pausa la jornada 
	Pause_journey(){
		this._journeyService.pause_journey(this.token).subscribe
				(	
						response =>{
							console.log(response);
							// jornada == true
							this.jornada_activa = true;
							this.title = "Jornada Pausada";
							this.paused = true;
						},
						error =>{
							console.log(<any>error);
						}

					);
	}
	Continue_journey(){
		this._journeyService.continue_journey(this.token).subscribe
				(	
						response =>{
							console.log(response);
							// jornada == true
							this.jornada_activa = true;
							this.title = "Jornada Iniciada";
							this.paused = false;
						},
						error =>{
							console.log(<any>error);
						}

					);
	}
	// Reanuda la jornada

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken();
  }
}