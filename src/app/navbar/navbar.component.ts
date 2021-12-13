import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * 
   * @param router 
   */

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

/**
 * Takes you to profile view
 */

  toProfile(): void {
    this.router.navigate(['/profile'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

/**
 * Takes you to movies view
 */

  toMovies(): void {
    this.router.navigate(['/movies'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  backToHome(): void {
    this.router.navigate(['/movies'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  /**
   * Logout
   */

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }
}