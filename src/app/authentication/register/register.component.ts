import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../services/validate.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  name: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private flashMessageService: NgFlashMessageService,
              private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please filled all fileds"],        
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3000  ,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;      
    } 

    // Required email in proper format
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Enter validate email"],              
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;      
    }
    
    //Register User
    this.authService.registerUser(user).subscribe(data => {
          if(data.success){
            this.flashMessageService.showFlashMessage({
              // Array of messages each will be displayed in new line
              messages: ["You are registered and can login in"],              
              // Time after which the flash disappears defaults to 2000ms
              timeout: 3000,
              // Type of flash message, it defaults to info and success, warning, danger types can also be used
              type: 'success'
            });
            this.router.navigate(['/login']);
          }else{    
            this.flashMessageService.showFlashMessage({
              // Array of messages each will be displayed in new line
              messages: ["Something Went Wrong"],              
              // Time after which the flash disappears defaults to 2000ms
              timeout: 3000,
              // Type of flash message, it defaults to info and success, warning, danger types can also be used
              type: 'success'
            });
            this.router.navigate(['/register']);

          }
    });

  }
}
