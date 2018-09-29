import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';

const appRoutes : Routes = [
  { path: 'login' ,  component: LoginComponent},
  { path: 'register' ,  component: RegisterComponent}  
] 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,NgFlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent,RegisterComponent]
})
export class AuthenticationModule { }
