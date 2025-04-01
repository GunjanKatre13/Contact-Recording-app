import { Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactListComponent }, 
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-contact', component: AddContactComponent}, 
  { path: '**', redirectTo: '/login' } 
];

