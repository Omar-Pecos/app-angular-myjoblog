import {Component,DoCheck, ViewChild,OnInit,AfterViewInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';

import {Globals} from './../../globals'

//import { User} from '../../models/user';
import { Journey} from '../../models/journey';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';
import {PdfService} from '../../services/pdf.service';

// signature pad
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
	selector: 'default',
	templateUrl : './firma.component.html',
	providers: [UserService, JourneyService,PdfService]
})

export class FirmaComponent implements OnInit,DoCheck{
	globals: Globals;

	public title: string = 'Jornada sin iniciar';
	public jornada_activa : boolean;
	public firma : boolean;
	public token;
	public identity;
	public journey;
	public paused;

	public pdfjourneys: any[] = [];
	public quantity:number;
	public week = false;

	public infomsg;

	@ViewChild('signpad', {static: false}) signaturePad : SignaturePad;
	//set el canvas width
	canvaswidth = window.innerWidth > 700 ? 500 : 340;

 	public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
		    'minWidth': 5,
		    'canvasWidth': this.canvaswidth,
		    'canvasHeight': 300
		  	};

			constructor(
						globals: Globals,
						private _route : ActivatedRoute,
						private _router : Router,
						private _userService: UserService,
						public _journeyService : JourneyService,
						private _pdfService : PdfService

					){
						this.globals = globals;
						this.infomsg = globals.infomsg;

						this.token = this._userService.getToken();
						this.journey = new Journey('nadadeimagen','nada','nada');	

						this.HasActiveJourney(this.token);
				}

ngOnInit(){	

	/*// call to get triggerpdf DATA					
			*/
			 $(document).ready(function(){  
				console.log("document.ready");						 	
			}); 
			

			this.getTrigger(this.token);		
	}


	ngAfterViewInit() {	/// esto por lo menos el set no me lo hace aunque despues en el runtime si !!! 
    // this.signaturePad is now available
  /*  console.log("AfterViewInit ():");
    console.log("signaturePad   --> "+this.signaturePad);
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API*/

}

		HasActiveJourney(token){
			this._journeyService.hasactiveJourney(token).subscribe(
							
							response => {
								if (response.status == 'success'){
									//this.status = response.status;
									// vaciar el form
									this.jornada_activa = response.journey;
									this.firma = response.journey;
									this.paused = response.paused;

									if (response.journey == true){
										this.title = "Jornada Iniciada";

										// JORNADA INICIADA ALERT
										$(document).ready(function(){  
													   $("#giffirma").html('<img width="70" src="https://media.giphy.com/media/l1J9Nd2okdiIq7K9O/giphy.gif"><br><br>'+
														'<div class="alert alert-info"><h6><img src="https://img.icons8.com/color/48/000000/play.png">&nbsp;<b>Inicio de la jornada</b></h6><p>'+ response.init +'</p></div>');
													});  
											
											// PARADAS DE LA JORNADA ALERT
											if (response.time_lost != 0){
												var stops = response.stops;
												var num = stops.length;
												console.log(num + '--'+response.stops);
												var i,date,hours,minutes,seconds,cadena = '';

												for (i=0;i<num;i++){
													
														 date = new Date(stops[i]*1000);
														 console.log('num -> '+i+'---'+date);
														 hours = date.getHours();
														 minutes = "0" + date.getMinutes();
														 seconds = "0" + date.getSeconds();

														 cadena +='<hr style="height:3px;border:none;color:#3F79B2;background-color:#3F79B2;"><div class="alert alert-secondary"><h6><img src="https://img.icons8.com/color/48/000000/resume-button.png">&nbsp;'+(i+1)+'º Pausa</h6><p> Inicio : '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +'</p></div>';
													
															if (i == (num-1)){
																cadena +='<hr><div class="alert alert-danger"><h6><img src="https://img.icons8.com/color/48/000000/pause.png"><b>Total tiempo no trabajado : </b>'+response.time_lost+' minutos </h6></div><hr>';
															}
												}
												 $(document).ready(function(){  
												 	console.log("se debe añadir esto"+cadena);
													   		$("#giffirma").append(cadena);
														});  
											}
											
											// PAUSA DE LA JORNADA ALERT
											if (this.paused != 0){
												this.title = "Jornada Pausada";
												$(document).ready(function(){  
													  $("#giffirma").append('<hr style="height:3px;border:none;color:#3F79B2;background-color:#3F79B2;">'+
													'<div class="alert alert-warning"><h6><img src="https://img.icons8.com/color/48/000000/pause.png">&nbsp;<b>Pausa</b></h6><p>Tiempo en parada : '+ response.paused +' min </p></div>');
													}); 
												
											}	
									}
								}
						},
							error =>{
								console.log(<any>error);
							}
						);
		}


		  getTrigger(token){

		  	this._pdfService.get_trigger(token).subscribe(	

						response =>{
							console.log(response);
							
							this.quantity = response.trigger.quantity;
							var data = response.trigger.id_journeys;

							if (data == "0"){
								this.pdfjourneys = [];
							}else{
								this.pdfjourneys = data; 		// o JSON parse();
							}


							/* EN END FIRMA !!! */
							console.log("BEFORE firma -- this.pdfjourneys --> ",this.pdfjourneys);
							console.log("BEFORE  firma -- this.quantity --> ",this.quantity);


							/* SI ES LA CANTIDAD ESPERADA DE DIAS HACE EL TRIGRERR DEL PDF  */	
								if (this.quantity >= 2){
									console.log("<<<<<<>>>>>>>>trigered el PDF <<<<<<<<>>>>>>>");
									/* TRIGGER EL PDF */ 
												this._pdfService.generate_pdf(this.token,this.pdfjourneys).subscribe(
										              response =>{ 
										    			console.log(<any>response);

										    				this.infomsg = " ¡ Un pdf ha sido generado para ti ! Para visualizarlo o guardarlo, dirígete a la sección de ";
										    				this.globals.infomsg = this.infomsg;

										    				this.setTrigger(this.token,0,'0');
															this.pdfjourneys = [];
															this.quantity = 0;
										              },
										              error =>{
										                console.log(<any>error);
										              }
								            );

							
					}
							
	
						},
						error =>{
							console.log(<any>error);
						}

					);




		  }

		/* callpdf(){
		 	console.log("dsfhskdjfsdflakdsfhsdjkfhsdj");
		 	
				this._pdfService.generate_pdf(this.pdfjourneys).subscribe(
	              response =>{
	               
	    			console.log(<any>response);
	              },
	              error =>{
	                console.log(<any>error);
	              }
	            );
		 }*/

		  setTrigger(token,quantity,id_journeys){

				this._pdfService.set_trigger(token,quantity,id_journeys).subscribe(	

							response =>{
								console.log(response);
							},
							error =>{
								console.log(<any>error);
							}

						);
		  }
			



			// funciones del SignaturePad
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

									// se actualiza la info
									this.HasActiveJourney(this.token);
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

							this.pdfjourneys.push(response.journey.id);	

							/* SACA LA INFO DE LA WEEK */								

								var date = new Date(response.journey.date);
								var ifmonday = date.getDay();

								if (ifmonday == 1 || this.quantity > 0){
									this.week = true;
								}

								if (this.week == true){
									this.quantity++;
								}

								console.log("AFTER firma -- this.pdfjourneys --> ",this.pdfjourneys);
								console.log("AFTER firma -- this.quantity --> ",this.quantity);

								this.setTrigger(this.token,this.quantity,this.pdfjourneys);


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
							//this.paused = true;
									
									// se actualiza la info
									this.HasActiveJourney(this.token);

									console.log("	thuis paused ----------->"+this.paused);
									//this.paused = 0.017;
						},
						error =>{
							console.log(<any>error);
						}

					);

			
	}
	// Reanuda la jornada
	Continue_journey(){
		this._journeyService.continue_journey(this.token).subscribe
				(	
						response =>{
							console.log(response);
							// jornada == true
							this.jornada_activa = true;
							this.title = "Jornada Iniciada";
							//this.paused = false;
								this.paused = 0;
									// se actualiza la info
									this.HasActiveJourney(this.token);
						},
						error =>{
							console.log(<any>error);
						}

					);

	}

	setinfomsg(value){

    	this.globals.infomsg = value;
    	// igual no hace falta que cambie la local
 
	}

	 ngDoCheck(){

	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken();

  	}
}