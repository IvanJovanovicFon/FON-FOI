import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {shareReplay } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  // register(name:string,email:string,password:string){
  //     //send data to register api (firebase)
  //    return this.http
  //     .post<{idToken:string}>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
  //         {displayName:name,email,password}
  //     );
  // }

  register(first_name: string, last_name: string, email:string, username:string, password:string, date_of_birth: Date,
    preferences: string[], history: string[], watchlist: string[], reiewed_movies: string[], favorite_actors: string[]){
    console.log(first_name, last_name, email, username, password, date_of_birth,preferences,
      history, watchlist, reiewed_movies, favorite_actors)

   return this.http
    .post<any>(
      'http://localhost:8080/api/v1/users/register',(
        {first_name, last_name, email, username, password, date_of_birth,preferences,
          history, watchlist, reiewed_movies, favorite_actors})
    )
  
}


  //   login(email:string,password:string){
  //     return this.http
  //     .post<any>(
  //         'http://localhost:8080/api/v1/users/login',
  //           {email,password}
  //     );
  // }

  login(email:string, password:string ) {
    return this.http.post<{token: string}>('http://localhost:8080/api/v1/users/login', {email, password})
       // .tap((res: Response) => this.setSession)
       .pipe(tap((res: any) => this.setSession))
       .pipe(shareReplay())
      }

      private setSession(authResult: any) {
       // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
       // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      }        
      logout() {
        localStorage.removeItem("id_token");
       // localStorage.removeItem("expires_at");
      }

      // public isLoggedIn() {
      //   return moment().isBefore(this.getExpiration());
      // }

      // isLoggedOut() {
      //   return !this.isLoggedIn();
      // }

      // getExpiration() {
      //   const expiration = localStorage.getItem("expires_at");
      //   const expiresAt = JSON.parse(expiration);
      //   return moment(expiresAt);
      // }    


  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]',
        {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }



}
