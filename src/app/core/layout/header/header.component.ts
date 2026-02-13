import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  cartItemCount = 0;
  userName = 'Usuario'; 
  dropdownOpen = false;

  constructor() {
    this.authService.currentUser$.subscribe(data => {
      if (data && data.user) {
        this.userName = data.user.name;
      } else {
        this.userName = 'Usuario';
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.dropdownOpen = false;
  }
}
