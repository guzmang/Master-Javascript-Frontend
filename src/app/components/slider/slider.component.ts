import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
	selector: 'slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
	@Input() anchura: number;
	@Input("etiquetas") captions: boolean;
	@Output() conseguirAutor = new EventEmitter();

	public autor: any;

	constructor() {
		this.autor = {
			nombre: "Victor Robles",
			website: "victorroblesweb.es",
			youtube: "Victor Robles WEB"
		}
	}

	ngOnInit() {
  	//	prueba jQuery
/*  	
	  	$("#logo").click(function(e) {
	  		e.preventDefault();
	  		$("header").css("background", "green")
	  					.css("height", "50px");
	  		});
*/
		$('.galeria').bxSlider({
			mode: 'fade',
			captions: this.captions,
			slideWidth: this.anchura
		});

	}

	// este metodo emite el evento que creamos para pasar la prop del hijo al padre
	lanzar(event) {
		console.log(event);
		this.conseguirAutor.emit(this.autor);	// lanzar evento
	}

}
