import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {global} from "../../services/global";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Project} from "../../models/project";
import {NgIf} from "@angular/common";
import {RemovePrefixPipe} from "../../remove-prefix.pipe";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgIf,
    RemovePrefixPipe,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project | undefined;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
    });
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      (response: any) => {
        this.project = response.project;
      },
      (error: any) => {
        console.log(<any>error);
      }
    );
  }

  deleteProject(id: any) {
    this._projectService.deleteProject(id).subscribe(
      (response: any) => {
        this._router.navigate(['/proyectos']);
      },
      (error: any) => {
        console.log(<any>error);
      }
    );
  }


  updateProject(_id: string) {

  }

  getImageUrl(): string {
    if (!this.project) {
      return `${this.url}get-image/uploads/no-image.jpg`;
    }

    const imagePath = this.project.image ?? 'uploads/no-image.jpg';
    const imagePathWithoutPrefix = this.removePrefix(imagePath, 'uploads/');
    return `${this.url}get-image/${imagePathWithoutPrefix}`;
  }

  removePrefix(path: string, prefix: string): string {
    if (path.startsWith(prefix)) {
      return path.substring(prefix.length);
    }
    return path;
  }

}
