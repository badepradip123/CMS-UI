import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from "ng-flash-messages";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
      private flashMessageService: NgFlashMessageService,
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user  = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe( data => {
      if (data.success) {
          this.authService.storeUserData(data.token,data.user);
        
        this.flashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You are now loggedin"],              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['/dashboard']) 
        
      } else {
        this.flashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: data.msg,              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        this.router.navigate(['/login'])        
      }
    })

  }
}
