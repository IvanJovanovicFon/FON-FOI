import { MovieGenre } from "./MovieGenre";

export class Movie{
    id: string;
    title: string;
    date_release: Date;
    genre: MovieGenre;
    director: string;
    actors: string[];
    description: string;
    duration: BigInteger;

    constructor( 
        id: string,
        name: string,
        date_release: Date,
        genre: MovieGenre,
        director: string,
        actors: string[],
        description: string,
        duration: BigInteger
    ){
        this.id = id,
        this.title= name,
        this.date_release=date_release
        this.genre= genre,
        this.director = director ,
        this.actors = actors,
        this.description = description,
        this.duration = duration
    }
  }
  