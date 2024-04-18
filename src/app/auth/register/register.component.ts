import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerationForm!: FormGroup;
  userSubmitted!: boolean;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService ,
    private Route: Router
  ) { }
    
  ngOnInit(): void {
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm =  this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$#@]).{8,}$/)]],
  


    })
  }

  onSubmit(){
    console.log(this.registerationForm.value)
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      this.authService.signUp(this.registerationForm.value).subscribe(
        res=>{
         this.alertify.success("User Registred");
         this.Route.navigate(['/login'])
        },err=>{
          this.alertify.error(err?.error.message);
        }
      )
    }
    
  }

  get firstName() {
    return this.registerationForm.get('firstName') as FormControl;
}
  get lastName() {
    return this.registerationForm.get('lastName') as FormControl;
}
  get username() {
    return this.registerationForm.get('username') as FormControl;
}

get email() {
    return this.registerationForm.get('email') as FormControl;
}
get password() {
    return this.registerationForm.get('password') as FormControl;
}


}
