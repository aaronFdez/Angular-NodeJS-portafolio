import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {global} from "../../services/global";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../models/project";
import {NgIf} from "@angular/common";
import {RemovePrefixPipe} from "../../remove-prefix.pipe";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgIf,
    RemovePrefixPipe
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
      console.log(params)
      console.log(this.project)
      this.getProject(id);
    });
  }

  getProject(id : any) {
    this._projectService.getProject(id).subscribe(
        (response: any) => {
            this.project = response.project;
        },
        (error: any) => {
            console.log(<any>error);
        }
    );
  }

}
