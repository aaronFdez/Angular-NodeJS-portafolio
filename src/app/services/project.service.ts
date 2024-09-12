import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {global} from './global';
import { ProjectResponse } from '../models/project-response';

@Injectable()
export class ProjectService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  testService() {
    return 'Probando el servicio de Angular';
  }

  saveProject(project: Project): Observable<ProjectResponse> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<ProjectResponse>(this.url + 'save-project', params, {headers: headers});
  }

  getProjects(): Observable<any> {
    return this._http.get(this.url + 'projects');
  }
}
