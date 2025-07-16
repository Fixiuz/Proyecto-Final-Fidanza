import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaCreditCard, FaTruck } from 'react-icons/fa';
import './ComoComprar.css';

function ComoComprar() {
  return (
    <>
      <Helmet>
        <title>Cómo Comprar - TechLife</title>
        <meta name="description" content="Guía paso a paso sobre cómo realizar tu compra en TechLife, desde la selección de productos hasta el seguimiento de tu envío." />
      </Helmet>

      <div className="como-comprar-container">
        <header className="como-comprar-header">
          <h1>¿Cómo Comprar en TechLife?</h1>
          <p>¡Comprar con nosotros es fácil, rápido y seguro! Sigue estos simples pasos para tener la mejor tecnología en tus manos.</p>
        </header>

        <div className="pasos-container">
          {/* Paso 1 */}
          <div className="paso-item">
            <FaSearch className="paso-icon" />
            <h2>Paso 1: Encuentra tu Producto</h2>
            <p>Navega por nuestras categorías o utiliza la barra de búsqueda para encontrar los componentes y periféricos que necesitas.</p>
          </div>

          {/* Paso 2 */}
          <div className="paso-item">
            <FaShoppingCart className="paso-icon" />
            <h2>Paso 2: Añade al Carrito</h2>
            <p>Cuando encuentres un producto que te guste, haz clic en el botón "Agregar al Carrito". Puedes seguir comprando o ir al carrito para revisar tu pedido.</p>
          </div>

          {/* Paso 3 */}
          <div className="paso-item">
            <FaCreditCard className="paso-icon" />
            <h2>Paso 3: Finaliza la Compra</h2>
            <p>Ve a tu carrito, presiona "Finalizar Compra" y completa el formulario con tus datos de envío y pago. ¡Aceptamos todas las tarjetas!</p>
          </div>

          {/* Paso 4 */}
          <div className="paso-item">
            <FaTruck className="paso-icon" />
            <h2>Paso 4: Recibe y Disfruta</h2>
            <p>Una vez confirmado el pago, prepararemos tu pedido. Recibirás un correo con el código de seguimiento para que sepas exactamente cuándo llegará.</p>
          </div>
        </div>

        <section className="faq-section">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-item">
            <h4>¿Qué métodos de pago aceptan?</h4>
            <p>Aceptamos todas las principales tarjetas de crédito y débito a través de nuestra pasarela de pago segura. También puedes pagar mediante transferencia bancaria.</p>
          </div>
          <div className="faq-item">
            <h4>¿Cuánto cuesta el envío?</h4>
            <p>El costo de envío se calcula automáticamente durante el proceso de checkout, basándose en tu ubicación. Ofrecemos envío gratuito en compras superiores a $200.</p>
          </div>
        </section>

        <div className="cta-container">
          <Link to="/catalogo" className="cta-button">
            ¡Empezar a Comprar!
          </Link>
        </div>

      </div>
    </>
  );
}

export default ComoComprar;