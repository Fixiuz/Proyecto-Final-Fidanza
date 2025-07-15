// src/components/SliderMarcas/SliderMarcas.jsx

import React from 'react';
import './SliderMarcas.css'; // Crearemos este archivo de estilos en el siguiente paso

// Define la lista de marcas que quieres mostrar.
// Puedes agregar o quitar marcas fácilmente desde aquí.
const marcas = [
  { nombre: 'Intel', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593025/D_NQ_652365-MLA73147291085_112023-OO_xk4qzm.jpg' },
  { nombre: 'AMD', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592981/D_NQ_935073-MLA54969655744_042023-OO_wcfucd.jpg' },
  { nombre: 'Corsair', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593034/D_NQ_887720-MLA69027253530_042023-OO_wws7wx.jpg' },
  { nombre: 'Logitech', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593036/D_NQ_894330-MLA69037967486_042023-OO_y2b0dk.jpg' },
  { nombre: 'Razer', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592982/D_NQ_961103-MLA27498765649_062018-OO_qdlkhr.jpg' },
  { nombre: 'ASUS', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592984/D_NQ_961146-MLA78083571687_072024-OO_tmvu3f.jpg' },
  { nombre: 'Gigabyte', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592986/D_NQ_978468-MLA54969720350_042023-OO_n2aqmx.jpg' },
  { nombre: 'MSI', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593021/tumb_27-12-2018-02-12-46-msi_logo_anmjrf.jpg' },
];

function SliderMarcas() {
  return (
    <div className="slider-container">
      <div className="slider-track">
        {/* Renderizamos la lista de logos una vez */}
        {marcas.map((marca, index) => (
          <div className="marca" key={`marca1-${index}`}>
            <img src={marca.logoUrl} alt={marca.nombre} className="marca-logo" />
          </div>
        ))}
        {/* Y la volvemos a renderizar para crear el efecto de bucle infinito */}
        {marcas.map((marca, index) => (
          <div className="marca" key={`marca2-${index}`}>
            <img src={marca.logoUrl} alt={marca.nombre} className="marca-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderMarcas;