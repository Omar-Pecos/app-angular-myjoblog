/* GRAFICO DONUT DE MISHORAS/8 horas */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-donut-dia',
  templateUrl: './donut-dia.component.html',
   providers:[UserService,GraphService]
})
export class DonutDiaComponent implements OnInit {
 public identity;
  public token;
  public loading = true;


 public donutChartLabels = ['Mis horas','8 horas'];
 public donutChartData = [8];
 
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

        this._graphService.data_donut_dia(this.token,this.identity.sub).subscribe(
              response => {

                      this.donutChartData.unshift(response.data_donut);
                      this.donutChartColors[0].backgroundColor.unshift('rgba(43, 218, 227, 1)');
                       
                      this.loading = false;
                      //console.log(this.loading);
                       //console.log(this.donutChartData);
              },
              error =>{
                   console.log(<any>error);
              }
          );
   }
   
  ngOnInit() {

  }
}