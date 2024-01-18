import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {map, shareReplay } from 'rxjs/operators'



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

  register(first_name: string, last_name: string,password:string, email:string, username:string,
    preferences: string[], date_of_birth: Date, longer_than_2h: boolean, favorite_decades: Int32Array){
    console.log(first_name, last_name,  password, email, username, preferences,date_of_birth,
   longer_than_2h, favorite_decades)

      

   return this.http
    .post<any>(
      'http://localhost:8080/api/v1/users/register',(
        {first_name, last_name, password, email, username,preferences, date_of_birth,
          longer_than_2h, favorite_decades})
      )
  
      }


  // login(email:string, password:string ) {
  //   return this.http.post<{token: string}>('http://localhost:8080/api/v1/users/login', {email, password})
  //      // .tap((res: Response) => this.setSession)
  //      .pipe(tap((res: any) => this.setSession))
  //      .pipe(shareReplay())
  //     }

      private setSession(authResult: any) {
       // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
       // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      }        


      login(username: string, password:string){
        return this.http.post<any>('http://localhost:8080/api/v1/users/login', {username,password})
        .pipe(
            map(user => {
                // login successful if the response has jwt token/hmm
                if(user && user.token){
                    // store user details and jwt token in the local storage to keep the user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log( JSON.stringify(user))
                }

                return user;
            })
        );
    }



    // logout
    logout(){
        // remove user from local storage
        localStorage.removeItem('currentUser');
        console.log('logout')
    }


}
