
import React from 'react'; 
import './SegundoSlider.css';

import { Carousel } from 'react-bootstrap'; 

function SegundoSlider() {
  
  const sliderImages = [
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593081/home_1920x504_kwubwo.png',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593174/home-kingston-q2-1920-2_vbn8d8.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593088/home-coolermaster-1920x504-2_jzszd1.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593086/home-aon-nvidia-rtx50-1920x504_lkkaph.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593079/banner-smartwatch-auris-home_t5jjeo.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593079/banner-home-asus-monitores-2_jvc4sj.png',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593074/banner-2025-2_nu8osv.png',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593045/9060-home-1920_opdeyw.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593043/mars_980_blade_k_saleskit_1920x504_pv3jbx.jpg',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593041/hyperx-week-1920-3_hfukto.png',
    'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1752593040/home-msi-q2-1920-2_eiktn8.jpg',
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

export default SegundoSlider;