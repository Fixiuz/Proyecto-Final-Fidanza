import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import './App.css';
import { AppProvider, useAppContext } from './context/AppContext';
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
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import Factura from './components/Factura/Factura';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CartSidebar from './components/CartSidebar/CartSidebar';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ProductForm from './components/ProductForm/ProductForm'; 
import SegundoSlider from './components/SegundoSlider/SegundoSlider'; 
import SliderMarcas from './components/SliderMarcas/SliderMarcas'; 



function LandingPage() {
  return (
    <>
       <Helmet>
        <title>TechLife - Inicio</title>
        <meta name="description" content="Encuentra los mejores componentes y periféricos de tecnología en TechLife. Calidad y precio garantizados." />
      </Helmet>
      <section id="quienes-somos">
        <Hero />
      </section>
      <section id="slider-marcas-uno">
        <SliderMarcasUno />
      </section>
      <section id='ofertas'>
        <OfertasDestacadas />
      </section>
      <section id="categorias">
        <Categorias />
      </section>
      <section id="segundo-slider">
        <SegundoSlider />
      </section>
       <section id="slider-marcas">
        <SliderMarcas />
      </section>
      
      <section id="contacto">
        <ContactForm />
      </section>
     
    </>
  );
}

function AppContent() {
  const { isSidebarOpen } = useAppContext();

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      <Router>
        <NavBar />
        <CartSidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/about" element={<Hero />} />
            <Route path="/catalogo" element={<ItemListContainer />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutForm /></ProtectedRoute>} />
            <Route path="/factura/:id" element={<Factura />} />
            <Route path="/adminPanel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/product" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/admin/product/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;