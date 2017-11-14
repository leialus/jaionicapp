import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { Mapa } from '../app/mapa';
import { MapaService } from '../app/mapa.service';

@Component({
  selector: 'jogadorPage',
  template: `
	<p>herois do jogador:</p>
	
	<ul class="mapas">
	  <li *ngFor="let mapa of mapas"
		
		(click)="onSelect(mapa)">
		{{mapa.id}}
	  </li>
	</ul>
  `
  
})

export class JogadorComponent implements OnInit {
  
  mapas: Mapa[] = [];

  
  constructor(
	private mapaService: MapaService,
	private router: Router
  ) { }
  
  
  getMapas(): void {
    //this.mapaService.getMapas().then(mapas => this.mapas = mapas.slice(0,5));
  }
 
  ngOnInit(): void {
    this.getMapas();
  }
  
    
  onSelect(mapa: Mapa){

	this.router.navigate(['/mapa']);
  }
	
  
}