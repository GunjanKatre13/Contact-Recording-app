import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../models/contact.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  imports: [CommonModule],
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  userId: number | null = null;

  constructor(private contactService: ContactService, private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
  
    if (this.userId) {
      this.getContacts(this.userId);
    } else {
      console.error('No user logged in');
      this.router.navigate(['/login']);
    }
  }  

  getContacts(userId: number): void {
    this.contactService.getContacts(userId).subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  deleteContact(contactId: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(contactId).subscribe(
        () => {
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
        },
        (error) => {
          console.error('Error deleting contact', error);
        }
      );
    }
  }

  deleteAllContacts(): void {
    if (confirm('Are you sure you want to delete all contacts?')) {
      this.contactService.deleteAllContacts().subscribe(
        () => {
          alert('All contacts deleted successfully!');
          if (this.userId) this.getContacts(this.userId);
        },
        (error) => {
          console.error('Error deleting all contacts', error);
        }
      );
    }
  }  

  updateContact(contactId: number): void {
    this.router.navigate(['/edit-contact', contactId]);
  }

  addContact(): void {
    this.router.navigate(['/add-contact']);
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

}
