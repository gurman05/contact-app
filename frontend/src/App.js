import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async () => {
    if (!name || !phone) return alert("Fill all fields");

    await axios.post("http://localhost:5000/add", { name, phone });
    fetchContacts();
    setName("");
    setPhone("");
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchContacts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📱 Contact App</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addContact}>Add</button>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.name} - {c.phone}
            <button onClick={() => deleteContact(c._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;