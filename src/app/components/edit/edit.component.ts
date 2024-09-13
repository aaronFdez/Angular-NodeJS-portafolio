import { Component, OnInit } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from "../../services/project.service";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../models/project";


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ProjectFormComponent],
  template: `<app-project-form [title]="title" [project]="project" [isEditMode]="true"></app-project-form>`,
  providers: [ProjectService]
})
export class EditComponent implements OnInit {
  public title = "Editar Proyecto";
  public project: Project = new Project('', '', '', '', new Date().getFullYear(), '', '');

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
    });
  }

  getProject(id: string) {
    this._projectService.getProject(id).subscribe(
      (response: any) => {
        this.project = response.project;
      },
      error => {
        console.error(error);
      }
    );
  }
}
