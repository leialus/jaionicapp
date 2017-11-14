import { Injectable }    from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Global } from './global';



import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Construcao } from './construcao';
import { Opcao } from './opcao';

// const CONSTRUCOES: Construcao[] = [
	// { id: 1, valor: '4', nome: "Janela Lider", info: "Onde a janela do lider", tipo: "Obrigatorio"},
	// { id: 2, valor: '5', nome: "Casa de Madeira", info: "Casa de baixa resistencia", tipo: "Obrigatorio"},
	// { id: 3, valor: '5', nome: "Casa de Madeira", info: "Casa de baixa resistencia", tipo: "Moradia"},
	// { id: 4, valor: '5', nome: "Casa de Madeira", info: "Casa de baixa resistencia", tipo: "Moradia"},
	// { id: 5, valor: '4', nome: "Janela Lider", info: "Onde a janela do lider", tipo: "Moradia"},
	// { id: 6, valor: '4', nome: "Janela Lider", info: "Onde a janela do lider", tipo: "Obrigatorio"},
	// { id: 7, valor: '6', nome: "Silo de madeira", info: "Onde guarda recursos", tipo: "Recurso"},
// ];

@Injectable()
export class ConstrucaoService {
	
	construcoes: Construcao;
	data: Construcao;
	constructor(private http:Http){
	
    }
	
	// getConstrucoes(): Promise<Construcao[]> {
	
	
		// return Promise.resolve(CONSTRUCOES);

	// }

	linkServer: string = "http://localhost/jaserver/web/control/construcao.control.php";
	linkServer2: string = "http://localhost/jaserver/web/control/construcaodojogador.control.php";
	
	//linkServer: string = "https://jaserver.herokuapp.com/control/construcao.control.php";
	//linkServer2: string = "https://jaserver.herokuapp.com/control/construcaodojogador.control.php";

	
	getConstrucoes(): Observable<Construcao[]> {

		  return this.http
			.get(this.linkServer)
			.map((response: Response) => response.json());
	

	}
	
	getConstrucaoJogadorById(ID: number): Observable<any[]>{
		
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "selectById");
		urlSearchParams.append('id', ID.toString());
		//urlSearchParams.append('usuario', Global.id);
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) => response.json());
		
	}
	

	
	deleteConstrucaoJogadorById(ID: number): Observable<any[]>{
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "deleteById");
		urlSearchParams.append('id', ID.toString());
		urlSearchParams.append('usuario', Global.id);
		let body = urlSearchParams.toString();

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) => response.json());
		
	}
	
	updateTrabalhadores(nome: any, novaquantia: any): Observable<any[]>{
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "updateTrabalhadores");
		urlSearchParams.append('usuario', Global.id);
		urlSearchParams.append('nome', nome);
		urlSearchParams.append('novaquantia', novaquantia);
		
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) =>  response.json());
		
	}
	
	getConstrucaoByTipo(TIPO: string): Observable<Construcao[]> {
		
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "selectByTipo");
		urlSearchParams.append('tipo', TIPO);
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer, body, options)
			.map((response: Response) => <Construcao[]> response.json());
			//.map((res: any) => console.log(res));
			
		
		/*
		this.linkServer += "?acao='selectByTipo'";
		//console.log(this.getConstrucoes().then(construcoes => construcoes.filter(construcao => construcao.tipo === TIPO)););
		//return this.getConstrucoes().then(construcoes => construcoes.filter(construcao => construcao.tipo === TIPO));
		return this.http
			.get(this.linkServer)
			.map((response: Response) => <Construcao[]> response.json())
			.map((list: any) => {
            return list.filter((construcao: Construcao) => construcao.tipo === TIPO);
			});*/
			
	}
	
	addConstrucaoJogador(CONSTRUCAOID: number, IDTILE: string, X: number, Z: number): Observable<string>{
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "add");
		urlSearchParams.append('usuario', Global.id);
		urlSearchParams.append('idconstrucao', CONSTRUCAOID.toString());
		urlSearchParams.append('idtile', IDTILE);
		
		if (IDTILE == "2" || IDTILE == "3" ){
			X *= 5;
			Z *= 5;
		}
		
		urlSearchParams.append('x', Math.round(X).toString());
		urlSearchParams.append('z', Math.round(Z).toString());
		
		
		let body = urlSearchParams.toString();

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		
		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) => response.json());
	}
	
	existeCasaLider(): Observable<Opcao[]>{
		
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "existecasalider");
		urlSearchParams.append('usuario', Global.id);
		let body = urlSearchParams.toString()

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer2, body, options)
			.map((response: Response) => <Opcao[]> response.json());
			
	}
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	
}