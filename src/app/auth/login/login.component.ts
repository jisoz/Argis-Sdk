import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthService , private alertify:AlertifyService , private route:Router){}


  ngOnInit(): void {

  }

  onLogin(loginform :NgForm){
   this.authservice.signin(loginform.value).subscribe(
    // {
    //   next:(res=>{
    //   // if(res.status==200){
    //   //   this.alertify.success("Login Successfull")
    //   //   console.log("Login Successfull")
    //   // }else{
    //   //   this.alertify.error("Login Failed");
    //   // }
    //   console.log(res);
    // }),
    //   error:(err=>{
    //   this.alertify.error(err.error);
    //   })
    // }
    res=>{
      const user=res.user.username
     if(user){
      localStorage.setItem('user',user)
     }
     this.alertify.success("login success")
    this.route.navigate(["/"])
    },
    err=>{
      this.alertify.error(err?.error.message)
    }
   )

  }

}
