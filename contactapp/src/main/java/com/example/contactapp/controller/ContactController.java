package com.example.contactapp.controller;

import com.example.contactapp.model.Contact;
import com.example.contactapp.model.User;
import com.example.contactapp.service.ContactService;
import com.example.contactapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @Autowired
    private UserService userService;

    private String getLoggedInUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Returns the currently logged-in username
    }



    @PostMapping("/add")
    public ResponseEntity<?> addContact(@RequestBody Contact contact, Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }


        contact.setUser(user);


        if (contact.getName() == null || contact.getEmail() == null || contact.getPhoneNumber() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        Contact savedContact = contactService.saveContact(contact);
        return ResponseEntity.ok(savedContact);
    }



    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Contact>> getUserContacts(@PathVariable Long userId) {
        List<Contact> userContacts = contactService.getContactsByUserId(userId);
        return ResponseEntity.ok(userContacts);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Optional<Contact> contact = contactService.getContactById(id);
        return contact.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact updatedContact) {
        try {
            Contact updated = contactService.updateContact(id, updatedContact);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.ok("Contact deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }

    }
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllContacts() {
        try {
            contactService.deleteAllContacts();
            return ResponseEntity.ok("All contacts deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting all contacts: " + e.getMessage());
        }
    }
}
