import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ResourcesCreateComponent} from './pages/resources-create/resources-create.component';
import {ResourcesEditComponent} from './pages/resources-edit/resources-edit.component';
import {ResourcesListComponent} from './pages/resources-list/resources-list.component';
import {ResourcesViewComponent} from './pages/resources-view/resources-view.component';
import {ResourcesAddCompetenciesComponent} from "./pages/resources-add-competencies/resources-add-competencies.component";

const resourcesRoutes: Routes = [
  { path: 'resources/create', component: ResourcesCreateComponent },
  { path: 'resources', component: ResourcesListComponent },
  { path: 'resources/:id', component: ResourcesViewComponent },
  { path: 'resources/:id/edit', component: ResourcesEditComponent },
  {path: 'resources/:id/competencies', component: ResourcesAddCompetenciesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(resourcesRoutes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
