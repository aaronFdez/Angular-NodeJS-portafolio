import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import { global} from "../../services/global";
import {NgForOf, NgIf} from "@angular/common";
import {RemovePrefixPipe} from "../../remove-prefix.pipe";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RemovePrefixPipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(
      private _projectService: ProjectService
  ) {
      this.projects = [];
      this.url = global.url;
  }

  ngOnInit() {
      this.getProjects();
  }

  getProjects() {
      this._projectService.getProjects().subscribe(
          response => {
              if (response.projects) {
                this.projects = response.projects;
              }
          },
          error => {
              console.log(<any>error);
          }
      );
  }
}
