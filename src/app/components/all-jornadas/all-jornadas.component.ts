import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

import {AppComponent} from '../../app.component';
import {GLOBAL} from './../../services/global';
declare var $: any 

@Component({
  selector: 'app-all-jornadas',
  templateUrl: './all-jornadas.component.html',
  styleUrls: ['./all-jornadas.component.css'],
   providers: [UserService, JourneyService]
})
export class AllJornadasComponent implements DoCheck {
	public url;
	public title: string = 'Jornadas de todos los trabajadores';
	public token;
	public identity;
	public journeys: any[];
  public myapp: AppComponent;
  public ListUsers = [];
	public selecteduser:string = 'Identificador';
  
  public latitudesYlongitudes: string[] = [];
  public user_data;

  public getParams:string = '';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';


  public searchselect:any  = 'date';

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
        this.url = GLOBAL.baseUrl;
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();


        this._userService.getUsers(this.token,this.getParams).subscribe(
              response =>{

                let users = response.users.data;
                for (let i = 0;i<users.length;i++){
                    if (users[i].active == 1){
                      this.ListUsers.push(users[i]);
                    }
                  }

                     this.getJourneysofAll();
              },
              error =>{
                  let code = error.error.code;
                this._router.navigate(['error',code]);
              }
          )
  			

  	 }

  ngOnInit() {

  }
   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  getJourneysofAll(){
    this._journeyService.getAllJourneys(this.token,this.getParams).subscribe(
              response =>{
                  if (response.status == 'success'){
                    ////console.log("MyJourneys response ->"+response);
                    this.journeys = response.journeys.data;

                    let pageInfo = {'page':response.journeys.current_page,'lastpage':response.journeys.last_page,
                    'previous':response.journeys.prev_page_url,'next':response.journeys.next_page_url,
                    'from':response.journeys.from,'to':response.journeys.to,'total':response.journeys.total};
                    this.pageInfo = pageInfo;

                     //sacar el order 
                    if (response.order == 'asc'){
                        this.order = 'desc';
                    }
                    if (response.order == 'desc'){
                        this.order = 'asc';
                    }
                    this.order_now = response.order;
                    this.sort_by = response.sort_by;
                  }
              },
              error =>{
                console.log(<any>error);
              }
            );
  }
  // AÑADE LOS PARÁMETROS A LA URL CUANDO ES NECESARIO
  addgetParams(value, operacion){
        var result;
          //console.log("getParams -- lo recibido ->" + value);

                //no se necesita cortar las url - lo que se pasa se añade a la url
               if (operacion == 'add'){
                      result = value;
                  }
                //sse corta la url desde el ? y se añade
               if (operacion == 'slice'){
                      var n = value.indexOf("?");
                      result = value.slice(n+1,value.length); 
                }

                //se recogen los parametros de el form de busqueda
               if (operacion == 'search'){

                  if (this.searchselect == 'date'){

                      var diasinput = $("#diasinput").val();
                      var mesinput = $("#mesinput").val();
                      var anioinput = $("#anioinput").val();
                      var mystring;

                         // dia, mes y año
                        if (diasinput != '' && mesinput != '' && anioinput != '' ){
                             diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput+'-'+diasinput;
                        }
                        // mes y año
                        if (diasinput == '' && mesinput != '' && anioinput != '' ){
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput;
                        }
                        // mes y dia
                        if (diasinput != '' && mesinput != '' && anioinput == '' ){
                            diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = mesinput+'-'+diasinput;
                        }

                        //solo año
                        if (diasinput == '' && mesinput == '' && anioinput != '' ){
                            mystring = anioinput+'-';
                        }
                        //solo mes
                        if (diasinput == '' && mesinput != '' && anioinput == '' ){
                            mystring = '-'+mesinput+'-';
                        }
                        //solo dia
                        if (diasinput != '' && mesinput == '' && anioinput == '' ){
                            mystring = '-'+diasinput;
                        }

                           result = 'search='+mystring+'&field='+this.searchselect;
                           //console.log("result es --> "+result);

                  }

                  if (this.searchselect == 'time'){
                      var selectedtipohora = $("#selecttipohora").val();    
                      var horasinput = $("#horasinput").val();
                      var minutosinput = $("#minutosinput").val();
                          
                          horasinput = horasinput > 9 ? "" + horasinput: "0" + horasinput;
                           minutosinput =  minutosinput > 9 ? "" +minutosinput: "0" + minutosinput;
                     
                      var mystring;

                         //console.log("horas es --> "+horasinput+" y los min son ->"+minutosinput);

                        // hora y minutos
                        if (horasinput != '0' && minutosinput != '0' ){
                            
                            mystring = horasinput+':'+minutosinput+':';
                        }

                        //solo horas
                       if (horasinput != '0' && minutosinput == '0' ){
                            mystring = horasinput+':';
                        }
                        //solo minutos
                        if (horasinput == '0' && minutosinput != '0' ){
                            mystring = ':'+minutosinput+':';
                        }

                           result = 'search='+mystring+'&field='+selectedtipohora;
                           //console.log("result es --> "+result);

                  }

                  if (this.searchselect == 'id'){
                    var inputid = $('#inputid').val();
                    result = 'search='+inputid+'&field=user_id';
                  }

                      

                     
                }

                if (operacion == 'sorted_search'){
                  var selectfield = $("#selectfield").val();
                  var selectorder = $("#selectorder").val();

                   result = this.getParams+'&sort_by='+selectfield+'&order='+selectorder;
                }

          //console.log(" getParams --lo transformado ->" + result);

            if (operacion == 'search'){
                 this.getParams = result;
                 //console.log("this.getParams _>"+this.getParams);
            }
            else{
              this.getParams = result;
              //console.log("this.getParams _>"+this.getParams);
               
                 // si es la pag sig o anteroir que haga ElScrollTop
                    if (operacion == 'slice'){
                        AppComponent.myapp.scrollToTop();
                    }

               this.getJourneysofAll();     
            }
    }

     // cambia el buscador de modo fecha xx/xx/xxxx a modo hora xx:xx
  viewSearchSelect(){

      var value = $("#selectsearch").val();
        ////console.log("value -> "+value);
      this.searchselect = value;
  
  }

  setLatLon(coordIni,coordEnd,user_data){
        // este APi es mejor porque se puede elegir otros modos y buscar por lugares pero no me va los markers
        // https://www.google.com/maps/embed/v1/place?key=AIzaSyAqLFf9RljEFf4lraNDWiIasbtAFRi7dYU&q=%22%22&center=37.25,-6.94&zoom=18
       
         for (let i = 0;i<coordIni.length;i++){
            if (coordIni[i] == '' || coordIni[i] == 'nada'){
                coordIni[i] = 0;
            }
            if (coordEnd[i] == '' || coordEnd[i] == 'nada'){
                coordEnd[i] = 0;
            }
         }
        

         // var ini = 'https://maps.googleapis.com/maps/api/staticmap?center='+coordIni[0]+','+coordIni[1]+'&zoom=14&size=340x270&sensor=false&key=AIzaSyCi1QTQYVrqLKdp5JJFh2-BEm_ZEa3umiY';
         // var end = 'https://maps.googleapis.com/maps/api/staticmap?center='+coordEnd[0]+','+coordEnd[1]+'&zoom=14&size=340x270&sensor=false&key=AIzaSyCi1QTQYVrqLKdp5JJFh2-BEm_ZEa3umiY';
         // let ini = '<iframe width="100%" height="300" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAqLFf9RljEFf4lraNDWiIasbtAFRi7dYU&q=""&center='+(coordIni[0])+','+(coordIni[1])+'&zoom=18" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
         // let end = '<iframe width="100%" height="300" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAqLFf9RljEFf4lraNDWiIasbtAFRi7dYU&q=&center='+(coordEnd[0])+','+(coordEnd[1])+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
         
          this.latitudesYlongitudes = [];

          let ini = '<img style="width:100%;height:300px;" src="https://maps.googleapis.com/maps/api/staticmap?center='+(coordIni[0])+','+(coordIni[1])+'&zoom=15&size=340x300&markers=color:green%7Clabel:X%7C'+(coordIni[0])+','+(coordIni[1])+'&key=AIzaSyAqLFf9RljEFf4lraNDWiIasbtAFRi7dYU"/>'; 
          let end = '<img style="width:100%;height:300px;" src="https://maps.googleapis.com/maps/api/staticmap?center='+(coordEnd[0])+','+(coordEnd[1])+'&zoom=15&size=340x300&markers=color:green%7Clabel:X%7C'+(coordEnd[0])+','+(coordEnd[1])+'&key=AIzaSyAqLFf9RljEFf4lraNDWiIasbtAFRi7dYU"/>' 
          
          this.latitudesYlongitudes.push(ini,end);
            ////console.log("LATITUDES Y LONGITUDES -->"+this.latitudesYlongitudes);
          
          this.user_data = user_data;

           let modalBody = $('#mapsModal .modal-body');
            modalBody.html('');

            let numberstring = '';
            let numberdeuser = this.user_data.number;
            if (numberdeuser == null){
              numberstring = '<h6>No disponible el número</h6>';
            }else{
              numberstring = '<h6><a href="tel:'+numberdeuser+'">'+numberdeuser+'</a></h6>';
            }
            
            // show modal
            modalBody.append('<h5><b>Inicio Jornada Lat,Lon : '+(coordIni[0])+','+(coordIni[1])+'</b></h5>'+ini+
                  '<h5><b>Final Jornada Lat,Lon : '+(coordEnd[0])+','+(coordEnd[1])+'</b></h5>'+end+
                  '<h5><b>'+this.user_data.name+'&nbsp;'+this.user_data.surname+'</b></h5>'+
                   numberstring +
                  '<h6><a href="mailto:'+this.user_data.email+'">'+this.user_data.email+'</a></h6>');
            
            $(function() {
                $('#mapsModal').modal('show');
            });
    
  }

}
