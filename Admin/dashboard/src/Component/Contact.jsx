import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    // Fetch all contacts from the backend
    const fetchContacts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:5000/api/contacts");
        setContacts(response.data.data);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again later.");
      }
      setLoading(false);
    };
  
    // Delete a contact
    const deleteContact = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        // Remove deleted contact from state
        setContacts(contacts.filter((contact) => contact._id !== id));
        alert("Contact deleted successfully");
      } catch (err) {
        alert("Failed to delete contact. Please try again.");
      }
    };
  
    useEffect(() => {
      fetchContacts();
    }, []);
  
    return (
      <div className="min-h-screen bg-[#E8F8F5] p-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-[#2C3E50] mb-6">
            All Contacts
          </h2>
  
          {loading ? (
            <p className="text-center text-orange-500">Loading contacts...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <ul className="space-y-4">
              {contacts.map((contact) => (
                <li
                  key={contact._id}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-md shadow"
                >
                  <div>
                    <p className="text-lg font-semibold text-[#2C3E50]">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-600">{contact.subject}</p>
                    <p className="text-sm text-gray-800">{contact.message}</p>
                  </div>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="ml-4 bg-[#2C3E50] text-white p-2 rounded-md  flex items-center justify-center"
                    title="Delete Contact"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

export default Contact