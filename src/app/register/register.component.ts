import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {name:"",surname:"",email:"", username:"", password:"", birthdate:"", primaryGenre:"", secondaryGenres:[] };
  submit=false;
  errorMessage="";
  loading=false;
  secondaryGenres: string[] = ['Action', 'Drama', 'Comedy', 'Horror', 'Adventure', 'Thriller', 'Fantasy', 'Western', 'Romance' ]; 
  constructor(private auth:AuthService) { }
  getFilteredSecondaryGenres(): string[] {
    // Filtrirajte sekundarne žanrove na temelju odabranog primarnog žanra
    return this.secondaryGenres.filter(genre => genre !== this.formdata.primaryGenre);
  }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){

      this.loading=true;

      //call register service
      this.auth
      .register(this.formdata.name,this.formdata.email,this.formdata.password)
      .subscribe({
          next:data=>{
              //store token from response data
              this.auth.storeToken(data.idToken);
              console.log('Registered idtoken is '+data.idToken);
              this.auth.canAuthenticate();

          },
          error:data=>{
              if (data.error.error.message=="INVALID_EMAIL") {

                  this.errorMessage = "Invalid Email!";

              } else if (data.error.error.message=="EMAIL_EXISTS") {

                  this.errorMessage = "Already Email exists!";

              }else{

                  this.errorMessage = "Unknown error occured when creating this account!";
              }
          }
      }).add(()=>{
          this.loading =false;
          console.log('Register process completed!');
      })
  }

}
