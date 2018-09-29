import { Component, OnInit } from '@angular/core';
import { ContactService } from "../services/contact.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
     private contactService: ContactService,
     private  router: Router
  ) { }

  ngOnInit() {
    this.contactService.getProfile().subscribe(profile => {
      this.user = profile;
    },
    err => {
      console.log(err);
      return false;      
    }
  );

  }

  

}
