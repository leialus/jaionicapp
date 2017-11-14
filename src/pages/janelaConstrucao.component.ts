import { Component,  Input, Output, EventEmitter,  OnInit } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Mapa } from '../app/mapa';
import { Construcao } from '../app/construcao';
import { ConstrucaoJogador } from '../app/construcaodojogador';
import { ConstrucaoService } from '../app/construcao.service';
import { Opcao } from '../app/opcao';
import { Global } from "../app/global";


@Component({
  selector: 'costrucaoSelecionada',
  templateUrl: './janelaConstrucao.view.html',
})

export class JanelaConstrucao  implements OnInit{
	@Input() ativo: boolean;
	@Input() construcao: ConstrucaoJogador;
	@Input() smove: boolean;
	
	@Output() sair:EventEmitter<boolean> = new EventEmitter();
	
	@Output() mover:EventEmitter<boolean> = new EventEmitter();
	
	msg: any;

	
	constructor(private construcaoService: ConstrucaoService, private http:Http){
		
	}
	
	ngOnInit(): void {

	}
	
	ngOnChanges(mapa: Mapa){
		
		console.log(this.construcao);
		
		if (this.ativo == true){
			this.construcaoService.getConstrucaoJogadorById(this.construcao.id).subscribe((msg: any) => this.msg = msg);
			
			
		}
		
	}
	
	mousedownup(){
		
		this.smove = !this.smove;

		this.mover.emit(this.smove);
		
	}
	
	sairCasaLider(){
		
		this.sair.emit(false);
	}
	
	ondelete(){
		this.construcaoService.deleteConstrucaoJogadorById(this.construcao.id).subscribe((msg: any) => this.msg = msg );
	}
	
}

