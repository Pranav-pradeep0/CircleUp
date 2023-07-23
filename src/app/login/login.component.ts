import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  constructor ( private fb:FormBuilder, private ds:DataService, private router:Router ) {}

  formAnimationClass: string = '';

  onSignUpClick() {
    this.formAnimationClass = 'bounceLeft';
  }

  onLoginClick() {
    this.formAnimationClass = 'bounceRight';
  }

  //! Login Form 
  
  loginForm = this.fb.group({
    uname:["",[Validators.required,Validators.pattern('[a-z0-9]+')]],
    psw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
  })

  //! Register Form

  registerForm = this.fb.group({
    regName:["",[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    regUname:["",[Validators.required,Validators.pattern('[a-z0-9]+')]],
    regPwd:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
  })


  login(){
    if (this.loginForm.valid) {
      this.ds.loginApi(
        this.loginForm.value.uname,
        this.loginForm.value.psw
      ).subscribe((result:any) => {
        localStorage.setItem("currentUser",result.currentUser),
        localStorage.setItem("name",result.name)
        // alert(result.message)
        this.router.navigateByUrl("/dashboard") 
      },
      result => {
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid Form Details")
    }
  }


  register(){
    if (this.registerForm.valid) {
      this.ds.registerApi(
        this.registerForm.value.regUname,
        this.registerForm.value.regPwd,
        this.registerForm.value.regName
      ).subscribe((result:any) => {
        localStorage.setItem("currentUser",result.user)
        localStorage.setItem("name",result.name)
        this.router.navigateByUrl("/moreDetails")
      },
      result => {
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid Form details")
      // this.router.navigateByUrl("/moreDetails")
    }
  }


}
