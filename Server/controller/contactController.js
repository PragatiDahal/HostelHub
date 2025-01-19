// controllers/contactController.js
const Contact = require("../models/Contact");

// Create a new contact message
exports.createContact = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const newContact = new Contact({ name, email, subject, message });
      const savedContact = await newContact.save();
      res.status(200).json({ success: true, message: "Contact saved successfully", data: savedContact });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to save contact", error: error.message });
    }
  };

// Get all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch contacts", error: error.message });
  }
};

// Delete a contact message
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete contact", error: error.message });
  }
};