import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
//import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  // retriving contacts
  getContacts()
  {
    this.loadToken();
    console.log('----'+this.user+'--------------');
    return this.http.get('http://localhost:3000/userContact/contacts/'+JSON.parse(this.user))
      .pipe(
        map( res => res.json())
      );
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken()
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .pipe(
      map( res => res.json())
    );
  }

    //add contact 
    addContact(newContact){
      let headers = new Headers();
      headers.append('Content-Type','application/json');      
      return this.http.post('http://localhost:3000/userContact/contact', newContact, {headers: headers})
      .pipe(
        map( res => res.json())
      );     

    }

    //delete contact
    deleteContact(id){
      return this.http.delete('http://localhost:3000/userContact/contact/'+id)
      .pipe(
        map( res => res.json())
      );
    }

  loadToken(){
    const token =   localStorage.getItem('id_token');
    const user  =   localStorage.getItem('username');
    console.log('-----------load toke==='+user+'---------------')
    this.authToken = token;
    this.user = user;
  }
}
