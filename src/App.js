// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import GroupList from "./GroupList";
import ContactList from "./ContactList";
import ElearningList from "./ElearningList";
import Login from "./Login1";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/group-list" element={<GroupList />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/elearning-list" element={<ElearningList />} />
      </Routes>
    </Router>
  );
};

export default App;
