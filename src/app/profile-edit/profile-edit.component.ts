import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
const username = localStorage.getItem('user');
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
 /**
   * Required input fields for updating the user information
   */
  @Input() userData = { Username: username, Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchUserData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Edits the user information
   */
  editUser(): void {
    this.fetchUserData.editUser(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();
        localStorage.setItem('username', res.Username);
        this.snackBar.open('Profile updated successfully!', 'Ok', {
          duration: 2000,
        });
      },
      (res) => {
        console.log(res);
        this.snackBar.open(res, 'Ok', {
          duration: 2000,
        });
      }
    );

    setTimeout(function () {
      window.location.reload();
    }, 1000);

  }
}
