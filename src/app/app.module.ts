import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JwtInterceptor } from './_services/jwtInterceptor';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MyModalComponent } from './modal/my-modal/my-modal.component';
import { AngularMaterialModule } from './modal/angular-material.module';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [

  { path: '', redirectTo: '/allMovies', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'allMovies', component: AllMoviesComponent },

  { path: 'home', component: HomeComponent,

   // canActivate: [AuthGuard],

  },

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MyModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule,
    BrowserAnimationsModule, 
    AngularMaterialModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
   
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
