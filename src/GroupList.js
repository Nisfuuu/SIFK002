// src/GroupList.js
import React from "react";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Grup List</h2>
      <ul>
        <li>Grup 1: Matematika</li>
        <li>Grup 2: Fisika</li>
        <li>Grup 3: Kimia</li>
        <li>Grup 4: Biologi</li>
        <li>Grup 5: Sejarah</li>
      </ul>
      <button onClick={() => navigate("/dashboard")}>
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default GroupList;
