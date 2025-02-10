// src/ElearningList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ElearningList = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({
    matematika: false,
    fisika: false,
    kimia: false,
    biologi: false,
    sejarah: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2>Daftar E-Learning</h2>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              name="matematika"
              checked={checkedItems.matematika}
              onChange={handleCheckboxChange}
            />
            Matematika
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="fisika"
              checked={checkedItems.fisika}
              onChange={handleCheckboxChange}
            />
            Fisika
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="kimia"
              checked={checkedItems.kimia}
              onChange={handleCheckboxChange}
            />
            Kimia
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="biologi"
              checked={checkedItems.biologi}
              onChange={handleCheckboxChange}
            />
            Biologi
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sejarah"
              checked={checkedItems.sejarah}
              onChange={handleCheckboxChange}
            />
            Sejarah
          </label>
        </div>
      </form>
      <button onClick={() => navigate("/dashboard")}>
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default ElearningList;
