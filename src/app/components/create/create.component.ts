import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
	providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService
	) {
		this.title = "Crear proyecto";
		this.project = new Project('', '', '', '', new Date().getFullYear(), '', '');
	}

	ngOnInit() {
	}

	onSubmit(form) {
		console.log(this.project);

		// Guardar datos basicos
		this._projectService.saveProject(this.project).subscribe(
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
								this.status = "success";
								console.log(form);
								form.reset();
							});
					} else {
						this.save_project = response.project;
						this.status = "success";
						console.log(form);
						form.reset();
					}

				} else {
					this.status = "failed";
				}
			},
			error => {
				console.log(<any>error);
				this.status = "failed";
			}
		);
	}

	fileChangeEvent(fileInput: any) {
		console.log(fileInput);
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}