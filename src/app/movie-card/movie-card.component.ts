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
  favMovies: any[] = [];

/**
 * 
 * @param fetchApiData 
 * @param dialog 
 * @param router 
 * @param snackBar 
 */

  constructor( public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getUserFavs();
}

/**
 * Get all movies
 */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/**
 * Opens modal with genre information
 * @param name 
 * @param description 
 */

  openGenreDialog(name: string, description: string ): void {
    this.dialog.open(GenreCardComponent, {
      data : {name, description},
      width: '500px',
    });
  }

/**
 * Opens modal with director information
 * @param name 
 * @param bio 
 * @param birthDate 
 */

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

/**
 * Opens modal with description information
 * @param title 
 * @param description 
 */

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

/**
 * Get users favorite movies
 */

  getUserFavs(): any {
    this.fetchApiData.getFavMovies(this.user.Username).subscribe((res: any) => {
      this.favMovies = res.Favorites;
      return this.favMovies;
    });
  }

/**
 * Includes movieId in users list of favorties
 * @param movieId 
 * @returns 
 */

  isFav(movieId: string): boolean {
    return this.favMovies.includes(movieId);
  }

/**
 * Adds movie to users favorites
 * @param movieId 
 * @returns 
 */

  addToFavs(movieId: string): void {
    this.fetchApiData
      .addToFav(movieId)
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

/**
 * Removes movie from users favorites
 * @param movieId
 * @returns 
 */

  removeFromFavs(movieId: string): void {
    this.fetchApiData
      .removeFromFav(movieId)
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

/**
 * Toggles mvoie from users favorite list
 * @param movieId 
 * @returns 
 */

  onToggleFavoriteMovie(movieId: string): any {
    if (this.isFav(movieId)) {
      this.fetchApiData.removeFromFav(movieId).subscribe((res: any) => {
        this.snackBar.open(`"${movieId}" removed from your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });

      const index = this.favMovies.indexOf(movieId);
      return this.favMovies.splice(index, 1);

    } else {
      this.fetchApiData.addToFav(movieId).subscribe((response: any) => {
        this.snackBar.open(`"${movieId}" added to your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });
    }
    return this.favMovies.push(movieId);
  }


}