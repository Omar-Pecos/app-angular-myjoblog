/* GRAFICO DONUT DE MISHORAS/TOTALES */
import { Component, OnInit ,OnChanges, SimpleChanges,Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
   providers:[UserService,GraphService]
})
export class PieChartComponent implements OnChanges{
 public identity;
  public token;
  public loading = true;

  public idselected = 'NO';
  public oldusers : number[];

  private _privId: string;
 private _privColor : any;
 

 @Input() public set theId(value: string) {
    //console.log(`This is pubProp value change detected in setter method: ${value}`);
    this._privId = value;
  }
  /*public get pubProp() {
    return this._privId;
  }*/
  @Input() public set theColor(value: any) {
    //console.log(`TheColor  value change detected in setter method: ${value}`);
    this._privColor = value;
  }

 public pieChartLabels = ['Mis horas', 'Horas Totales'];
  public pieChartData = [120, 150];
 
   public pieChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(43, 218, 227, 1)',
        'rgb(145,187,137)'
    ]
    }
  ];
  public pieChartType = 'pie';
 
 constructor(
      private _userService : UserService,
      private _graphService : GraphService
    ) {
         this.identity = this._userService.getIdentity();
         this.token = this._userService.getToken(); 

         this.loading = true;

         this.Call2DefaultData();
               
   }
  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges){

      if (this._privId != '-1' && this.oldusers.includes(parseInt(this._privId)) == false && this._privColor != '0'){

            this.oldusers.push(parseInt(this._privId));
            this.loading = true;

            this.Addpiechartdata(this._privId,this._privColor);
      }

    
}

Call2DefaultData(){

   // llamada que devuelve los 2 primeros users mas antiguos !! por ejemplo
         this._userService.get2First(this.token).subscribe(
              response =>{
                 
                     this.oldusers = response.users;

              //     LA PRIMERA LLAMADA A LOS DATOS CON EL PRIMERO DE LOS OLDUSERS ---> SERÁ EL 1
                 this._graphService.data_donut_porcentaje(this.token,this.oldusers[0]).subscribe(
                        response => {
                                console.log(response.data_donut);
                                this.pieChartData = response.data_donut;
                                this.pieChartLabels = response.label;
                      
                                console.log("el pieChartData 1ººº --> "+this.pieChartData);

                                //     LA SEGUNDA LLAMADA A LOS DATOS CON EL SEGUNDA DE LOS OLDUSERS ---> SERÁ EL 2
                                       this._graphService.data_donut_porcentaje(this.token,this.oldusers[1]).subscribe(
                                                  response => {

                                                         var num = this.pieChartData.length;

                                                         this.pieChartData[num - 1] = response.data_donut[1];
                                                        
                                                          this.pieChartData.unshift(response.data_donut[0]);
                                                          this.pieChartLabels.unshift(response.label[0]);

                                                          this.pieChartColors[0].backgroundColor.unshift( 'rgba(255, 137, 41, 1)');

                                                         // display el grafico !
                                                           this.loading = false;

                                                            console.log("idselected ->"+this.idselected);
                                                            console.log(this.loading);
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

           },
              error =>{

              }
          );
}

  Addpiechartdata(id,color){
   // this.loading = true;
    // var color = this.GenColor();
     var colorrgb = 'rgb('+color.r+','+color.g+','+color.b;

        this._graphService.data_donut_porcentaje(this.token,id).subscribe(
                response => {

                        var num = this.pieChartData.length;

                         this.pieChartData[num - 1] = response.data_donut[1];
                        
                          this.pieChartData.unshift(response.data_donut[0]);
                          this.pieChartLabels.unshift(response.label[0]);

                          this.pieChartColors[0].backgroundColor.unshift( colorrgb+')');
                         // this.pieChartColors[0].backgroundColor.push('#91BB89');

                         // display el grafico !
                           this.loading = false;

                           /* console.log("idselected ->"+this.idselected);
                            console.log("pieChartColors --->>> "+this.pieChartColors[0].backgroundColor)
                            console.log(this.loading);*/
                },
                error =>{
                     console.log(<any>error);
                }
          );
   
   
  }
}