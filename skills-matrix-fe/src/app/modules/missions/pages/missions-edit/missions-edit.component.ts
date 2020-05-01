import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MissionService} from "../../../../core/services/mission/mission.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-missions-edit',
  templateUrl: './missions-edit.component.html',
  styleUrls: ['./missions-edit.component.css']
})
export class MissionsEditComponent {

  modifyForm: FormGroup;

  firstName: String;
  lastName: String;
  projectName: String;
  positionName: String;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;

  constructor(private missionService: MissionService, private router: Router,
              private formBuilder: FormBuilder, private route: ActivatedRoute) {
    
    // Subscribe with RxJS to the mission
    this.missionService.currentFirstName.subscribe(firstName => this.firstName = firstName);
    this.missionService.currentLastName.subscribe(lastName => this.lastName = lastName);
    this.missionService.currentProjectName.subscribe(projectName => this.projectName = projectName);
    this.missionService.currentPositionName.subscribe(positionName => this.positionName = positionName);
    this.missionService.currentStartDate.subscribe(startDate => this.startDate = startDate);
    this.missionService.currentEndDate.subscribe(endDate => this.endDate = endDate);
    this.missionService.currentIsActive.subscribe(isActive => this.isActive = isActive);

    this.modifyForm = this.formBuilder.group({
      first_name: [this.firstName, []],
      last_name: [this.lastName, []],
      project_name: [this.projectName, []],
      position_name: [this.positionName, []],
      start_date: [this.startDate, Date, Validators.required],
      end_date: [this.endDate, Date, Validators.required],
      is_active: [this.isActive],
    });

  }

  updateMission(start_date, end_date, is_active: Boolean){
    const id = this.route.snapshot.paramMap.get('id');
    this.missionService.updateMission(id, start_date, end_date, is_active).subscribe(() => {
      this.router.navigate(['/missions']);
    });
  }
}
