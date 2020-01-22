import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit {

  createForm: FormGroup;

  constructor(private skillService: SkillService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  updateSkill(name){
    const id = this.route.snapshot.paramMap.get('id');
    console.log('The id is: ' + id);
    console.log('The new name is: ' + name);
    this.skillService.updateSkill(name, id).subscribe(() => {
      this.router.navigate(['/skills']);
    });
  }
}
