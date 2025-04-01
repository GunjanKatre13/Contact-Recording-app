import { Component } from '@angular/core';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [AddContactComponent, ContactListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user = 'John Doe'; // Replace with actual user data
}
