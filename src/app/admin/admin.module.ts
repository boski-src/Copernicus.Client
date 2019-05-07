import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OverviewComponent } from './overview/overview.component';
import { QuestionsComponent } from './questions/questions.component';
import { CreateQuestionFormComponent } from './questions/create-question-form/create-question-form.component';

@NgModule({
  declarations: [AdminComponent, OverviewComponent, QuestionsComponent, CreateQuestionFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
