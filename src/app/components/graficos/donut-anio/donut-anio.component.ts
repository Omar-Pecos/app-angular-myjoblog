/* GRAFICO DONUT DE MISHORAS/1.826 horas */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'app-donut-anio',
  templateUrl: './donut-anio.component.html',
   providers:[UserService,GraphService]
})
export class DonutAnioComponent implements OnInit {
 public identity;
  public token;
  public loading = true;


 public donutChartLabels = ['Mis horas', '1.826 horas (año)'];
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

        this._graphService.data_donut_anio(this.token,this.identity.sub).subscribe(
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