import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';

function LandingPage() {
  return (
    <>
      <section id="quienes-somos">
        <Hero />
      </section>
      <section id="catalogo">
        <ItemListContainer />
      </section>
      <section id="contacto">
        <ContactForm />
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/carrito" element={<div>Carrito</div>} />
            <Route path="/about" element={<Hero />} />
            <Route path="/catalogo" element={<ItemListContainer />} />
            <Route path="/contact" element={<ContactForm />} />
        
            

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
