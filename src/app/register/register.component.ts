import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Genre } from '../model/genre';
import { GenreServiceService } from '../_services/genre-service.service';
import { User } from '../model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedGenres: string[] = [];
  formdata = {name:"",surname:"",email:"", username:"", password:"", birthdate: new Date(), selectedGenres:[]};
  submit=false;
  errorMessage="";
  loading=false;
  secondaryGenres: Genre[] =[]
  constructor(private auth:AuthService, private genreService: GenreServiceService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
    this.genreService.getAllGenres().subscribe(
      (genres: Genre[]) => {
        this.secondaryGenres = genres;
      },
      (error) => {
        console.error('Error fetching genres', error);
      }
    );
  }

  onSubmit(){

      this.loading=true;
      console.log(this.formdata)
      const user = new User(this.formdata.name, this.formdata.surname, this.formdata.email, 
        this.formdata.username, this.formdata.password, this.formdata.birthdate, this.formdata.selectedGenres,[],[],[],[])
      this.auth
      .register(this.formdata.name, this.formdata.surname, this.formdata.email, 
        this.formdata.username, this.formdata.password, this.formdata.birthdate, this.formdata.selectedGenres,[],[],[],[])
      .subscribe({
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
