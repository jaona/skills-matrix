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
import { Mission } from 'src/app/core/models/mission/mission.model';

@Component({
  selector: 'app-missions-edit',
  templateUrl: './missions-edit.component.html',
  styleUrls: ['./missions-edit.component.css']
})
export class MissionsEditComponent implements OnInit {

  modifyForm: FormGroup;

  firstName: String;
  lastName: String;
  projectName: String;
  positionName: String;
  startDate: Date;
  endDate: Date;
  isActive: String;

  constructor(private missionService: MissionService, private projectService: ProjectService,
              private resourceService: ResourceService, private positionService: PositionService,
              private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    
    // Subscribe with RxJS to the mission
    this.missionService.currentFirstName.subscribe(firstName => this.firstName = firstName);
    this.missionService.currentLastName.subscribe(lastName => this.lastName = lastName);
    this.missionService.currentProjectName.subscribe(projectName => this.projectName = projectName);
    this.missionService.currentPositionName.subscribe(positionName => this.positionName = positionName);
    this.missionService.currentStartDate.subscribe(startDate => this.startDate = startDate);
    this.missionService.currentEndDate.subscribe(endDate => this.endDate = endDate);
    this.missionService.currentIsActive.subscribe(isActive => this.isActive = isActive);

    this.modifyForm = this.formBuilder.group({
      start_date: [this.startDate, Date, Validators.required],
      end_date: [this.endDate, Date, Validators.required],
      is_active: [this.isActive, Validators.required]
    });

  }

  ngOnInit() {

  }

  updateMission(start_date, end_date, is_active){
    const id = this.route.snapshot.paramMap.get('id');
    this.missionService.updateMission(id, start_date, end_date, is_active).subscribe(() => {
      this.router.navigate(['/missions']);
    });
  }
}
