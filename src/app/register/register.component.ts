import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Genre } from '../model/genre';
import { GenreServiceService } from '../_services/genre-service.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DecadesService } from '../_services/decades.service';
import {MatRadioModule} from '@angular/material/radio';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedGenres: string[] = [];
  selectedGenId: string[]=[];
  selectedDecades:string[]=[];
  formdata = {name:"",surname:"",email:"", username:"", password:"", birthdate: new Date(), durationUnder2h: false};
  submit=false;
  errorMessage="";
  loading=false;
  preferences: FormGroup = new FormGroup({}, { validators: this.validateGenres(3) });
  decades:  FormGroup = new FormGroup({});
  constructor(private auth:AuthService, private genreService: GenreServiceService, private fb: FormBuilder,
     private router: Router, private decService: DecadesService) { }

  ifChecked(key: string) {
    const index = this.selectedGenres.indexOf(key);
    if (index === -1) {
      this.selectedGenres.push(key);
    } else {
      this.selectedGenres.splice(index, 1);
    }
    console.log('Updated selectedGenres:', this.selectedGenres);  
  }

  ifDecadesChecked(key: string) {
    const index = this.selectedDecades.indexOf(key);
    if (index === -1) {
      this.selectedDecades.push(key);
    } else {
      this.selectedDecades.splice(index, 1);
    }
    console.log('Updated selectedDecades:', this.selectedDecades);  
  }


  ngOnInit(): void {
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
  
    this.decades = this.fb.group({});
    this.decService.getAllDecades().subscribe((dec) => {
      console.log(dec);
      dec.forEach((decade) => {
        this.decades.addControl(decade+'s', this.fb.control(false));
      })
    },
    (error) => {
      console.error('Error fetching decades', error);
    })
  }

  // validateGenres(formGroup: FormGroup) {
  //   const selectedGenress = Object.values(formGroup.value).filter(Boolean);

  //   if (selectedGenress.length < 3) {
  //     formGroup.setErrors({ insufficientGenres: true });
  //   } else {
  //     formGroup.setErrors(null);
  //   }
  // }

  extractDecadeFromString(input: string): number | null {
    const match = input.match(/\d+/); 
    if (match) {
      return parseInt(match[0], 10); 
    } else {
      return null;
    }
  }

  validateGenres(minimumGenres: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedGenres = Object.values(control.value).filter(Boolean);
      return selectedGenres.length >= minimumGenres ? null : { insufficientGenres: true };
    };
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
      .register(this.formdata.name, this.formdata.surname, this.formdata.email, //ovde da se doodaju i zanrovi
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
