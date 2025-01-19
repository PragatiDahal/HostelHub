// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controller/contactController");

// Create a new contact
router.post("/", createContact);

// Get all contacts
router.get("/", getAllContacts);

// Delete a contact by ID
router.delete("/:id", deleteContact);

module.exports = router;
