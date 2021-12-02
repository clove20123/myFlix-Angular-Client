// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favMovies: any[] = this.user.FavoriteMovies;
  constructor( public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getUserFavs();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string ): void {
    this.dialog.open(GenreCardComponent, {
      data : {name, description},
      width: '500px',
    });
  }

  openDirectorDialog(
    name: string,
    bio: string,
    birthDate: any,
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birthDate,
      },
      width: '500px',
    });
  }

  openDescriptionDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        title,
        description,
      },
      width: '500px'
    });
  }

  getUserFavs(): any {
    this.fetchApiData.getFavMovies(this.user.Username).subscribe((res: any) => {
      this.favMovies = res.Favorites;
      return this.favMovies;
    });
  }

  isFav(movieId: string): boolean {
    return this.favMovies.includes(movieId);
  }

  testClick(): void {
    this.snackBar.open("added to favs",
    "ok",
    {
      duration: 2000,
    }
    );
 
  }

  addToFavs(username: string, movieId: string): void {
    this.fetchApiData
      .addToFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `has been added to your favorite movies!`,
          'Cool',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  removeFromFavs(username: string, movieId: string): void {
    this.fetchApiData
      .removeFromFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `has been removed from your favorite movies`,
          'Alright',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  onToggleFavoriteMovie(username: string, movieId: string): any {
    if (this.isFav(movieId)) {
      this.fetchApiData.removeFromFav(this.user.username, movieId).subscribe((res: any) => {
        this.snackBar.open(`"${movieId}" removed from your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });

      const index = this.favMovies.indexOf(movieId);
      return this.favMovies.splice(index, 1);

    } else {
      this.fetchApiData.addToFav(this.user.username, movieId).subscribe((response: any) => {
        this.snackBar.open(`"${movieId}" added to your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });
    }
    return this.favMovies.push(movieId);
  }


}