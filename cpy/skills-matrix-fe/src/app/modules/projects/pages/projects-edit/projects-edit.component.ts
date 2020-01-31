import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../core/services/project/project.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})


export class ProjectsEditComponent implements OnInit {
  createForm: FormGroup;
  name: String;
  project_otp_code: String;
  startDate: Date;
  endDate: Date;
  constructor(private projectService: ProjectService, private router: Router,
     private formBuilder: FormBuilder, private route: ActivatedRoute) {

        // Subscribe with RxJS to the mission
        this.projectService.currentName.subscribe(name => this.name = name);
        this.projectService.currentProject_otp_code.subscribe(project_otp_code => this.project_otp_code = project_otp_code);
        this.projectService.currentStartDate.subscribe(startDate => this.startDate = startDate);
        this.projectService.currentEndDate.subscribe(endDate => this.endDate = endDate);

    //subscribe to service
    this.createForm = this.formBuilder.group({
      name: [this.name,[]],
      project_otp_code: [this.project_otp_code,[]],
      start_date: [this.startDate, Date,[]],
      end_date: [this.endDate, Date,[]],
    });
  }

  ngOnInit() {
    componentTitle: String;
  }

  updateProject(name,project_otp_code,start_date,end_date){
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.updateProject(name, id,project_otp_code,start_date,end_date).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }


}
