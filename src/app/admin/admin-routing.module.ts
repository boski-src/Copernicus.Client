import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OverviewComponent } from './overview/overview.component';
import { QuestionsComponent } from './questions/questions.component';

const routes : Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'questions', component: QuestionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
