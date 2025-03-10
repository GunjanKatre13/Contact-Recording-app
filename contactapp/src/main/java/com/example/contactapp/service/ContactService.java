package com.example.contactapp.service;

import com.example.contactapp.model.Contact;
import com.example.contactapp.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    // Create (Add a new contact)
    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    // Read (Get all contacts)
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Read (Get a contact by ID)
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    // Update (Modify an existing contact)
    public Contact updateContact(Long id, Contact updatedContact) {
        return contactRepository.findById(id).map(contact -> {
            contact.setName(updatedContact.getName());
            contact.setPhoneNumber(updatedContact.getPhoneNumber());
            contact.setEmail(updatedContact.getEmail());
            return contactRepository.save(contact);
        }).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    // Delete (Remove a contact by ID)
    public void deleteContact(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
        } else {
            throw new RuntimeException("Contact not found with id: " + id);
        }
    }
}
