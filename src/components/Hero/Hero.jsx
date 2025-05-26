
import React from 'react'; 
import './Hero.css';

import { Carousel } from 'react-bootstrap'; 

function Hero() {
  
  const sliderImages = [
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105751/slider_VIDEO_JUEGOS_rxrquw.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105751/slider_FORMAS_DE_PAGO_foej5e.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105751/slider_ARMA_CONFIGURACION_bryraa.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105750/slider_ENVIOS_hnpxr3.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105750/slider_NOTEBOOKS_uypu1a.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748105750/slider_COMPUTADORAS_oqjjop.jpg',
  ];

  return (
    
    <Carousel
      fade
      interval={4000}
      controls={true}   
      indicators={false} 
      pause="hover"
      className="hero-full-width-carousel" 
    >
      {sliderImages.map((imageSrc, index) => (
        <Carousel.Item key={index}> 
          <img
            className="d-block w-100 hero-slider-img" 
            src={imageSrc}
            alt={`Slide ${index + 1}`}
          />
          
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Hero;