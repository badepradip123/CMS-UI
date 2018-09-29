import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from "ng-flash-messages";
import { AuthService } from "../authentication/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessageService: NgFlashMessageService,
    private authService: AuthService,
    private router: Router
              ) { }

  ngOnInit() {
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: ["You are now logout"],              
      // Time after which the flash disappears defaults to 2000ms
      timeout: 3000,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'success'
    });
    this.router.navigate(['/login']);
    return false;
  }

}
