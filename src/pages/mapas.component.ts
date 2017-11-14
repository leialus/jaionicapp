import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
 
import { Mapa } from '../app/mapa';
import { MapaService } from '../app/mapa.service';

import { Opcao } from '../app/opcao';
import { DataTime } from '../app/datatime';
import { ConstrucaoJogador } from '../app/construcaodojogador';

import { Global } from '../app/global';

declare const gapi: any;

const OPCOES: Opcao[] = [
	{ id: 1, nome: 'Janela lider'},
	{ id: 2, nome: 'Janela Recursos'  },
];

//import * as THREE from 'three';
//import * as carregaOBJ from 'three-obj-loader';
declare var require: any;
const THREE = require('three');
const OBJLoader = require('three-obj-loader')(THREE);
const MTLLoader = require('three-mtl-loader');


@Component({
  selector: 'my-mapa',
  template: `
	<section id="geral" (mousemove)="coordinates($event)">
			
		<section #rendererContainer> 
		
				
		
		</section>
  
			
		<div class="h-100 d-inline-block" >
			
			<div class="sk-circle" *ngIf="!maxColl">
			  <div class="sk-circle1 sk-child"></div>
			  <div class="sk-circle2 sk-child"></div>
			  <div class="sk-circle3 sk-child"></div>
			  <div class="sk-circle4 sk-child"></div>
			  <div class="sk-circle5 sk-child"></div>
			  <div class="sk-circle6 sk-child"></div>
			  <div class="sk-circle7 sk-child"></div>
			  <div class="sk-circle8 sk-child"></div>
			  <div class="sk-circle9 sk-child"></div>
			  <div class="sk-circle10 sk-child"></div>
			  <div class="sk-circle11 sk-child"></div>
			  <div class="sk-circle12 sk-child"></div>
			</div>
			
		</div>	
			

		<section id="opMenu">
		
			
			<mapa-detail id="janelavel" style="	position: absolute; display: block; width: 75%;" 
			[style.left.px]="xTileDtail" [style.top.px]="yTileDtail"
			(mover)="statusMover=$event" (sair)="janelaCampoVasio=$event" 
			[ativo]="janelaCampoVasio" [mapa]="selectedMapa" [smove]="statusMover">
			
			</mapa-detail>

			<opCasaLider id="janelavelLider" style="position: absolute; display: block; width: 75%;" 
			[style.left.px]="xTileDtailLider" [style.top.px]="yTileDtailLider"
			(mover)="statusMoverLider=$event" (sair)="janelaLider=$event" 
			[ativo]="janelaLider" [id]="casaJogadorSelected" [smove]="statusMoverLider">
			
			</opCasaLider>
			
			<costrucaoSelecionada id="janelavelConstrucao" style="position: absolute; display: block; width: 75%;" 
			[style.left.px]="xTileDtailjConstrucao" [style.top.px]="yTileDtailjConstrucao"
			(mover)="statusMoverJConstrucao=$event" (sair)="janelaConstrucaoSelecionada=$event" 
			[ativo]="janelaConstrucaoSelecionada" [construcao]="selectedCostrucao" [smove]="statusMoverJConstrucao">
			
			</costrucaoSelecionada>
			
			
		</section>
	
		
    </section>
	
	
  `
})


export class MapasComponent implements OnInit {
	event: MouseEvent;
	clientX: number = 0;
	clientY: number = 0;

	/*
	@HostListener('rendererContainer:mousemove', ['$event'])
	onMove(event) {
		console.log("movendo");
	}*/
	
	@HostListener('window:resize', ['$event'])
	onResize(event){
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		
		switch ( event.key) {

			case 'w': // w
				this.camera.position.z -= 10;
				break;

			case 'a': // a
				this.camera.position.x -= 10;
				break;

			case 's': // s
				this.camera.position.z += 10;
				break;

			case 'd': // d
				this.camera.position.x += 10;
				break;
				
			case 'r': // s
				this.camera.rotation.x += 0.5;
				break;

			case 'f': // d
				this.camera.rotation.x -= 0.5;
				break;
				
			
			case 't': // s
				this.camera.position.y += 1;
				break;

			case 'g': // d
				this.camera.position.y -= 1;
				break;
				
		}
	}
	
	mapas: Mapa[];

	opcoes = OPCOES;
	selectedMapa: Mapa;
	selectedCostrucao: ConstrucaoJogador;
	casaJogadorSelected: number;
	selectedOpcao: Opcao;

	vasioMapa: Mapa;
	vasioOpcao: Opcao;

	janelaCampoVasio: boolean = false;
	janelaLider: boolean = false;
	janelaConstrucaoSelecionada: boolean = false;


	rows:Array<any> = [];
	colls:Array<any> = [];

	maxRow: number = 10;
	maxColl: number;

	colunaCelecionada: number = -1;
	linhaCelecionada: number = -1;


	construcaojogador: ConstrucaoJogador[];

	idConstrucaoNoMapa: number;
	imgConstrucaoNoMapa: string;

	verificaToken: boolean = true;
	timeVerificacao: number = 0;

	datatime: DataTime;

	xTileDtail: number = 300;
	yTileDtail: number = 300;  

	xTileDtailLider: number = 300;
	yTileDtailLider: number = 300; 

	xTileDtailjConstrucao: number = 300;
	yTileDtailjConstrucao: number = 300; 

	statusMover: boolean = false;
	statusMoverLider: boolean = false;
	statusMoverJConstrucao: boolean = false;

	@ViewChild('rendererContainer') rendererContainer: ElementRef;

	renderer = new THREE.WebGLRenderer();
	scene = null;
	camera = null;
	
	loader:Array<any> = [];
	
	OBJDoMapa:Array<any> = [];
	countOBJDoMapa: number = 0;
	
	construcaoDoMapa:Array<any> = [];	
	countConstrucaoDoMapa: number = 0;
	
	mtlLoader:Array<any> = [];
	
	auxNLoads: number = 0;
	
	ambientLight = null;
	//terreno
	geometry = null;
	texture = null;
	mesh = null;
	helper = null;
	vertices = null;
	data: any;

	worldWidth:number = 256;
	worldDepth:number = 256;
	//--
	
	materialArray = null;
	skyboxGeom = null;
	skybox = null;
	meshSB = null;
	
	mouse = new THREE.Vector2();
	raycaster = new THREE.Raycaster();
	raycasterObjetos = new THREE.Raycaster();
	intersects = null;
	intersectsObjetos = null;

	
	encontrado: boolean = false;
	
	statusLoadGame: number = 0;
	totalLoadGame: number = 0;
	
	carregaCasa = null;
	carregaArvore = null;
	carregaPedra = null;
	carregaAgua = null;
	
	elementosSobreMapa: any;
	
	
	
	constructor(private mapaService: MapaService) { 
		
		
		this.scene = new THREE.Scene();

		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;
			
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

		this.camera.position.y += 40;
		this.camera.rotation.x -= 0.7;
	
		var prefix = "../assets/skybox/dawnmountain-";
									   
		var urls = [
			prefix + "xpos.png", prefix + "xneg.png",
			prefix + "ypos.png", prefix + "yneg.png",
			prefix + "zpos.png", prefix + "zneg.png"
		];
		var cubetex = THREE.ImageUtils.loadTextureCube(urls);
		cubetex.format = THREE.RGBFormat;
		// Shader
		var shader = THREE.ShaderLib["cube"];
		var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
		uniforms["tCube"].value = cubetex;
		// Material
		var material = new THREE.ShaderMaterial({
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});
		// Mesh
		var size = 7500;
		var mesh = new THREE.Mesh(new THREE.CubeGeometry(size, size, size), material);
		mesh.position.set(0,0,0);
		mesh.geometry.dynamic = false;
		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();
		this.scene.add(mesh);
		
		
		//terreno
		this.geometry = new THREE.PlaneBufferGeometry( 7500, 7500, this.worldWidth - 1, this.worldDepth - 1 );
		this.geometry.rotateX( - Math.PI / 2 );

		//this.data = this.generateHeight( this.worldWidth, this.worldDepth );
		
		//console.log(JSON.stringify(this.data));
		
		this.mapaService.getMapaMesh().subscribe((data: any) => {
			this.data = JSON.parse(data._body);
			
			
			//console.log(this.data);
			
			this.vertices = this.geometry.attributes.position.array;
			for ( let i = 0, j = 0, l = this.vertices.length; i < l; i ++, j += 3 ) {
				this.vertices[ j + 1 ] = this.data[ i ] * 10;
			}
			
			this.geometry.computeFaceNormals();

			
			this.texture = new THREE.CanvasTexture( this.generateTexture( this.data, this.worldWidth, this.worldDepth ) );
			
			this.texture.wrapS = THREE.ClampToEdgeWrapping;
			this.texture.wrapT = THREE.ClampToEdgeWrapping;
			this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { map: this.texture } ) );
			this.mesh.name = "terreno";
			this.scene.add( this.mesh );
			
			/*this.geometry = new THREE.CylinderGeometry(  0, 2, 10, 6 );
			this.geometry.translate( 0, 5, 0 );
			this.geometry.rotateX( Math.PI / 2 );
			this.helper = new THREE.Mesh( this.geometry, new THREE.MeshNormalMaterial() );
			this.scene.add( this.helper );*/
		//----------
		});
		
		this.ambientLight = new THREE.AmbientLight( 0xcccccc, 0.8 );
		this.scene.add( this.ambientLight );
		
		//this.scene.add(this.mesh);

		// instantiate a loader
		this.mtlLoader = [];
		this.loader = [];
		this.OBJDoMapa = [];
		this.construcaoDoMapa = [];
		
		this.loadModelObj('../assets/casa simples/OBJ/casa.mtl', '../assets/casa simples/OBJ/casa.obj', "casa");
		this.totalLoadGame++;
		this.auxNLoads++;
		this.loadModelObj('../assets/Ltree/Tree low.mtl', '../assets/Ltree/Tree low.obj', "arvore");
		this.totalLoadGame++;
		this.auxNLoads++;
		this.loadModelObj('../assets/pedra/Rock1.mtl', '../assets/pedra/Rock1.obj', "pedra");
		this.totalLoadGame++;
		this.auxNLoads++;
		this.loadModelObj('../assets/agua/agua.mtl', '../assets/agua/agua.obj', "agua");
		this.totalLoadGame++;
		this.auxNLoads++;
		//this.loadModelObj('../assets/terrain/lowpolymountains.mtl', '../assets/terrain/lowpolymountains.obj', "terreno", 2);
	}
	
	
	generateTexture( data, width, height ) {
		var canvas, canvasScaled, context, image, imageData,
		level, diff, vector3, sun, shade;
		vector3 = new THREE.Vector3( 0, 0, 0 );
		sun = new THREE.Vector3( 1, 1, 1 );
		sun.normalize();
		canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;
		context = canvas.getContext( '2d' );
		context.fillStyle = '#000';
		context.fillRect( 0, 0, width, height );
		image = context.getImageData( 0, 0, canvas.width, canvas.height );
		imageData = image.data;
		for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
			vector3.x = data[ j - 2 ] - data[ j + 2 ];
			vector3.y = 2;
			vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
			vector3.normalize();
			shade = vector3.dot( sun );
			//rgb
			imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
			imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
			imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
		}
		context.putImageData( image, 0, 0 );
		// Scaled 4x
		canvasScaled = document.createElement( 'canvas' );
		canvasScaled.width = width * 4;
		canvasScaled.height = height * 4;
		context = canvasScaled.getContext( '2d' );
		context.scale( 4, 4 );
		context.drawImage( canvas, 0, 0 );
		image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
		imageData = image.data;
		for ( var i = 0, l = imageData.length; i < l; i += 4 ) {
			var v = ~~ ( Math.random() * 5 );
			imageData[ i ] += v;
			imageData[ i + 1 ] += v;
			imageData[ i + 2 ] += v;
		}
		context.putImageData( image, 0, 0 );
		return canvasScaled;
	}
	
	loadModelObj(MTL: string, OBJ: string, NAME: string){
		
		
		let n = this.auxNLoads;
		this.loader[n] = new THREE.OBJLoader();
		this.mtlLoader[n] = new MTLLoader();
		
		this.mtlLoader[n].load( 
			
			MTL,  
			
			mtl => {
				
				mtl.preload();
				
				this.loader[n].setMaterials( mtl );
				
				//console.log(mtl);
				this.loader[n].load(
					// resource URL
					OBJ,
					// called when resource is loaded
					object => {
						object.name = NAME;
						
						if (NAME == "casa"){
							
							//console.log(object);
							this.carregaCasa = object;
							
						}else if (NAME == "arvore"){
							
							object.scale.set(0.1,0.1,0.1)
							this.carregaArvore = object;
							
						}else if (NAME == "pedra"){
							
							this.carregaPedra = object;
							
						}else if (NAME == "agua"){
							
							object.scale.set(5,1, 1)
				
							this.carregaAgua = object;
							
						}
					
						
						//this.OBJDoMapa.push(object);
						//this.scene.add( object );
						
					},
					// called when loading is in progresses
					xhr => {

						//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
						if (xhr.loaded / xhr.total * 100 == 100){
							
							this.statusLoadGame++;
							
							//console.log(this.statusLoadGame);
							
						}
					},
					// called when loading has errors
					error => {

						console.log( 'An error happened' );

					}
				);
			}
		
		);
		
	}

	onMouseMove = (event: MouseEvent): void => {
		/*this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
		
		this.raycaster.setFromCamera( this.mouse, this.camera );
		// See if the ray from the camera into the world hits one of our meshes
		
		this.intersects = this.raycaster.intersectObject( this.mesh );
		// Toggle rotation bool for meshes that we clicked
		if ( this.intersects.length > 0 ) {
			this.helper.position.set( 0, 0, 0 );
			this.helper.lookAt( this.intersects[ 0 ].face.normal );
			this.helper.position.copy( this.intersects[ 0 ].point );

		}*/
	}
	
	mouseDown = (event: MouseEvent): void => {
		this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
		
		this.raycaster.setFromCamera( this.mouse, this.camera );
		this.raycasterObjetos.setFromCamera( this.mouse, this.camera );
		
		this.encontrado = false;
		// See if the ray from the camera into the world hits one of our meshes
		//object.raycast is not a function
		
		
		for(let x of this.construcaoDoMapa){
			
			this.intersects = this.raycaster.intersectObject( x, true );
			
			if ( this.intersects.length > 0 ) {
				
				console.log(this.intersects);
				
				if(x.construcaojogador.idgooglejogador == Global.id){
					console.log(x.construcaojogador);
					if (x.construcaojogador.idconstrucao == 0){
						
						this.casaJogadorSelected = x.construcaojogador.id;
						this.janelaLider = true;
						
					}else{
						this.selectedCostrucao = x.construcaojogador;
						this.janelaConstrucaoSelecionada = true;
					}
					
				}
				
				this.encontrado = true;
				break;
			}
		}

		if(this.encontrado == false){
			for(let x of this.OBJDoMapa){
				
				this.intersects = this.raycaster.intersectObject( x, true );
				
				if ( this.intersects.length > 0 ) {
					
					
					this.selectedMapa = x.mapa;
					console.log(this.selectedMapa);
					/*this.localSelecionado = x.position;
					
					if (x.name == "pedra"){
						console.log("pedra");
						this.idCampoSelecionado = 2;
					}else if(x.name == "arvore"){
						this.idCampoSelecionado = 3
						console.log("arvore");
					}else if(x.name == "agua"){
						this.idCampoSelecionado = 1
						console.log("agua");
					}*/
					
					this.janelaCampoVasio = true;
					//
					//console.log(x);
				
					this.encontrado = true;
					break;
					
				}
	
			}
		}
		
		if(this.encontrado == false){
			this.intersects = this.raycaster.intersectObject( this.mesh );
			
			if ( this.intersects.length > 0 ) {
				let auxMapaZero = this.mapas[0];
				console.log(this.intersects);
				auxMapaZero.id = 0;
				auxMapaZero.idtile = "0";
				auxMapaZero.quantiarecursos = 0;
				auxMapaZero.x = this.intersects[ 0 ].point.x;
				auxMapaZero.z = this.intersects[ 0 ].point.z;
				
				//this.localSelecionado = this.intersects[ 0 ].point;
	
				//this.idCampoSelecionado = 0;
				//console.log(auxMapaZero );
				
				this.selectedMapa = auxMapaZero;
				
				//console.log(this.intersects[ 0 ].point);
				this.janelaCampoVasio = true;
				//this.loadModelObj('../assets/casa simples/OBJ/casa.mtl', '../assets/casa simples/OBJ/casa.obj', "casa"+this.auxNLoads.toString(), this.intersects[ 0 ].point);
			}
		}
		
		
		
	}
	
	ngAfterViewInit() {
		
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.domElement.style.display = "block";
		this.renderer.domElement.style.margin = "auto";
		this.renderer.domElement.addEventListener("mousemove", this.onMouseMove, false);
		this.renderer.domElement.addEventListener("mousedown", this.mouseDown, false);
		this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		
		//window.addEventListener( 'resize', this.onWindowResize, false );
		
		this.animate();
	}

  
	animate() {
	window.requestAnimationFrame(() => this.animate());

		// if (this.scene.getObjectByName("casa") != null){
			// this.scene.getObjectByName("casa").rotation.y = Date.now()*.002;
		// }
		
		if (this.statusLoadGame == this.totalLoadGame && this.totalLoadGame > 0){
			
			this.afterLoad();
			
		}
		
		this.scene.updateMatrixWorld();
		this.renderer.render(this.scene, this.camera);
	  
	}
	
	afterLoad(){
		console.log("completo");
		this.totalLoadGame++;
		
						
		//this.mapaService.criaMapa(this.maxRow*this.maxColl).then(mapas => this.mapas = mapas);
		this.mapaService.getConstrucaoJogador().subscribe((construcaojogador: any) => {this.construcaojogador = construcaojogador;  
			
			for(let construcao of this.construcaojogador){
				
				//this.loadModelObj('../assets/casa simples/OBJ/casa.mtl', '../assets/casa simples/OBJ/casa.obj', "casa", x.idtile,0,0);

				this.construcaoDoMapa[this.countConstrucaoDoMapa] =  this.carregaCasa.clone();
				
				this.construcaoDoMapa[this.countConstrucaoDoMapa].position.x = construcao.x;
				this.construcaoDoMapa[this.countConstrucaoDoMapa].position.y = 0;
				this.construcaoDoMapa[this.countConstrucaoDoMapa].position.z = construcao.z;
				
			
				this.construcaoDoMapa[this.countConstrucaoDoMapa].construcaojogador = construcao;
	
				//console.log(this.OBJDoMapa[this.countOBJDoMapa]);
				this.scene.add( this.construcaoDoMapa[this.countConstrucaoDoMapa] );
				//this.totalLoadGame++;
				this.countConstrucaoDoMapa++;
				
			}
		
			
			this.mapaService.getMapaDB().subscribe((mapas: any) => {this.mapas = mapas; this.criaSobreMapa(); this._timerTick();});
		});
		
		this.mapaService.atualizaInventarios().subscribe((datatime: any) => {this.datatime = datatime; this.timerTempoJogo()});

		//this.movendo();
						
	}

   ngOnInit(): void {

		
	}
	
	
	coordinates(event: MouseEvent):void {
        
		if (this.statusMoverLider){
			
			if(this.janelaLider == true){
				this.xTileDtailLider = event.clientX - (document.getElementById('moveLider').getBoundingClientRect().left - document.getElementById('janelavelLider').getBoundingClientRect().left + (document.getElementById('moveLider').getBoundingClientRect().width/4));
				this.yTileDtailLider = event.clientY - (document.getElementById('moveLider').getBoundingClientRect().top - document.getElementById('janelavelLider').getBoundingClientRect().top + (document.getElementById('moveLider').getBoundingClientRect().height/4));
			
			}
		}
		
		if (this.statusMover){
			
			if(this.janelaCampoVasio == true){
				this.xTileDtail = event.clientX - (document.getElementById('moveDetail').getBoundingClientRect().left - document.getElementById('janelavel').getBoundingClientRect().left + (document.getElementById('moveDetail').getBoundingClientRect().width/4));
				this.yTileDtail = event.clientY - (document.getElementById('moveDetail').getBoundingClientRect().top - document.getElementById('janelavel').getBoundingClientRect().top + (document.getElementById('moveDetail').getBoundingClientRect().height/2));
			
				
			}
		}
		
		if (this.statusMoverJConstrucao){
			
			if(this.janelaConstrucaoSelecionada == true){
				this.xTileDtailjConstrucao = event.clientX - (document.getElementById('moveConstrucao').getBoundingClientRect().left - document.getElementById('janelavelConstrucao').getBoundingClientRect().left + (document.getElementById('moveConstrucao').getBoundingClientRect().width/4));
				this.yTileDtailjConstrucao = event.clientY - (document.getElementById('moveConstrucao').getBoundingClientRect().top - document.getElementById('janelavelConstrucao').getBoundingClientRect().top + (document.getElementById('moveConstrucao').getBoundingClientRect().height/2));
			
				
			}
		}
		
		
    }
	
  /*
	movendo(){
		
		

		
			
		
		
		setTimeout(() => this.movendo(), 100);
	}
	  */
	_timerTick() {
		
	
		//gapi.auth2.getAuthInstance().disconnect();
		//this.timeVerificacao++;
		
		//if (this.timeVerificacao >= 5){
	
			if (gapi.auth2.getAuthInstance().currentUser.Ab.Zi == null){
				this.verificaToken = false;
				
			}else if (gapi.auth2.getAuthInstance().currentUser.Ab.Zi.id_token != Global.token){
			
				this.verificaToken = false;
			}
			
			//console.time("concatenation");
			
			//this.timeVerificacao = 0;
		//}
	
		if (this.verificaToken == true){
			
			this.mapaService.getConstrucaoJogador().subscribe((construcaojogador: any) => {this.construcaojogador = construcaojogador;
		
				
				
				
				//this.construcaoDoMapa = null;
				//this.countConstrucaoDoMapa = 0;
				
				
				
				for(let x = 0; x < this.countConstrucaoDoMapa; x++){
				//console.log(x);
					let encontrado = false;
					
					for(let construcao of this.construcaojogador){
						
						//console.log(this.construcaoDoMapa);
						//console.log(this.construcaojogador);
						
						if (this.construcaoDoMapa[x].construcaojogador.id == construcao.id){
							//console.log("igual");
							
							this.construcaoDoMapa[x].construcaojogador = construcao;
							
							this.construcaoDoMapa[x].position.x = construcao.x;
							this.construcaoDoMapa[x].position.z = construcao.z;
							
							encontrado = true;
							break;
						}
						
					}
					
					if (encontrado == false){
						//console.log(this.construcaoDoMapa);
						//console.log(this.construcaoDoMapa.filter(item => item.id !== this.construcaoDoMapa[x].id));
						
						this.scene.remove(this.construcaoDoMapa[x]);
						
						this.construcaoDoMapa = this.construcaoDoMapa.filter(item => item.id !== this.construcaoDoMapa[x].id);
						
						this.countConstrucaoDoMapa--;
					}
					
				}
				
				for(let construcao of this.construcaojogador){
					let encontrado = false;
					
					for(let x = 0; x < this.countConstrucaoDoMapa; x++){
						if (this.construcaoDoMapa[x].construcaojogador.id == construcao.id){
		
								encontrado = true;
								break;
						}
					}
					
					if (encontrado == false){
						//console.log("novo");
						
						this.construcaoDoMapa[this.countConstrucaoDoMapa] =  this.carregaCasa.clone();
					
						this.construcaoDoMapa[this.countConstrucaoDoMapa].position.x = construcao.x*5;
						//this.OBJDoMapa[this.countOBJDoMapa].position.y = 0;
						this.construcaoDoMapa[this.countConstrucaoDoMapa].position.z = construcao.z*5;
						
					
						this.construcaoDoMapa[this.countConstrucaoDoMapa].construcaojogador = construcao;
			
						//console.log(this.OBJDoMapa[this.countOBJDoMapa]);
						this.scene.add( this.construcaoDoMapa[this.countConstrucaoDoMapa] );
						//this.totalLoadGame++;
						this.countConstrucaoDoMapa++;
					}
				}
			
			
			
			});
			
			
			setTimeout(() => this._timerTick(), 5000);
		}else{
			
			
			gapi.auth2.getAuthInstance().disconnect();
			Global.email = "";
			Global.token = "";
			Global.id = "";
			
			//this.router.navigate(['login-Page']);
		}
	
	}
  
	timerTempoJogo(){

		this.datatime.segundo++;
		
		if (this.datatime.segundo >= 60){
			this.datatime.minuto++;
			this.datatime.segundo = 0;
		}
		
		if (this.datatime.minuto >= 60){
			this.datatime.hora++;
			this.datatime.minuto = 0;
		}
		
		if (this.datatime.hora > 24){
			this.datatime.dia++;
			this.datatime.hora = 0;
		}
		
		if (this.datatime.dia > 30){
			this.datatime.mes++;
			this.datatime.dia = 0;
		}
		
		
		setTimeout(() => this.timerTempoJogo(), 1000);
	}
	
	criaSobreMapa(){
		console.log("aqui");
		for(let mapa of this.mapas){
			if (mapa.idtile == "2"){
				
				this.OBJDoMapa[this.countOBJDoMapa] =  this.carregaPedra.clone();
		
				this.OBJDoMapa[this.countOBJDoMapa].position.x = mapa.x*5;
				this.OBJDoMapa[this.countOBJDoMapa].position.y = 0;
				this.OBJDoMapa[this.countOBJDoMapa].position.z = mapa.z*5;
				
				this.OBJDoMapa[this.countOBJDoMapa].mapa = mapa;
				
				this.scene.add( this.OBJDoMapa[this.countOBJDoMapa] );
				//console.log(this.OBJDoMapa[this.countOBJDoMapa]);
	
				//this.totalLoadGame++;
				this.countOBJDoMapa++;
				
			}else if (mapa.idtile == "3"){
				
				
				this.OBJDoMapa[this.countOBJDoMapa] =  this.carregaArvore.clone();
		
				this.OBJDoMapa[this.countOBJDoMapa].position.x = mapa.x*5;
				this.OBJDoMapa[this.countOBJDoMapa].position.y = 0;
				this.OBJDoMapa[this.countOBJDoMapa].position.z = mapa.z*5;
				
				this.OBJDoMapa[this.countOBJDoMapa].mapa = mapa;
				
				this.scene.add( this.OBJDoMapa[this.countOBJDoMapa] );
				//console.log(this.OBJDoMapa[this.countOBJDoMapa]);
	
				//this.totalLoadGame++;
				this.countOBJDoMapa++;
				
			}else if (mapa.idtile == "1"){
				
				this.OBJDoMapa[this.countOBJDoMapa] =  this.carregaAgua.clone();
		
				this.OBJDoMapa[this.countOBJDoMapa].position.x = mapa.x*5;
				this.OBJDoMapa[this.countOBJDoMapa].position.y = 0;
				this.OBJDoMapa[this.countOBJDoMapa].position.z = mapa.z*5;
				
				this.OBJDoMapa[this.countOBJDoMapa].mapa = mapa;
				
				this.scene.add( this.OBJDoMapa[this.countOBJDoMapa] );
				//console.log(this.OBJDoMapa[this.countOBJDoMapa]);
	
				//this.totalLoadGame++;
				this.countOBJDoMapa++;
				
			}
		}
	  
	}
  
	resetaJanelas(){
		//this.janelaLider = false;
		//this.janelaConstrucaoSelecionada = false;
		//this.janelaCampoVasio = false;
		this.selectedMapa = this.vasioMapa; 
		this.linhaCelecionada = -1;
		this.colunaCelecionada = -1;
	  
	}


  /*
	onSelect(mapa: Mapa): void {
	  
		this.resetaJanelas();

		this.selectedMapa = mapa;
		
		if(this.existeConstrucao(this.selectedMapa) == false){
			//if (this.selectedMapa.idtile == "0"){	
				this.janelaCampoVasio = true;
			//}
			
		}else{

			if (this.construcaoDesteJogador(mapa) == true){
			
				if (this.idConstrucaoNoMapa == 0){
					this.janelaLider = true;
				}else{
					this.janelaConstrucaoSelecionada = true;
				}
			}
			
		}
		

	}*/

	/*
	onClickCell(L:number, C:number) {
		
		this.linhaCelecionada = L;
		this.colunaCelecionada = C;
    }*/
	
	/*
	existeConstrucao(MAPA: Mapa): any{
		
		for(let x of this.construcaojogador){
			
			if (x.idtile == MAPA.id){
				this.idConstrucaoNoMapa = x.idconstrucao;
				this.imgConstrucaoNoMapa = x.img;
				//console.log(this.imgConstrucaoNoMapa);
				return true;
			}
			
		}
		
		return false;
	}
  */
 
	/*construcaoDesteJogador(MAPA: Mapa): any{
		
		for(let x of this.construcaojogador){
			
			if (x.idtile == MAPA.id){
	
				
				if(x.idgooglejogador == Global.id){
					return true;
					
				}
		
			}
			
		}
		
		
		//Global.token
		
	}*/
 
 
}