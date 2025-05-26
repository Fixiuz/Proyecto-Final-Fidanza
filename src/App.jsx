import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login'; // <-- nuevo
import ItemDetail from './components/ItemDetail/ItemDetail'; // <-- nuevo
import Categorias from './components/Categorias/Categorias'; // <-- nuevo
import OfertasDestacadas from './components/OfertasDestacadas/OfertasDestacadas';
function LandingPage() {
  return (
    <>
      <section id="quienes-somos">
        <Hero />
      </section>
      
      <section id='ofertas'>
        <OfertasDestacadas />  
      </section> 
      
      <section id="categorias">
        <Categorias />
      </section>

           
        
      <section id="contacto">
        <ContactForm />
      </section>
    </>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null); 

  return (
    <Router>
      <div className="app-container">
        <NavBar usuario={usuario} setUsuario={setUsuario} /> 
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/carrito" element={<div>Carrito</div>} />
            <Route path="/about" element={<Hero />} />
            <Route path="/catalogo" element={<ItemListContainer />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login setUsuario={setUsuario} />} /> 
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
