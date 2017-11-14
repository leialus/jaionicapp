import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { MapaService } from '../app/mapa.service';
import { Mapa } from '../app/mapa';

@Component({
  selector: 'detailLink',
  template: `
    <div id="detalhelink" *ngIf="mapa">
      <div>
        <label>novo valor:</label>
        // <input [(ngModel)]="mapa.quantiarecursos" placeholder="valor"/>
      </div>
	  
	  <button (click)="goBack()">Back</button>
    </div>
  `
})

export class DetailLinkComponent implements OnInit {
  @Input() mapa: Mapa;
  
  constructor(
	  private mapaService: MapaService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}
	
	ngOnInit(): void {
		/*
		this.route.paramMap
		.switchMap((params: ParamMap) => this.mapaService.getMapa(+params.get('id')))
		.subscribe(mapa => this.mapa = mapa);
		*/
	}
	
	goBack(): void {
	  this.location.back();
	}
}




