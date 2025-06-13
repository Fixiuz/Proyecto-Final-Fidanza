import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Categorias from './components/Categorias/Categorias';
import OfertasDestacadas from './components/OfertasDestacadas/OfertasDestacadas';
import Cart from './components/Cart/Cart';
import CartSidebar from './components/CartSidebar/CartSidebar'; // Modificación
import CheckoutForm from './components/CheckoutForm/CheckoutForm'; // Modificación
import Factura from './components/Factura/Factura'; // Modificación


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
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <NavBar />
          <CartSidebar /> 
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              <Route path="/about" element={<Hero />} />
              <Route path="/catalogo" element={<ItemListContainer />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} /> {/* Modificación */}
              <Route path="/factura/:id" element={<Factura />} /> {/* Modificación */}
              <Route path="*" element={<div>404 - Página no encontrada</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;