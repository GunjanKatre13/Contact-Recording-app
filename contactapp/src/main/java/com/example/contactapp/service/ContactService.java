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


    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }


    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }


    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public List<Contact> getContactsByUserId(Long userId) {
        return contactRepository.findByUserId(userId);
    }




    public Contact updateContact(Long id, Contact updatedContact) {
        return contactRepository.findById(id).map(contact -> {
            contact.setName(updatedContact.getName());
            contact.setPhoneNumber(updatedContact.getPhoneNumber());
            contact.setEmail(updatedContact.getEmail());
            return contactRepository.save(contact);
        }).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }


    public void deleteContact(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
        } else {
            throw new RuntimeException("Contact not found with id: " + id);
        }
    }
    public void deleteAllContacts() {

        List<Contact> contacts = contactRepository.findAll();
        for (Contact contact : contacts) {
            contact.setUser(null);
            contactRepository.save(contact);
        }
        contactRepository.deleteAll();
    }
}
