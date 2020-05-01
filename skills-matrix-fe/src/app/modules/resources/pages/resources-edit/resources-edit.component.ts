import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResourceService } from "../../../../core/services/resource/resource.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-resources-edit',
  templateUrl: './resources-edit.component.html',
  styleUrls: ['./resources-edit.component.css']
})
export class ResourcesEditComponent implements OnInit {
  createForm: FormGroup;
  name: String;
  first_name: String;
  last_name: String;
  employee_number: String;
  email: String;

  constructor(private resourceService: ResourceService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    // Subscribe with RxJS to the mission
    this.resourceService.currentName.subscribe(name => this.name = name);
    this.resourceService.currentFirst_name.subscribe(first_name => this.first_name = first_name);
    this.resourceService.currentLast_name.subscribe(last_name => this.last_name = last_name);
    this.resourceService.currentEmployee_number.subscribe(employee_number => this.employee_number = employee_number);
    this.resourceService.currentEmail.subscribe(email => this.email = email);

    //subscribe to service
    this.createForm = this.formBuilder.group({
      name: [this.name, []],
      first_name: [this.first_name, []],
      last_name: [this.last_name, []],
      employee_number: [this.employee_number, []],
      email: [this.email, []]
    });
  }


  ngOnInit() {
  }

  updateResource(first_name, last_name, employee_number, email) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resourceService.updateResource(id, first_name, last_name, employee_number, email).subscribe(() => {
      this.router.navigate(['/resources']);
    });
  }

}
