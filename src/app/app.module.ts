import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule }    from '@angular/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home';
//import { AppComponent }        from '../pages/app.component';
import { MapaDetailComponent } from '../pages/mapa-detail.component';
import { DetailLinkComponent } from '../pages/detailLink.component';
import { MapasComponent }     from '../pages/mapas.component';
import { JanelaCasaLiderComponent } from '../pages/janelaCasaLider.component';
import { JogadorComponent } from '../pages/jogador.component';
import { PageNotFoundComponent } from '../pages/page-not-found.component';
import { ConstrucaoMapaComponent } from '../pages/construcao-mapa.component';
import { JanelaConstrucao } from '../pages/janelaConstrucao.component';

import { MapaService }         from './mapa.service';
import { ConstrucaoService }   from './construcao.service';
import { UserService }   from './user.service';


//import { appRouterModule } from './app-router.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaDetailComponent,
	JanelaCasaLiderComponent,
	MapasComponent,
	JogadorComponent,
	DetailLinkComponent,
	PageNotFoundComponent,
	ConstrucaoMapaComponent,
	JanelaConstrucao

  ],
  imports: [
    BrowserModule,
	HttpModule,
	//appRouterModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	MapasComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
	UserService,
	MapaService,
	ConstrucaoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
