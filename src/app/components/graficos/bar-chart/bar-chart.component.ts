 /* GRAFICO LÍNEA CANTIDADHORAS/MES EN AÑO EN CURSO */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers:[UserService,GraphService]
})
export class BarChartComponent implements OnInit {
  public identity;
  public token;
  public loading = true;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul','Ago','Sep','Oct','Nov','Dic'];
  public barChartType = 'line';
  public barChartLegend = true;
 public barChartColors = [
    {
      backgroundColor: 'rgba(43, 218, 227, .4)',
      borderColor: 'rgb(43, 218, 227)',
      pointBackgroundColor: 'rgb(43, 218, 227)',
      pointBorderColor: 'rgb(43, 218, 227)',
      pointHoverBackgroundColor: 'rgb(43, 218, 227)',
      pointHoverBorderColor: 'rgba(43, 218, 227, .8)'
    }
    ];
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Tus horas'}
  ];

  constructor(
      private _userService : UserService,
      private _graphService : GraphService
    ) {
         this.identity = this._userService.getIdentity();
         this.token = this._userService.getToken(); 

        this._graphService.data_line_pormes(this.token,this.identity.sub).subscribe(
              response => {

                      this.barChartData = [
                        {data: response.data_line, label: 'Tus horas'}
                      ];

                      this.loading = false;
                      //console.log(this.loading);
                       //console.log(this.barChartData[0].data);
              },
              error =>{
                   console.log(<any>error);
              }
          );
   }

  ngOnInit() {


  }
}