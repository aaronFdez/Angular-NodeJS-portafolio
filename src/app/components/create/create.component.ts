import {Component} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
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

  onSubmit(projectForm: NgForm) {
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
        response => {
          console.log(response);
            // if (response.project) {
            //     this.status = 'success';
            //     this.project = response.project;
            //     projectForm.reset();
            // } else {
            //     this.status = 'failed';
            // }
        },
        error => {
            console.log(<any>error);
        }
    );
  }
}
