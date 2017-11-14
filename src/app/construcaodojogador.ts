export class ConstrucaoJogador {
	id: number;
	idconstrucao: number;
	quantiatrabalhadores: number;
	idgooglejogador: string;
	x: number;
	z: number;
	constructor(ID: number, IDCONSTRUCAO: number, QTTRAB: number, IDJOGADOR: string, X: number, Z: number){

		this.id = ID;
		this.idgooglejogador = IDJOGADOR;
		this.idconstrucao = IDCONSTRUCAO;
		this.quantiatrabalhadores = QTTRAB;
		this.x = X;
		this.z = Z;

	}
  
}
