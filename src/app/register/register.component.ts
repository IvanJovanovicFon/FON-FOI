import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Genre } from '../model/genre';
import { GenreServiceService } from '../_services/genre-service.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedGenres: string[] = [];
  selectedGenId: string[]=[];
  formdata = {name:"",surname:"",email:"", username:"", password:"", birthdate: new Date()};
  submit=false;
  errorMessage="";
  loading=false;
  constructor(private auth:AuthService, private genreService: GenreServiceService, private fb: FormBuilder, private router: Router) { }
  preferences: FormGroup = new FormGroup({});

  ifChecked(key: string) {
    const index = this.selectedGenres.indexOf(key);
    if (index === -1) {
      this.selectedGenres.push(key);
    } else {
      this.selectedGenres.splice(index, 1);
    }
  
    console.log('Updated selectedGenres:', this.selectedGenres);
    
  }
  

  ngOnInit(): void {
    this.auth.canAuthenticate();
    this.preferences = this.fb.group({});
    this.genreService.getAllGenres().subscribe((genres) => {
 console.log(genres);
      genres.forEach((genre) => {
        this.preferences.addControl(genre.name, this.fb.control(false));
      })
    },
    (error) => {
      console.error('Error fetching genres', error);
    })
  }

  onSubmit(){

      this.loading=true;
      console.log(this.formdata)
      this.genreService.getAllGenres().subscribe((genres) => {
             genres.forEach((genre) => {
              this.selectedGenres.forEach((g)=>{
                if(g===genre.name)
                this.selectedGenId.push(genre.id)
              })
             })
           },
           (error) => {
             console.error('Error fetching genres', error);
           })
      this.auth
      .register(this.formdata.name, this.formdata.surname, this.formdata.email, 
        this.formdata.username, this.formdata.password, this.formdata.birthdate,this.selectedGenId,[],[],[],[]).subscribe({
          next: (data) => {
            this.loading =false;
            console.log('Register process completed!');
            this.router.navigate(['/login']); 
          },
          error: (error) => {
            console.log('Greskaaa!', error);
           this.selectedGenres = [];
           
          }
        });
       }
}
