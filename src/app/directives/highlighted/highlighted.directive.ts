import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appHighlighted]'
})
export class HighlightedDirective {

	constructor(public elem: ElementRef) {

	}

	ngOnInit() {
		console.log("Directiva");
		console.log(this.elem.nativeElement);

		var element = this.elem.nativeElement;
		element.style.background = "blue";
		element.style.padding = "20px";
		element.style.marginTop = "15px";
		element.style.color = "white";

		console.log(element.innerText);
		element.innerText = element.innerText.toUpperCase().replace("CUALQUIER", "UNA");
	}

}