import { useState, useEffect } from 'react';

// Este hook personalizado devuelve el ancho y alto de la ventana del navegador.
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    // Limpieza al desmontar el componente para evitar fugas de memoria
    return () => window.removeEventListener('resize', handleResize);
  }, []); // El array vacío asegura que el efecto solo se ejecute una vez

  return windowSize;
}