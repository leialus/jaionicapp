import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Opcao } from '../app/opcao';
import { Mapa } from '../app/mapa';
import { Construcao } from '../app/construcao';
import { ConstrucaoService } from '../app/construcao.service';

import { Global } from "../app/global";


@Component({
  selector: 'mapa-detail',
  templateUrl: './mapa-detail.view.html',
})

export class MapaDetailComponent implements OnInit{

	@Input() mapa: Mapa;
	@Input() ativo: boolean;
	@Input() smove: boolean;
	
	@Output() sair:EventEmitter<boolean> = new EventEmitter();
	
	@Output() mover:EventEmitter<boolean> = new EventEmitter();

  
	opcoes: Opcao[];
	opcoesPeloNome: Opcao[];
	nomeOp: string;
	contop: number = 0;
	
	maxRow: number = 2;
	maxColl: number = 5;
  
	rows:Array<any> = [];
	colls:Array<any> = [];
	construcoes: Construcao[];
	construcaoSelecionada: Construcao;
	construcaoVasio: Construcao;
	
	
	cnst: Construcao;
	
	email: string = "";
	erroConstruir: string = "";
	erroPrimeiraConstrucao: string = "";
	
	sobreItem:string = "";
	nomeConstrucaoSelecionada = "";
	
	costrucaoOver: string = "";
	infoConstrucao: string = "";
	load: boolean = false;
	
	constructor(private construcaoService: ConstrucaoService, private http:Http){
		
		this.email = Global.email;
		
	}
	
	changeStyle(nome: string){
		this.costrucaoOver = nome;
		

	}
	
	 ngOnInit(): void {
	//this.getMapas();

		//this.getConstrucoes();
		//this.construcaoService.getConstrucoes().subscribe(construcoes => this.construcoes = construcoes);

		this.construcaoService.existeCasaLider().subscribe((opcoes: any) => {this.opcoes = opcoes; this.getConstrucoes();});
		
		
	}
	
	mousedownup(){
		
		this.smove = !this.smove;

		this.mover.emit(this.smove);
		
	}
	

	
	getConstrucoes(){
		
		//this.construcaoService.getConstrucaoByTipo("Obrigatorio").subscribe(construcoes => this.construcoes = construcoes);	
		this.construcaoService.getConstrucaoByTipo(this.opcoes[0].nome).subscribe((construcoes: any) => {this.construcoes = construcoes;});	
		//this.construcoes = this.construcaoService.getConstrucoes();	c	
		//.then(construcoes => construcoes.filter(construcao => construcao.tipo === TIPO))
		
		
	}
	
	onSelect(CONSTRUCAO: Construcao){
		
		this.construcaoSelecionada = CONSTRUCAO;
		this.nomeConstrucaoSelecionada = this.construcaoSelecionada.nome;
		this.infoConstrucao = this.construcaoSelecionada.info;
	}
	
	criaConstrucao(n: number){
		
		//console.log(this.construcaoSelecionada);
		//console.log(this.mapa);
		this.construcaoService.addConstrucaoJogador(this.construcaoSelecionada.id, this.mapa.idtile, this.mapa.x, this.mapa.z).subscribe( (erroConstruir: string) => {this.erroConstruir = erroConstruir; this.construcaoCriada();});	
		
		//this.mapa.valor = this.construcaoSelecionada.valor;
		

	}
	
	construcaoCriada(){
		
		
		
		if (this.erroConstruir == "faltarecurso"){
			
		}else if (this.erroConstruir == "ocupado"){
			
		}else if (this.erroConstruir == "campoerrado"){
			
		}else if (this.erroConstruir == "casaLider"){
			this.construcaoService.existeCasaLider().subscribe((opcoes: any) => {this.opcoes = opcoes; this.getConstrucoes();})
		}
		
	
		setTimeout(() => {this.erroConstruir = "";}, 5000);
		
	}

	
	

	onSelectMenuConstrucoes(opcaoNome: string){
		
		
		console.log(opcaoNome);
		this.infoConstrucao = "";
		
		if (opcaoNome != "sair"){
			this.load = true;
			this.construcoes = [];
			this.construcaoSelecionada = this.construcaoVasio;
			
			//this.construcaoService.getConstrucaoByTipo(opcaoNome).then(construcoes => this.construcoes = construcoes);
			this.construcaoService.getConstrucaoByTipo(opcaoNome).subscribe(construcoes => {this.construcoes = construcoes;  this.load = false; console.log(this.load);});	
		}else{
			this.load = false;
			this.sair.emit(false);
		}
	}
	

}




