import { Genre } from "./genre";

export class MovieGenre{
    primary: Genre;
    secondary: Genre[];
    constructor( 
        primary: Genre,
        secondary: Genre[]
    ){
        this.primary = primary,
        this.secondary= secondary    
    }
  }
  