export class Mapa {
	id: number;
	idtile: string;
	quantiarecursos: number;
	x: number;
	z: number;
	
	constructor(ID: number, VALOR: string, QT: number, X:number, Z:number){

		this.id = ID;
		this.idtile = VALOR;
		this.quantiarecursos = QT;
		this.x = X;
		this.z = Z;

	}
  
}
