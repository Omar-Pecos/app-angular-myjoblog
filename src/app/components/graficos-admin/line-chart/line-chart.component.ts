/* GRAFICO LÍNEA CANTIDADHORAS/MES EN AÑO EN CURSO */
import { Component, OnInit ,OnChanges, SimpleChanges,Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  providers:[UserService,GraphService]
})
export class LineChartComponent implements OnChanges {
  public identity;
  public token;
  public loading = true;
  
  public idselected = 'NO';
  public oldusers : number[];

  private _privId: string;
  private _privColor : any;

 @Input() public set theId(value: string) {
   // //console.log(`This is pubProp value change detected in setter method: ${value}`);
    this._privId = value;
  }
  /*public get pubProp() {
    return this._privId;
  }*/
  @Input() public set theColor(value: any) {
    ////console.log(`TheColor  value change detected in setter method: ${value}`);
    this._privColor = value;
  }

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul','Ago','Sep','Oct','Nov','Dic'];
  public lineChartType = 'line';
  public lineChartLegend = true;
  
  public lineChartColors = [
    {
      backgroundColor: 'rgba(43, 218, 227, .4)',
      borderColor: 'rgb(43, 218, 227)',
      pointBackgroundColor: 'rgb(43, 218, 227)',
      pointBorderColor: 'rgb(43, 218, 227)',
      pointHoverBackgroundColor: 'rgb(43, 218, 227)',
      pointHoverBorderColor: 'rgba(43, 218, 227, .8)'
    }
    ];
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Tus horas'}
  ];

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


     if (this._privId != '-1' && this.oldusers.includes(parseInt(this._privId)) == false  && this._privColor != '0'){

            this.oldusers.push(parseInt(this._privId));
            this.loading = true;

            this.Addlinechartdata(this._privId,this._privColor);
      }  

      /*if (this.oldusers != '0' && this.oldusers.length == 2 ){
        this.Call2DefaultData();
      } */
}

  Call2DefaultData()  {
          // llamada que devuelve los 2 primeros users mas antiguos !! por ejemplo
         this._userService.get2First(this.token).subscribe(
              response =>{
                 
                     this.oldusers = response.users;

                        //     LA PRIMERA LLAMADA A LOS DATOS CON EL PRIMERO DE LOS OLDUSERS ---> SERÁ EL 1
                       this._graphService.data_line_pormes(this.token,this.oldusers[0]).subscribe(
                            response => {

                                this.lineChartData = [
                                  {data: response.data_line, label: response.label}
                                ];

                                //     LA SEGUNDA LLAMADA A LOS DATOS CON EL SEGUNDA DE LOS OLDUSERS ---> SERÁ EL 2
                                       this._graphService.data_line_pormes(this.token,this.oldusers[1]).subscribe(
                                                  response => {

                                                          this.lineChartData.push(
                                                            {data: response.data_line, label: response.label});
                                                          this.lineChartColors.push(
                                                                    {
                                                                      backgroundColor: 'rgba(255, 137, 41, .4)',
                                                                      borderColor: 'rgb(255, 137, 41)',
                                                                      pointBackgroundColor: 'rgb(255, 137, 41)',
                                                                      pointBorderColor: 'rgb(255, 137, 41)',
                                                                      pointHoverBackgroundColor: 'rgb(255, 137, 41)',
                                                                      pointHoverBorderColor: 'rgba(255, 137, 41,.8)'
                                                                    });

                                                         // display el grafico !
                                                           this.loading = false;

                                                           /* //console.log("idselected ->"+this.idselected);
                                                              //console.log(this.loading);
                                                              //console.log(this.lineChartData[0].data);*/
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
                 console.log(<any>error);
              } 
          );     
  }


  /*GenColor(){
      var color;
        var r;
        var g;
        var b;

        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);

        color = {'r':r,'g':g,'b':b};

        return color;
  }*/

  Addlinechartdata(id,color){
    this.loading = true;
    /* var color = this.GenColor();*/
     var colorrgb = 'rgb('+color.r+','+color.g+','+color.b;
     var colorrgba = 'rgba('+color.r+','+color.g+','+color.b;

        this._graphService.data_line_pormes(this.token,id).subscribe(
                response => {

                        this.lineChartData.push(
                          {data: response.data_line, label: response.label});
                        this.lineChartColors.push(
                                  {
                                    backgroundColor: colorrgba+',.4)',
                                    borderColor: colorrgb+')',
                                    pointBackgroundColor: colorrgb+')',
                                    pointBorderColor: colorrgb+')',
                                    pointHoverBackgroundColor: colorrgb+')',
                                    pointHoverBorderColor: colorrgba+',.8)'
                                  });

                        // display el grafico !
                         this.loading = false;
                          /*  //console.log(this.loading);
                            //console.log(this.lineChartData[0].data);*/
                },
                error =>{
                     console.log(<any>error);
                }
          );
   
   
  }
}