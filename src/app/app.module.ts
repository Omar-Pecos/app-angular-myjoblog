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
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { AllJornadasComponent } from './components/all-jornadas/all-jornadas.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ArchivosComponent } from './components/archivos/archivos.component';


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
    ArchivosComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     HttpClientModule,
    routing,
    SignaturePadModule
  ],
  providers: [appRoutingProviders , Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
