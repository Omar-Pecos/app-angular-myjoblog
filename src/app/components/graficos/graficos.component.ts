import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
	public title = 'Mis Gráficos';

  constructor() { }

  ngOnInit() {
  }

}
