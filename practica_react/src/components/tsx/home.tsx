import React from 'react';
import { HomeCarousel } from './HomeCarousel';
import '../css/Home.css';



export const Home: React.FC = () => {
  return (
    <div className="home-page">
    <HomeCarousel />
    <section className="home-about">
      <h2>Musical Hendrix</h2>
      <p>
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia.
        Tenemos el conocimiento y la capacidad para informarte acerca de las mejores elecciones
        para tu compra musical.
      </p>
    </section>
  </div>
  );
};