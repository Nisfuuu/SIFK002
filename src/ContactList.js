// src/ContactList.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Daftar Kontak Dosen</h2>
      <ul>
        <li>Dr. John Doe - Matematika</li>
        <li>Prof. Jane Smith - Fisika</li>
        <li>Dr. Emily Johnson - Kimia</li>
        <li>Prof. Michael Brown - Biologi</li>
        <li>Dr. Sarah Davis - Sejarah</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default ContactList;
