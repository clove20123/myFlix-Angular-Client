import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movie-api-20123.herokuapp.com/';

const token = localStorage.getItem('token');

const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  public userLogin(userDetalis: any): Observable<any> {
    console.log(userDetalis);
    return this.http.post(apiUrl + 'login', userDetalis).pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  public getAllGenres(): Observable<any> {
    const response = this.http.get(apiUrl + 'catalog/genres', headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getAllDirectors(): Observable<any> {
    const response = this.http.get(apiUrl + 'catalog/directors', headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovie(movieTitle: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'catalog/movies/' + movieTitle,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(directorNane: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'catalog/directors/' + directorNane,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'catalog/genres/' + genreName,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getUser(username: string): Observable<any> {
    const response = this.http.get(apiUrl + '/users/' + username, headers);
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getFavMovies(username: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'users/' + username + '/favorites',
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addToFav(username: string, movieId: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  public removeFromFav(username: string, movieId: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/deregister',
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  public editUser(username: string, updatedInfo: object): Observable<any> {
    const response = this.http.put(
      apiUrl + 'users/' + username,
      updatedInfo,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

