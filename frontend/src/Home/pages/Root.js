import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import "../CSS/About.css";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}
