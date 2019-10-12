import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-all-jornadas',
  templateUrl: './all-jornadas.component.html',
  styleUrls: ['./all-jornadas.component.css'],
   providers: [UserService, JourneyService]
})
export class AllJornadasComponent implements DoCheck {
	public url = 'http://webtime.com.devel';
	public title: string = 'Jornadas de todos los trabajadores';
	public token;
	public identity;
	public journeys: any[];
  public myapp: AppComponent;
	public selecteduser:string = 'Identificador';

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
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();

  			this.getJourneysofAll();

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
                    //console.log("MyJourneys response ->"+response);
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
          console.log("getParams -- lo recibido ->" + value);

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
                        if (diasinput != null && mesinput != null && anioinput != null ){
                             diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput+'-'+diasinput;
                        }
                        // mes y año
                        if (diasinput == null && mesinput != null && anioinput != null ){
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput;
                        }
                        // mes y dia
                        if (diasinput != null && mesinput != null && anioinput == null ){
                            diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = mesinput+'-'+diasinput;
                        }

                        //solo año
                        if (diasinput == null && mesinput == null && anioinput != null ){
                            mystring = anioinput+'-';
                        }
                        //solo mes
                        if (diasinput == null && mesinput != null && anioinput == null ){
                            mystring = '-'+mesinput+'-';
                        }
                        //solo dia
                        if (diasinput != null && mesinput == null && anioinput == null ){
                            mystring = '-'+diasinput;
                        }

                           result = 'search='+mystring+'&field='+this.searchselect;
                           console.log("result es --> "+result);

                  }

                  if (this.searchselect == 'time'){
                      var selectedtipohora = $("#selecttipohora").val();    
                      var horasinput = $("#horasinput").val();
                      var minutosinput = $("#minutosinput").val();
                          
                          horasinput = horasinput > 9 ? "" + horasinput: "0" + horasinput;
                           minutosinput =  minutosinput > 9 ? "" +minutosinput: "0" + minutosinput;
                     
                      var mystring;

                         console.log("horas es --> "+horasinput+" y los min son ->"+minutosinput);

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
                           console.log("result es --> "+result);

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

          console.log(" getParams --lo transformado ->" + result);

            if (operacion == 'search'){
                 this.getParams = result;
                 console.log("this.getParams _>"+this.getParams);
            }
            else{
              this.getParams = result;
              console.log("this.getParams _>"+this.getParams);
               
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
        //console.log("value -> "+value);
      this.searchselect = value;
  
  }

}
