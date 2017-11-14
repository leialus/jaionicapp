export class Construcao {
	id: number;
	valor: string;
	nome: string;
	info: string;
	tipo: string;
	tempoconstrucao: number;
	geracaorecursosegundo: number;
	estoquecomida: number;
	estoquemadeira: number;
	estoqueferramenta: number;
	estoquepele: number;
	estoqueroupa: number;	
	customadeira: number;
	custominerio: number;
	img: string;
	
	
	
	constructor(ID: number, VALOR: string, NOME: string, INFO: string, TIPO: string, TCONSTRUCAO: number, GERACAORECURSOSEGUNDO: number, 
				ESTOQUECOMIDA: number, ESTOQUEMADEIRA: number, ESTOQUEFERRAMENTA: number, ESTOQUEPELE: number, ESTOQUEROUPA: number, 
				CUSTOMADEIRA: number, CUSTOMINERIO: number, IMG: string){

		this.id = ID;
		this.valor = VALOR;
		this.nome = NOME;
		this.info = INFO;
		this.tipo = TIPO;
		this.tempoconstrucao = TCONSTRUCAO;
		this.geracaorecursosegundo = GERACAORECURSOSEGUNDO;
		this.estoquecomida = ESTOQUECOMIDA;
		this.estoquemadeira = ESTOQUEMADEIRA;
		this.estoqueferramenta = ESTOQUEFERRAMENTA;
		this.estoquepele = ESTOQUEPELE;
		this.estoqueroupa = ESTOQUEROUPA;	
		this.customadeira = CUSTOMADEIRA;
		this.custominerio = CUSTOMINERIO;
		this.img = IMG;
		
	}
  
}
