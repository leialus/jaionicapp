import { Injectable }    from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { Response } from '@angular/http';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
	
	
	constructor(private http:Http){
	
    }

	linkServer: string = "http://localhost/jaserver/web/control/user.control.php";
	//linkServer: string = "https://jaserver.herokuapp.com/control/user.control.php";
	
	getUsers(): Observable<string> {

		  return this.http
			.get(this.linkServer)
			.map((response: Response) => response.json());
	

	}

  
	getUserCadastrado(ID: string): Observable<string> {

		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "verificar");
		urlSearchParams.append('idgoogle', ID.toString());
		let body = urlSearchParams.toString();

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer, body, options)
			.map((response: Response) => response.json());
			
	}
	
	userCadastrar(NOME: string, EMAIL:string, ID:string): Observable<string>{
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('acao', "cadastrar");
		urlSearchParams.append('nome', NOME);
		urlSearchParams.append('email', EMAIL);
		urlSearchParams.append('idgoogle', ID);
		
		let body = urlSearchParams.toString();

		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.linkServer, body, options)
			.map((response: Response) => response.json());
	}
	
}