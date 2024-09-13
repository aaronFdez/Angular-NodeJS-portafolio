import { Component } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from "../../models/project";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ProjectFormComponent],
  template: `<app-project-form [title]="title" [project]="project" [isEditMode]="false"></app-project-form>`,
})
export class CreateComponent {
  public title = "Crear Proyecto";
  public project: Project = new Project('', '', '', '', new Date().getFullYear(), '', '');
}
