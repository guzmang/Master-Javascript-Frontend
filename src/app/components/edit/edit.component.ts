import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
	selector: 'app-edit',
	templateUrl: '../create/create.component.html',
	styleUrls: ['./edit.component.css'],
	providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,				// servicios de ruta para usar params
		private _router: Router						// servicios de ruta para usar params
	) {
		this.title = "Editar proyecto";
		this.url = Global.url;
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			let id = params.id;

			this.getProject(id);
		});
	}

	getProject(id) {
		this._projectService.getProject(id).subscribe(
			response => {
				this.project = response.project;
			},
			error => {
				console.log(<any>error);
				console.log("El proyecto no existe.");
			}
		);
	}

	onSubmit() {
		this._projectService.updateProject(this.project).subscribe(
			response => {
				console.log(response);
				if(response.project) {
					// Subir la imagen
					if(this.filesToUpload) {
						this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id,
															[],
															this.filesToUpload,
															"image")	// en la API en su controlador (linea 117) le indico el nombre: var filePath = req.files.image.path; el be lo procesa de esa manera
							.then((result: any) => {
								console.log(result);
								this.save_project = result.project;
								this.status = "updated";
							});
					} else {
						this.save_project = response.project;
						this.status = "updated";
					}

				} else {
					this.status = "not_updated";
				}
			},
			error => {
				console.log(<any>error);
				console.log("El proyecto no existe.");
			}
		);
	}

	fileChangeEvent(fileInput: any) {
		console.log(fileInput);
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}