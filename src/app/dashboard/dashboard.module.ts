import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule,Routes } from "@angular/router";

const appRoutes : Routes = [
  { path: 'dashboard' ,  component: DashboardComponent}  
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  declarations: 
  [
    DashboardComponent,
    ProfileComponent   
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
