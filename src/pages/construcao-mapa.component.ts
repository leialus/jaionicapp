import { Component, Input} from '@angular/core';

import { Mapa } from '../app/mapa';

@Component({
  selector: 'construcao-mapa',
  template: `
	
  
    <div id="campoVasio" *ngIf="ativo">
		construcao:  {{mapa.idtile}}
	
	
      <h2>info!</h2>
      <div>
        {{mapa.idtile}}
      </div>
	  
	  
	  
    </div>
	
	
  `
})

export class ConstrucaoMapaComponent{
	//quando clica em uma construção ja existente no tile
	@Input() mapa: Mapa;
	@Input() ativo: boolean;
	

  
}




