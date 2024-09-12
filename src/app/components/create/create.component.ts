import {Component} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {UploadService} from "../../services/upload.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProjectResponse} from "../../models/project-response";
import {RouterLink} from "@angular/router";
import {global} from "../../services/global";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService]
})
export class CreateComponent {
  public title: string;
  public project: Project;
  public status: string;
  public currentYear = new Date().getFullYear();
  public filesToUpload: Array<File>;
  public save_project: any;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', this.currentYear, '', '');
    this.status = 'pending';
    this.filesToUpload = [];
  }

  onSubmit(projectForm: NgForm) {
    this._projectService.saveProject(this.project).subscribe(
      (response: any) => {
        if (response.project) {

          if (this.filesToUpload && this.filesToUpload.length > 0) {
            this.uploadImage(response.project._id, projectForm);
          } else {
            this.save_project = response.project;
            this.status = 'success';
            projectForm.reset();
          }
        } else {
          this.status = 'failed';
          console.error('No se pudo guardar el proyecto.');
        }
      },
      error => {
        this.status = 'failed';
        console.error('Error al guardar el proyecto:', error);
      }
    );
  }

  uploadImage(projectId: string, projectForm: NgForm) {
    this._uploadService.makeFileRequest(global.url + 'upload-image/' + projectId, [], this.filesToUpload, 'image')
      .then((result: any) => {
        this.save_project = result.project;
        this.status = 'success';
        projectForm.reset();
      })
      .catch((error: any) => {
        console.error('Error al subir la imagen:', error);
        this.status = 'failed';
      });
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }
}
