/* GRAFICO DONUT DE Horas trabajadores / 1.826 horas (Hoy) */
import { Component, OnInit ,OnChanges, SimpleChanges,Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'admin-donut-anio',
  templateUrl: './admin-donut-anio.component.html',
   providers:[UserService,GraphService]
})

export class AdminDonutAnioComponent implements OnChanges{
  public title = 'Horas trabajadores / 1.826 horas (Año)';
  public identity;
  public token;
  public loading = true;

  public idselected = 'NO';
  public oldusers = [];

   private _privId: string;
 private _privColor : any;

  @Input() public set theId(value: string) {
    ////console.log(`This is pubProp value change detected in setter method: ${value}`);
    this._privId = value;
  }
  /*public get pubProp() {
    return this._privId;
  }*/
  @Input() public set theColor(value: any) {
    ////console.log(`TheColor  value change detected in setter method: ${value}`);
    this._privColor = value;
  }

 public donutChartLabels = ['1.826 horas'];
  public donutChartData = [1826];
 
   public donutChartColors: any[] = [
    {
      backgroundColor: [
        'rgb(145,187,137)'
    ]
    }
  ];
  public donutChartType = 'doughnut';
 
 constructor(
      private _userService : UserService,
      private _graphService : GraphService
    ) {
         this.identity = this._userService.getIdentity();
         this.token = this._userService.getToken(); 


          // llamada que devuelve los 2 primeros users mas antiguos !! por ejemplo
         this._userService.get2First(this.token).subscribe(
              response =>{
                  this.oldusers = response.users;

                             //     LA PRIMERA LLAMADA A LOS DATOS CON EL PRIMERO DE LOS OLDUSERS ---> SERÁ EL 1

                 this._graphService.data_donut_anio(this.token,this.oldusers[0]).subscribe(
                        response => {
                                //console.log(response.data_donut);
                                this.donutChartData.unshift(response.data_donut);
                                this.donutChartLabels.unshift(response.label);
                                 this.donutChartColors[0].backgroundColor.unshift( 'rgba(43, 218, 227, 1)');
                              

                                //     LA SEGUNDA LLAMADA A LOS DATOS CON EL SEGUNDA DE LOS OLDUSERS ---> SERÁ EL 2
                                       this._graphService.data_donut_anio(this.token,this.oldusers[1]).subscribe(
                                                  response => {

                                                          this.donutChartData.unshift(response.data_donut);
                                                          this.donutChartLabels.unshift(response.label);

                                                          this.donutChartColors[0].backgroundColor.unshift( 'rgba(255, 137, 41, 1)');

                                                         // display el grafico !
                                                           this.loading = false;

                                                            //console.log("idselected ->"+this.idselected);
                                                            //console.log(this.loading);
                                                  },
                                                  error =>{
                                                       //console.log(<any>error);
                                                  }
                                        );
      
                        },
                        error =>{
                             console.log(<any>error);
                        }
                    );
              },
              error =>{
                   console.log(<any>error);
              }
          );
   }
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges){

      if (this._privId != '-1' && this.oldusers.includes(parseInt(this._privId)) == false && this._privColor != '0'){

            this.oldusers.push(parseInt(this._privId));
            this.loading = true;
            
            this.AddAdminDonutAniodata(this._privId,this._privColor);
      }
    
}

  AddAdminDonutAniodata(id,color){
    this.loading = true;
     //var color = this.GenColor();
     var colorrgb = 'rgb('+color.r+','+color.g+','+color.b;

        this._graphService.data_donut_anio(this.token,id).subscribe(
                response => {

                          this.donutChartData.unshift(response.data_donut);
                          this.donutChartLabels.unshift(response.label);

                          this.donutChartColors[0].backgroundColor.unshift( colorrgb+')');
                         // this.pieChartColors[0].backgroundColor.push('#91BB89');

                         // display el grafico !
                           this.loading = false;

                           /* //console.log("idselected ->"+this.idselected);
                            //console.log("pieChartColors --->>> "+this.donutChartColors[0].backgroundColor)
                            //console.log(this.loading);*/
                },
                error =>{
                     console.log(<any>error);
                }
          );
   
   
  }
}