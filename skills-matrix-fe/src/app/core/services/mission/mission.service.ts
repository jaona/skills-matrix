import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mission } from '../../models/mission/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  uri = 'http://localhost:3000/v1';

  // Values to change with the method changeMission()
  private first_nameSource = new BehaviorSubject<String>(null);
  private last_nameSource = new BehaviorSubject<String>(null);
  private project_nameSource = new BehaviorSubject<String>(null);
  private position_nameSource = new BehaviorSubject<String>(null);
  private start_dateSource = new BehaviorSubject<Date>(null);
  private end_dateSource = new BehaviorSubject<Date>(null);
  private is_activeSource = new BehaviorSubject<String>(null);
  currentFirstName = this.first_nameSource.asObservable();
  currentLastName = this.last_nameSource.asObservable();
  currentProjectName = this.project_nameSource.asObservable();
  currentPositionName = this.position_nameSource.asObservable();
  currentStartDate = this.start_dateSource.asObservable();
  currentEndDate = this.end_dateSource.asObservable();
  currentIsActive = this.is_activeSource.asObservable();

  constructor(private http: HttpClient) {
  }

  // Call next on behaviour subjects to change current values
  changeMission(first_name, last_name, project_name, position_name, start_date, end_date, is_active){
    this.first_nameSource.next(first_name);
    this.last_nameSource.next(last_name);
    this.project_nameSource.next(project_name);
    this.position_nameSource.next(position_name);
    this.start_dateSource.next(start_date);
    this.end_dateSource.next(end_date);
    this.is_activeSource.next(is_active);
  }

  getMissions() {
    return this.http.get(`${this.uri}/missions`);
  }

  getMissionById(id) {
    return this.http.get(`${this.uri}/missions/${id}`);
  }

  /*createMission(project_id, name, description) {
    const position = {
      name: name,
      project_id: project_id,
      description: description
    };
    console.log("added Position", position);
    return this.http.post(`${this.uri}/positions`, position);
  }*/

  // tslint:disable-next-line:variable-name
  createMission(resource_id, project_id, position_id, start_date, end_date) {
    const mission = {
        resource_id: resource_id,
        project_id: project_id,
        position_id: position_id,
        start_date: start_date,
        end_date: end_date
      }
    ;
    console.log('added Mission', mission);
    return this.http.post(`${this.uri}/missions`, mission);
  }

  updateMission(id, start_date, end_date, is_active): Observable<any> {
    const mission = {
        start_date: start_date,
        end_date: end_date,
        is_active: is_active
      }
    ;
    console.log('modified Mission: ', mission);
    return this.http.put(`${this.uri}/missions/${id}`, mission);
  }

  getMissionsByProjectId(project_id) {
    return this.http.get(`${this.uri}/missions?project_id=${project_id}`);
  }

  deleteMission(id) {
    return this.http.delete(`${this.uri}/missions/${id}`);
  }

}
