// Core modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Material components
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Importing component
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  /**
   * Required for the login form
   */
  @Input() userData = { Username: '', Password: '' };

/**
 * 
 * @param fetchApiData 
 * @param dialogRef 
 * @param snackBar 
 * @param router 
 */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,) { }

  ngOnInit(): void {
  }

/**
 * login user
 */ 

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

  // Store current user and token in localStorage.
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('token', result.token);
      // Logic for a successful user registration
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 1000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 1000
      });
    });
  }

}