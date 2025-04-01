import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem('username', this.username);
            alert('Login successful!');
            this.router.navigate(['/contacts']);
          }
        },
        error: () => {
          alert('Invalid email or password');
        }
      });
  }
}
