/* GRAFICO DONUT DE MISHORAS/TOTALES */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
   providers:[UserService,GraphService]
})
export class DoughnutChartComponent implements OnInit {
 public identity;
  public token;
  public loading = true;


 public doughnutChartLabels = ['Mis horas', 'Horas Totales'];
  public doughnutChartData = [120, 150];
 
   public doughnutChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(43, 218, 227, 1)',
         'rgb(145,187,137)'
    ]
    }
  ];
  public doughnutChartType = 'pie';
 
 constructor(
      private _userService : UserService,
      private _graphService : GraphService
    ) {
         this.identity = this._userService.getIdentity();
         this.token = this._userService.getToken(); 

        this._graphService.data_donut_porcentaje(this.token,this.identity.sub).subscribe(
              response => {

                      this.doughnutChartData = response.data_donut;
                       
                      this.loading = false;
                      console.log(this.loading);
                       console.log(this.doughnutChartData);
              },
              error =>{
                   console.log(<any>error);
              }
          );
   }
  ngOnInit() {
    
  }
}
