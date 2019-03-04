import { Component, OnInit, ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	public widthSlider: number;
	public anchuraToSlider: number;
	public captions: boolean;
	public autor: any;
	@ViewChild("textos") textos;

	constructor() {
		this.captions = false;
	}

	ngOnInit() {
		var opcionClasica = document.querySelector("#texto").innerHTML;
		console.log("opcionClasica", opcionClasica);
		console.log(this.textos);
		console.log(this.textos.nativeElement.innerHTML);
		console.log(this.textos.nativeElement.textContent);
	}

	cargarSlider() {
		this.anchuraToSlider = this.widthSlider;
		$("#ancho").prop('disabled', true);
	}

	resetearSlider() {
		this.anchuraToSlider = null;
		$("#ancho").prop('disabled', false);
	}

	getAutor(event) {
		console.log(event);
		this.autor = event;
	}

}