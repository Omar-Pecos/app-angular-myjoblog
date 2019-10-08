import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { DefaultComponent} from './components/default/default.component';
import { FirmaComponent } from './components/firma/firma.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { AllJornadasComponent } from './components/all-jornadas/all-jornadas.component';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';

const appRoutes: Routes = [
	{path : '', component: DefaultComponent},
	{path : 'inicio', component: DefaultComponent},
	{path : 'login' , component: LoginComponent},
	{path : 'logout/:sure' , component: LoginComponent},
	{path : 'registro', component : RegisterComponent},
	{path : 'fichar', component : FirmaComponent},
	{path : 'jornadas', component : JornadasComponent},
	{path : 'todas_jornadas', component : AllJornadasComponent},
	{path : 'usuarios', component : UsersListComponent},
	{path : 'perfil', component : UserPerfilComponent},
	{path: '**', component: DefaultComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);