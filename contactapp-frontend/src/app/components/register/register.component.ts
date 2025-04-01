import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log("Registering user:", this.username, this.email, this.password);
  
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registration successful! Redirecting to login...');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Registration failed. Check console for details.');
        console.error("Registration error:", error);
      }
    });
  }  
}
