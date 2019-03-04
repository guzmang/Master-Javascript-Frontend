import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService {
	public url: string;

	constructor() {
		this.url = Global.url;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
		return new Promise(function(resolve, reject) {
			var formData: any = new FormData();		// simulamos un formulario
			var xhr = new XMLHttpRequest();			// tipo de objecto de peticiones asincronas en JS, xhr es como AJAX

			for(let file in files) {
				formData.append(name, files[file], files[file].name);
			}

			// peticion AJAX
			xhr.onreadystatechange = function() {	// cuando haya algun cambio
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			}

			// hago la peticion por POST
			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}