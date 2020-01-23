import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MissionService} from "../../../../core/services/mission/mission.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Resource} from "../../../../core/models/resource/resource.model";
import {Project} from "../../../../core/models/project/project.model";
import {ProjectService} from "../../../../core/services/project/project.service";
import {ResourceService} from "../../../../core/services/resource/resource.service";
import {PositionService} from "../../../../core/services/position/position.service";
import {Position} from '../../../../core/models/position/position.model';

@Component({
  selector: 'app-missions-edit',
  templateUrl: './missions-edit.component.html',
  styleUrls: ['./missions-edit.component.css']
})
export class MissionsEditComponent implements OnInit {

  createForm: FormGroup;

  resources: Resource[];
  projects: Project[];
  positions: Position[];


  constructor(private missionService: MissionService, private projectService: ProjectService,
              private resourceService: ResourceService, private positionService: PositionService,
              private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.createForm = this.formBuilder.group({
      resource_id: ['', Validators.required],
      project_id: ['', Validators.required],
      position_id: ['', Validators.required],
      start_date: [Date, Validators.required],
      end_date: [Date, Validators.required],
    });
  }

  ngOnInit() {
    this.resourceService.getResources().subscribe((response: any) => {
      this.resources = response.data;
    });
    this.projectService.getProjects().subscribe((response: any) => {
      this.projects = response.data;
    });
    this.positionService.getPositions().subscribe((response: any) => {
      this.positions = response.data;
    });

  }

  // tslint:disable-next-line:variable-name
  addMission(resource_id, project_id, position_id, start_date, end_date) {
    this.missionService.createMission(resource_id, project_id, position_id, start_date, end_date).subscribe(() => {
      this.router.navigate(['/missions']);
    });
  }

  //addMission(missionResource.value, missionProject.value, missionPosition.value,  start_date.value, end_date.value)
  updateMission(missionResource, missionProject, missionPosition,  start_date, end_date){
    const id = this.route.snapshot.paramMap.get('id');
    console.log('The id is: ' + id);
    console.log('The new name is: ' + name);
    this.missionService.updateMission(id, missionResource, missionProject, missionPosition,  start_date, end_date).subscribe(() => {
      this.router.navigate(['/skills']);
    });
  }
}
