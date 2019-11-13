import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { DefaultComponent} from './components/default/default.component';

import { Globals } from './globals';

import { FirmaComponent } from './components/firma/firma.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { AllJornadasComponent } from './components/all-jornadas/all-jornadas.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

import { GraficosComponent } from './components/graficos/graficos.component';
import { BarChartComponent } from './components/graficos/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/graficos/doughnut-chart/doughnut-chart.component';
import { DonutDiaComponent } from './components/graficos/donut-dia/donut-dia.component';
import { DonutMesComponent } from './components/graficos/donut-mes/donut-mes.component';
import { DonutAnioComponent } from './components/graficos/donut-anio/donut-anio.component';

import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';
import { LineChartComponent } from './components/graficos-admin/line-chart/line-chart.component';
import { PieChartComponent } from './components/graficos-admin/pie-chart/pie-chart.component';
import { AdminDonutDiaComponent } from './components/graficos-admin/admin-donut-dia/admin-donut-dia.component';
import { AdminDonutMesComponent } from './components/graficos-admin/admin-donut-mes/admin-donut-mes.component';
import { AdminDonutAnioComponent } from './components/graficos-admin/admin-donut-anio/admin-donut-anio.component';

import { Error404Component } from './components/error404/error404.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UsersActivateComponent } from './components/users-activate/users-activate.component';
import { ArchivosAdminComponent } from './components/archivos-admin/archivos-admin.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    FirmaComponent,
    UserPerfilComponent,
    JornadasComponent,
    AllJornadasComponent,
    UsersListComponent,
    ArchivosComponent,
     GraficosComponent,
    BarChartComponent,
    DoughnutChartComponent,
    DonutDiaComponent,
    DonutMesComponent,
    DonutAnioComponent,
    GraficosAdminComponent,
    LineChartComponent,
    PieChartComponent,
    AdminDonutDiaComponent,
    AdminDonutMesComponent,
    AdminDonutAnioComponent,
    Error404Component,
    UserCreateComponent,
    UsersActivateComponent,
    ArchivosAdminComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     HttpClientModule,
    routing,
    SignaturePadModule,
    ChartsModule,
    FullCalendarModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule
  ],
  providers: [appRoutingProviders , Globals , DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


