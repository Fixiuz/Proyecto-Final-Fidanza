// src/components/SliderMarcas/SliderMarcas.jsx

import React from 'react';
import './SliderMarcasUno.css'; // Crearemos este archivo de estilos en el siguiente paso

// Define la lista de marcas que quieres mostrar.
// Puedes agregar o quitar marcas fácilmente desde aquí.
const marcas = [
  { nombre: 'Biostar', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594736/D_NQ_899461-MLA54971440372_042023-OO_ebkb6j.jpg' },
  { nombre: 'Genius', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593030/D_NQ_832224-MLA69027159437_042023-OO_t15vor.jpg' },
  { nombre: 'Seagate', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594869/D_NQ_854811-MLA54964141701_042023-OO_trbknh.jpg' },
  { nombre: 'Xpg', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594739/D_NQ_655488-MLA69038896398_042023-OO_dkqwwy.jpg' },
  { nombre: 'Sandisk', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594741/D_NQ_800210-MLA27498083883_062018-OO_vfqr0k.jpg' },
  { nombre: 'WesternDigital', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594748/D_NQ_855577-MLA54971424688_042023-OO_plobu1.jpg' },
  { nombre: 'Apple', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594808/D_NQ_947749-MLA27179996125_042018-OO_yw3brs.jpg' },
  { nombre: 'Nintendo', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752594805/D_NQ_745024-MLA54971440172_042023-OO_mdxgpp.jpg' },    
  { nombre: 'CoolerMaster', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593033/D_NQ_880637-MLA54965899047_042023-OO_b68gc8.jpg' },
  { nombre: 'Lg', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593031/D_NQ_841110-MLA27927033182_082018-OO_tf5qam.jpg' },
  { nombre: 'Patriot', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593026/D_NQ_693474-MLA69004484523_042023-OO_gyxslh.jpg' },
  { nombre: 'Epson', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592987/D_NQ_993833-MLA27498039494_062018-OO_nagsuy.jpg' },
  { nombre: 'Thermaltake', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593018/tumb_05-11-2018-12-11-24-logo_uwa9cv.jpg' },
  { nombre: 'Lenovo', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592980/D_NQ_904193-MLA78083618341_072024-OO_jhvbc9.jpg' },
  { nombre: 'Samsung', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592985/D_NQ_978072-MLA27130853286_042018-OO_ifarhm.jpg' },
  { nombre: 'RedDragon', logoUrl: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752592999/tumb_04-01-2020-11-01-20-untitled-1_521_bbmtsa.jpg' },



];

function SliderMarcasUno() {
  return (
    <div className="slider-container">
      <div className="slider-track">
       
        {marcas.map((marca, index) => (
          <div className="marca" key={`marca1-${index}`}>
            <img src={marca.logoUrl} alt={marca.nombre} className="marca-logo" />
          </div>
        ))}
        
        {marcas.map((marca, index) => (
          <div className="marca" key={`marca2-${index}`}>
            <img src={marca.logoUrl} alt={marca.nombre} className="marca-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderMarcasUno;