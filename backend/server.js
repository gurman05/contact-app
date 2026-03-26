const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//  YAHAN apna MongoDB URL daalna
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String
});

const Contact = mongoose.model("Contact", ContactSchema);

//  Add Contact
app.post("/add", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.send("Saved");
});

//  Get Contacts
app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

//  Delete Contact
app.delete("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));