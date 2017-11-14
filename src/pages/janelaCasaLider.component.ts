import { Component,  Input, Output, EventEmitter,  OnInit } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import { Mapa } from '../app/mapa';
import { Construcao } from '../app/construcao';
import { ConstrucaoService } from '../app/construcao.service';
import { Opcao } from '../app/opcao';
import { Global } from "../app/global";

@Component({
  selector: 'opCasaLider',
  templateUrl: './janelaCasaLider.view.html',
})

export class JanelaCasaLiderComponent  implements OnInit{
	@Input() ativo: boolean;
	@Input() id: number;
	@Input() smove: boolean;
	
	@Output() sair:EventEmitter<boolean> = new EventEmitter();
	
	@Output() mover:EventEmitter<boolean> = new EventEmitter();
	
	msg: any;
	tipo: string = "casadolidertrabalhadores";
	
	quantiaTrab: any[];
	
	Math: any;
	
	mapaid: number = -1;
	
	costrucaoOver:string = "";
	
	constructor(private construcaoService: ConstrucaoService, private http:Http){
		
	}
	
	ngOnInit(): void {
		this.Math = Math;
		this.quantiaTrab = [];
	}
	
	ngOnChanges(mapa: Mapa){
		
		if(this.ativo == true){
			this.getDadosJogador(0);
			if (!this.msg || this.mapaid != this.id){
				this.mapaid = this.id;
					
				
			}
		
		}
	}
	
	
	mousedownup(){
		
		this.smove = !this.smove;

		this.mover.emit(this.smove);
		
	}
	
	atualiza(nome: any, novaquantia: any){
		console.log(nome);
		this.construcaoService.updateTrabalhadores(nome,novaquantia).subscribe((msg: any) => { 
			
			if (novaquantia >= 0){
				this.getDadosJogador(1);
			}else{
				this.getDadosJogador(0);
			}
			
		});
		
	}
	
	getDadosJogador(TIPO: number){

		this.construcaoService.getConstrucaoJogadorById(this.id).subscribe((msg: any) => {
			console.log(msg);
			if (TIPO == 0){
				
				this.msg = msg;  
				this.quantiaTrab = this.msg.relacaotrabalhadores; 
				this.alteraInput();
			
			}
		});
		
	}
	
	onNext(acao: number){

		if (this.tipo == "casadoliderestoque"){
			
			this.tipo = "casadolidertrabalhadores"
			
		}else if (this.tipo == "casadolidertrabalhadores"){
			
			this.tipo = "casadoliderestoque"
		}
		
		
		
	}
	
	alteraInput(){
		
		let i = 0;
		let aux = 0;
		for (let x of this.quantiaTrab){
			
			aux += x[1];
			i++;
		}

	 
		
		this.msg.quantiaemservico = aux;
	}
	
	sairCasaLider(){
		
		this.sair.emit(false);
	}
	
	changeStyle(nome: string){
		this.costrucaoOver = nome;
		

	}
	
}

