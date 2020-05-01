import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  uri = 'http://localhost:3000/v1';

    // Values to change with the method changeMission()
    private nameSource = new BehaviorSubject<String>(null);
    private project_otp_codeSource = new BehaviorSubject<String>(null);
    private start_dateSource = new BehaviorSubject<Date>(null);
    private end_dateSource = new BehaviorSubject<Date>(null);
    currentName = this.nameSource.asObservable();
    currentProject_otp_code = this.project_otp_codeSource.asObservable();
    currentStartDate = this.start_dateSource.asObservable();
    currentEndDate = this.end_dateSource.asObservable();

    changeProject( name,project_otp_code, start_date, end_date)  {
      this.nameSource.next(name);
      this.project_otp_codeSource.next(project_otp_code);
      this.start_dateSource.next(start_date);
      this.end_dateSource.next(end_date);
    }

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.uri}/projects`);
  }

  createProject(name, project_otp_code, start_date, end_date): Observable<any> {
   
    const project = {
      name: name,
      project_otp_code: project_otp_code,
      start_date: start_date,
      end_date: end_date
    };
    console.log("added Project", project);

    return this.http.post(`${this.uri}/projects`, project, {responseType: 'json', observe: 'response'});
  }

  getProjectById(id): Observable<any> {
    return this.http.get(`${this.uri}/projects/${id}`);
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(`${this.uri}/projects/${id}`);
  }

  updateProject (name, id, project_otp_code,start_date,end_date ): Observable<any>  {
    const project = {
      name: name,
      project_otp_code: project_otp_code,
      start_date: start_date,
      end_date: end_date
    };
    console.log('modified Project', project);
    return this.http.put(`${this.uri}/projects/${id}`, project);
  }

}
