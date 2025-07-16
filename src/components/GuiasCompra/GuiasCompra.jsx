import React from 'react';
import { Link } from 'react-router-dom';
import './GuiasCompra.css';



function GuiasCompra() {
  return (
    <section className="guias-compra-container">
      <div className="guias-header">
        <h2>Guías y Consejos para Armar tu PC</h2>
        <p>¿No estás seguro por dónde empezar? Nuestros expertos te ayudan a elegir los mejores componentes para tus necesidades.</p>
      </div>

      <div className="guias-list">
        
        <div className="guia-item">
          <div className="guia-imagen">
            <img src='https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752678877/Gemini_Generated_Image_m1vgfum1vgfum1vg_czfhk8.png' alt="Guía para elegir placa de video" />
          </div>
          <div className="guia-contenido">
            <h3>Eligiendo tu Placa de Video (GPU)</h3>
            <p>La pieza central de toda PC Gamer. Te explicamos las diferencias clave para que elijas la potencia justa para tus juegos favoritos.</p>
            <ul>
              <li>Resolución: ¿Juegas en 1080p, 1440p o 4K?</li>
              <li>Tasa de Refresco: FPS que necesitas para tu monitor.</li>
              <li>NVIDIA vs. AMD: Tecnologías como DLSS y FSR.</li>
            </ul>
            <Link to="/catalogo?categoria=Placas%20de%20video" className="guia-button">
              Ver Placas de Video
            </Link>
          </div>
        </div>

        
        <div className="guia-item">
          <div className="guia-imagen">
            <img src='https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752678882/Gemini_Generated_Image_m1vgftm1vgftm1vg_lzvmgc.png' alt="Guía de almacenamiento" />
          </div>
          <div className="guia-contenido">
            <h3>SSD vs. HDD: La Batalla del Almacenamiento</h3>
            <p>La velocidad de tu PC depende enormemente del disco. Descubre cuándo elegir un SSD ultrarrápido y cuándo un HDD de gran capacidad.</p>
            <ul>
              <li>Velocidad de carga para juegos y sistema operativo.</li>
              <li>Diferencias entre SATA, NVMe Gen3 y Gen4.</li>
              <li>La mejor combinación para un presupuesto balanceado.</li>
            </ul>
            <Link to="/catalogo?categoria=Discos" className="guia-button">
              Ver Discos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuiasCompra;