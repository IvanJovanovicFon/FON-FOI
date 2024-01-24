import { Component } from '@angular/core';
import { MoviesService } from '../_services/movies.service';
import { GenreServiceService } from '../_services/genre-service.service';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { MyModalComponent } from '../modal/my-modal/my-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent {
  searchTerm: string = '';
  selectedGenre: string = '';
  genres: Genre[] = [];
  movies: Movie[]=[];

  constructor(private movieService: MoviesService, private genreService: GenreServiceService, public dialog: MatDialog) {}

  ngOnInit() {
      this.genreService.getAllGenres().subscribe(
      (genres: Genre[]) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Error loading genres', error);
      }
    );
    this.loadMovies();
    console.log(this.movies)
  }

  loadMovies(){
    this.movieService.getMovies().subscribe((m)=>
    this.movies = m)
  }

  SearchMovies() {
    this.movies=[];
    this.movieService.searhMovies(this.searchTerm, this.selectedGenre).subscribe((movies) => {
      this.movies=movies;
      console.log('after  search', this.movies)
    });
  }
  openDialog(movie: Movie): void {
    this.dialog.open(MyModalComponent, {
      width: '400px',
      data: movie
    });
  }
  getDetails(movie: Movie){
    this.movieService.getMovieDetails(movie).subscribe(
      (movieDetails: Movie) => {
        console.log(movieDetails);
        this.openDialog(movieDetails);
      },
      (error) => {
        console.error(error);
      }
      );
  }

  onSubmit() {
    console.log(this.searchTerm, this.selectedGenre)
    this.SearchMovies();
  }
}