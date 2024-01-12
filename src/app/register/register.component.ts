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
  formdata = {name:"",surname:"",email:"", username:"", password:"", birthdate: new Date(), primaryGenre: new Genre("1", "Default"), selectedGenres:[]};
  submit=false;
  errorMessage="";
  loading=false;
  //secondaryGenres: string[] = ['Action', 'Drama', 'Comedy', 'Horror', 'Adventure', 'Thriller', 'Fantasy', 'Western', 'Romance' ];
  secondaryGenres:Genre[] = this.genreService.getAllGenres();
  constructor(private auth:AuthService, private genreService: GenreServiceService ) { }
  getFilteredSecondaryGenres(): Genre[] {
    return this.secondaryGenres.filter(genre => genre.name !== this.formdata.primaryGenre.name);
  }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){

      this.loading=true;
      console.log(this.formdata)
      const user = new User(this.formdata.name, this.formdata.surname, this.formdata.email, 
        this.formdata.username, this.formdata.password, this.formdata.birthdate, this.formdata.selectedGenres,[],[],[],[])
      this.auth
      .register(user)
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
