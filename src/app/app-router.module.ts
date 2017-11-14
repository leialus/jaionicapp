import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MapaDetailComponent } from '../pages/mapa-detail.component';
import { DetailLinkComponent } from '../pages/detailLink.component';
import { MapasComponent }     from '../pages/mapas.component';
import { JogadorComponent } from '../pages/jogador.component';
import { PageNotFoundComponent } from '../pages/page-not-found.component';
import { HomePage } from '../pages/home';


const routes: Routes = [
	{
	path: 'mapa',
	component: MapasComponent
	},
	{
	path: 'mapa-detail',
	component: MapaDetailComponent
	},
	{
	path: 'jogador-Page',
	component: JogadorComponent
	},
	{
	path: 'detail/:id',
	component: DetailLinkComponent
	},
	{
	path: 'page-home',
	component: HomePage
	},
	{ path: '',   redirectTo: 'page-home', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class appRouterModule{
	
	
}