import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Mapa } from './mapa';
import { ConstrucaoJogador } from './construcaodojogador';
import { Global } from './global'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class MapaService {
	
	linkServer: string = "http://localhost/jaserver/web/control/mapa.control.php";
	//linkServer: string = "https://jaserver.herokuapp.com/control/mapa.control.php";

	linkServer2: string = "http://localhost/jaserver/web/control/construcaodojogador.control.php";
	//linkServer2: string = "https://jaserver.herokuapp.com/control/construcaodojogador.control.php";
	
	private tileMapa: Mapa[];
	
	constructor(private http:Http){
	
    }


	atualizaInventarios(): any{
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "atualizarinventarios");
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer, body, options)
			.map((response: Response) => response.json());
	}	

	
	getConstrucaoJogador(): Observable<ConstrucaoJogador[]> {
		
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "todasconstrucoes");
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) => <ConstrucaoJogador[]> response.json());

	}
	
	getMapaDB(): Observable<Mapa[]> {
		
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "pega");

		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer, body, options)
			.map((response: Response) => <Mapa[]> response.json());

			
	}
	
	getMapaMesh(): Observable<any> {

		return this.http.get("../assets/mapa.json")
			 .map((res:any) => res);


		
	}
	
	getMapaElementosSobre(): Observable<any> {

		return this.http.get("../assets/elementosMapa.json")
			 .map((res:any) => res);


		
	}

}