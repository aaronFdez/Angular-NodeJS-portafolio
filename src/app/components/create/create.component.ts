import {Component} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService]
})

export class CreateComponent {
  public title: string;
  public project: Project;
  public status: string;
  // public saveProject;
  public currentYear = new Date().getFullYear();


  constructor(
    private _projectService: ProjectService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', this.currentYear, '', '');
    this.status = 'pending';
  }
}
