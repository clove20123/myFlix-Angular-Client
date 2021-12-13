import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input () user = { Username: '', Password: '', Email: '', BirthDate: '', FavoriteMovies: []};
  FavoriteMovies: any = []; 

  /**
   * 
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param router 
   */
  
  constructor(  public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get user data
   */

  getUser(): void {
    this.fetchApiData.getUser(localStorage.getItem('username')).subscribe((resp: any) => {
      this.user = resp;
    })
  }

  /**
   * Gets users favorite movies 
   */

  getFavMovies(): void {

    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {

      this.FavoriteMovies = res.FavoriteMovies
    });
  }

}
