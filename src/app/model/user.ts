import { Genre } from "./genre";

export class User {
    first_name: string;
    last_name: string
    email: string;
    username: string;
    password: string;
    date_of_birth: Date; 
    preferences: string[];
    history: string[];
    watchlist:string[];
    reiewed_movies:string[];
    favorite_actors: string[];

    // primaryGenre: string ;
    // secondaryGenres: string[];

    constructor( name: string,
        surname: string,
        email: string,
        username: string,
        password: string,
        date_of_birth: Date,
        preferences: string[],
        history: string[],
    watchlist:string[],
    reiewed_movies:string[],
    favorite_actors: string[]
        // primaryGenre: string,
        // secondaryGenres: string[]
    ){
        this.first_name= name,
        this.last_name = surname,
        this.email = email,
        this.username =  username,
        this.password = password,
        this.date_of_birth =  date_of_birth,
        this.preferences = preferences,
        this.history=history,
        this.watchlist = watchlist,
        this.reiewed_movies = reiewed_movies,
        this.favorite_actors =favorite_actors
        // this.primaryGenre =  primaryGenre,
        // this.secondaryGenres =  secondaryGenres
    }
  }
  