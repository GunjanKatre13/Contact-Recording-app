import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts(userId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/list/${userId}`);
  }
  getContactById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${contactId}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/add`, contact);
  }
  deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${contactId}`, { responseType: 'text' as 'json' });
  }

  deleteAllContacts(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteAll`, { responseType: 'text' as 'json' });
  }

  updateContact(contactId: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/update/${contactId}`, contact);
  }
  
}