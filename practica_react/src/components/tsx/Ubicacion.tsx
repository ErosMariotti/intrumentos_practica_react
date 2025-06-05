// src/components/Ubicacion.tsx
import React from 'react';
import '../css/Ubicacion.css'; 

export const Ubicacion: React.FC = () => (
  <div className="ubicacion-container">
    <h2>¿Dónde Estamos?</h2>
    <div className="map-wrapper">
      <iframe
        title="Ubicación Musical Hendrix"
        src="https://www.google.com/maps?q=Av+Las+Heras+%26+Av+San+Martin,+Mendoza&hl=es;z=15&output=embed"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  </div>
);
