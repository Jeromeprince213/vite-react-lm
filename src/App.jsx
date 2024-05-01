// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './home';
import CourseList from './courseList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/courselist" element={<CourseList />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
