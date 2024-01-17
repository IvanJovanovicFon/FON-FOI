import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // formdata = {email:"",password:""};
  // submit=false;
  // loading=false;
  // errorMessage="";
  // constructor(private auth:AuthService) { }

  // ngOnInit(): void {
  //   this.auth.canAuthenticate();
  // }

  // onSubmit(){
  //   this.loading=true;
  //   this.auth.login(this.formdata.email,this.formdata.password)
  //   // .subscribe({

  //   //     next:data=>{
  //   //         console.log(data);
  //   //     },
  //   //     error:data=>{
  //   //         if (data.error.error.message=="Incorrect password" || data.error.error.message=="INVALID_EMAIL") {
  //   //             this.errorMessage = "Invalid Credentials!";
  //   //         } else{
  //   //             this.errorMessage = "Unknown error when logging into this account!";
  //   //         }
  //   //     }
  //   // }).add(()=>{
  //   //     this.loading =false;
  //   //     console.log('login process completed!');

  //   // })
  // }

  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }
    ngOnInit(): void {
  }


}
