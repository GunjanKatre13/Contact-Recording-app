import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { Contact } from '../models/contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  imports: [FormsModule],
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: Contact = { id: 0, name: '', email: '', phoneNumber: '' };
  contactId!: number;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    this.contactService.getContactById(this.contactId).subscribe(
      (data: Contact) => {
        this.contact = data; 
      },
      (error) => {
        console.error('Error fetching contact details', error);
      }
    );
  }

  updateContact(): void {
    this.contactService.updateContact(this.contactId, this.contact).subscribe(
      () => {
        alert('Contact updated successfully!');
        this.router.navigate(['/contacts']); 
      },
      (error) => {
        console.error('Error updating contact', error);
      }
    );
  }
}
