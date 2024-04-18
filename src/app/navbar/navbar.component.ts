import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  loggedinUser!: string;

  constructor(private alertify: AlertifyService) {
   
    
  }
  ngOnInit(): void {

  }

loggedin() {
  const user=localStorage.getItem('user');
   if(user){
    this.loggedinUser = user;
    return this.loggedinUser;
   }
 
}
onLogout() {
  localStorage.removeItem('user');
  this.alertify.success('You are logged out !');
}
}
