import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../../core/services/mission/mission.service';
import {Router} from '@angular/router';
import {GetMissionsServiceResponse, Mission} from '../../../../core/models/mission/mission.model';


@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent implements OnInit {

  missions: any[];
  displayedColumns = ['id', 'resource_id', 'first_name', 'last_name', 'project_id', 'project_name', 'position_id', 'position_name', 'start_date', 'end_date', 'is_active', 'actions'];

  constructor(private missionService: MissionService, private router: Router) {
  }

  ngOnInit() {
    this.fetchMissions();
  }

  fetchMissions() {
    this.missionService
      .getMissions()
      .subscribe((getMissionsServiceResponse: GetMissionsServiceResponse) => {
        this.missions = getMissionsServiceResponse.data;
        console.log(this.missions);
      });
  }

  async viewMission(id) {
    await this.router.navigate([`/missions/${id}`]);
  }

  deleteMission(id) {
    this.missionService
      .deleteMission(id)
      .subscribe(() => {
        this.fetchMissions();
      });
  }

  editMission(id, first_name, last_name, project_name, position_name, start_date, end_date, is_active) {
    // Passing to edit component (sibiling) the data of the mission clicked
    this.missionService.changeMission(first_name, last_name, project_name, position_name, start_date, end_date, is_active);
    this.router.navigate([`/missions/${id}/edit`]);
  }  
}
