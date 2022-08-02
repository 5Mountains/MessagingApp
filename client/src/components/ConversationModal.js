import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ConversationModal({ closeModal }) {
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactsIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    setSelectedContactsIds((prevSelectedContactsIds) =>
      prevSelectedContactsIds.includes(contactId)
        ? prevSelectedContactsIds.filter((prevId) => prevId !== contactId)
        : [...prevSelectedContactsIds, contactId]
    );
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.length > 0 &&
            contacts.map((contact) => (
              <Form.Group key={contact.id} controlId={contact.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactsIds.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </Form.Group>
            ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
