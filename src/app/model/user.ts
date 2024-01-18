import { Genre } from "./genre";

export class User {
    first_name: string;
    last_name: string
    email: string;
    username: string;
    password: string;
    date_of_birth: Date; 
    preferences: string[];
    longer_than_2h : boolean;
    favorite_decades:Int32Array

    constructor( name: string,
        surname: string,
        password: string,
        email: string,
        username: string,
        preferences: string[],
        date_of_birth: Date,
        longer_than_2h: boolean,
        favorite_decades: Int32Array
    ){
        this.first_name= name,
        this.last_name = surname,
        this.email = email,
        this.username =  username,
        this.password = password,
        this.date_of_birth =  date_of_birth,
        this.preferences = preferences,
        this.longer_than_2h = longer_than_2h,
        this.favorite_decades = favorite_decades
    }
  }
  