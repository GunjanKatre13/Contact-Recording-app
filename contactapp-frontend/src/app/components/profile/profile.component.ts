import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  username: string = '';
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: [''],
      name: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    
    this.username = localStorage.getItem('username') || '';
    
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe(user => {
        this.userId = user.id;  
        this.profileForm.patchValue({
          username: user.username,
          name: user.name,
          password: ''
        });
      });
    }
  }

  onSubmit(): void {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe(() => {
        alert('Profile updated successfully');
        this.router.navigate(['/contacts']); 
      });
    }
  }
}
