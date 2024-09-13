import { Component, Input } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { UploadService } from "../../services/upload.service";
import { FormsModule, NgForm } from "@angular/forms";
import { NgIf } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
import { global } from "../../services/global";

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    RouterModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  @Input() public title: string = '';
  @Input() public project: Project = new Project('', '', '', '', new Date().getFullYear(), '', '');
  @Input() public isEditMode: boolean = false;
  public status: string = 'pending';
  public filesToUpload: Array<File> = [];
  public save_project: any;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {}

  onSubmit(projectForm: NgForm) {
    if (this.isEditMode) {
      this.updateProject(projectForm);
    } else {
      this.createProject(projectForm);
    }
  }

  createProject(projectForm: NgForm) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          if (this.filesToUpload.length > 0) {
            this.uploadImage(response.project._id, projectForm);
          } else {
            this.save_project = response.project;
            this.status = 'success';
            projectForm.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        this.status = 'failed';
        console.error('Error al guardar el proyecto:', error);
      }
    );
  }

  updateProject(projectForm: NgForm) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          if (this.filesToUpload.length > 0) {
            this.uploadImage(response.project._id, projectForm);
          } else {
            this.save_project = response.project;
            this.status = 'success';
            projectForm.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        this.status = 'failed';
        console.error('Error al actualizar el proyecto:', error);
      }
    );
  }

  uploadImage(projectId: string, projectForm: NgForm) {
    this._uploadService.makeFileRequest(global.url + 'upload-image/' + projectId, [], this.filesToUpload, 'image')
      .then(result => {
        this.save_project = result.project;
        this.status = 'success';
        projectForm.reset();
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
        this.status = 'failed';
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = Array.from(fileInput.target.files);
  }
}
