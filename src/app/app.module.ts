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


import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { AllJornadasComponent } from './components/all-jornadas/all-jornadas.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { BarChartComponent } from './components/graficos/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/graficos/doughnut-chart/doughnut-chart.component';
import { GraficosComponent } from './components/graficos/graficos.component';


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
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     HttpClientModule,
    routing,
    SignaturePadModule,
    ChartsModule
  ],
  providers: [appRoutingProviders , Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }


