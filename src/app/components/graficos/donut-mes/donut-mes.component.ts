/* GRAFICO DONUT DE MISHORAS/160 horas */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-donut-mes',
  templateUrl: './donut-mes.component.html',
   providers:[UserService,GraphService]
})
export class DonutMesComponent implements OnInit {
 public identity;
  public token;
  public loading = true;


 public donutChartLabels = ['Mis horas', '160 horas'];
 public donutChartData = [160];
 
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

        this._graphService.data_donut_mes(this.token,this.identity.sub).subscribe(
              response => {

                     this.donutChartData.unshift(response.data_donut);
                      this.donutChartColors[0].backgroundColor.unshift('rgba(43, 218, 227, 1)');
                       
                      this.loading = false;
                      //console.log(this.loading);
                      // console.log(this.donutChartData);
              },
              error =>{
                   console.log(<any>error);
              }
          );
   }
   
  ngOnInit() {

  }
}