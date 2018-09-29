import { Component, OnInit } from '@angular/core';
import { ContactService } from "../services/contact.service";
import { Contact } from "../contact";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contacts: Contact[]; 
  name: String;
  phone: String;
  user: String;
  show: any=[];
  constructor(
    private contactService: ContactService,
    private router: Router,
    private flashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts);
  }

  addContact(){
    
    let newContact = {
      name: this.name,     
      phone: this.phone,
      user: '123'
    }
    this.contactService.addContact(newContact)
        .subscribe(contact => {          
          this.contacts.push(contact);
          if (contact.success) {
            this.flashMessageService.showFlashMessage({
              // Array of messages each will be displayed in new line
              messages: ["You are added contact sucessfully"],              
              // Time after which the flash disappears defaults to 2000ms
              timeout: 5000,
              // Type of flash message, it defaults to info and success, warning, danger types can also be used
              type: 'success'
            });   
            // console.log(newContact);         
          }
          this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts); 
    this.contactService.addContact(newContact)
        // console.log(contact.success);

        });
  }
  deleteContact(id : any){
    let contacts = this.contacts;
    this.contactService.deleteContact(id)
        .subscribe( data=> {
          if (data.n==1) {
            this.flashMessageService.showFlashMessage({
              // Array of messages each will be displayed in new line
              messages: ["You are deleted contact sucessfully"],              
              // Time after which the flash disappears defaults to 2000ms
              timeout: 5000,
              // Type of flash message, it defaults to info and success, warning, danger types can also be used
              type: 'danger'
            });    
          }
          this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts);
        });
      }

}
