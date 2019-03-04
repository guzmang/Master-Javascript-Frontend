import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css'],
	providers: [ProjectService]
})
export class DetailComponent implements OnInit {
	public url: string;
	public project: Project;
	public confirm: boolean;

	constructor(
		private _projectService: ProjectService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.url = Global.url;
		this.confirm = false;
	}

	// importo Router, ActivatedRoute y Params para obtener el id de la url
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

	deleteProject(id) {
		this._projectService.deleteProject(id).subscribe(
			response => {
				if(response.project) {
					this._router.navigate(['/proyectos']);		// redirijo a esa pagina
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	setConfirm(confirm) {
		this.confirm = confirm;
	}

}