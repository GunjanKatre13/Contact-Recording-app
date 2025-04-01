import { Component } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  newContact: Contact = { name: '', email: '', phoneNumber: '' };

  constructor(private contactService: ContactService,private router: Router) {}

  addContact(): void {
    console.log('Sending Contact:', this.newContact);
    this.contactService.addContact(this.newContact).subscribe(
      (data) => {
        console.log('Contact Added:', data);
        alert('Contact added successfully!');
        this.router.navigate(['/contacts']); 
        this.newContact = { name: '', email: '', phoneNumber: '' };
      },
      (error) => {
        console.error('Error adding contact:', error);
      }
    );
  }
}
