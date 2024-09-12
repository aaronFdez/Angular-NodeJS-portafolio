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

  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', this.currentYear, '', '');
    this.status = 'pending';
    this.filesToUpload = [];
  }

  onSubmit(projectForm: NgForm) {
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      (response: any) => {  // Cambié 'ProjectResponse' a 'any' para manejar cualquier respuesta
        if (response.project) {
          if (this.filesToUpload && this.filesToUpload.length > 0) {
            // Subir imágenes solo si hay archivos
            this._uploadService.makeFileRequest(global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                console.log(result);
                this.status = 'success';
                projectForm.reset();
              })
              .catch((error: any) => {
                console.error('Error uploading files:', error);
                this.status = 'failed';
              });
          } else {
            // Si no hay archivos, simplemente marca como éxito
            this.status = 'success';
            projectForm.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }
}
