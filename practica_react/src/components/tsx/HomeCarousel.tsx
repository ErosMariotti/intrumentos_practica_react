// src/components/HomeCarousel.tsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/HomeCarousel.css';

const slides = [
  {
    src: 'https://academia.nubimetrics.com/hubfs/4%20ideias%20de%20instrumentos%20musicais%20para%20vender%20no%20Mercado%20Livre.jpg',
    alt: 'Instrumentos para vender',
    caption: 'Bienvenido a Musical Hendrix'
  },
  {
    src: 'https://www.sanganxa.com/blog/wp-content/uploads/2022/08/instrumentos-profesionales.png',
    alt: 'Instrumentos profesionales',
    caption: 'Calidad profesional y asesoramiento experto'
  },
  {
    src: 'https://media.istockphoto.com/id/894058154/es/foto/instrumentos-musical.jpg?s=612x612&w=0&k=20&c=WjTwmZPcFkGuAU7DAjpToSMe5baR8XJvHkyg3jMxkWg=',
    alt: 'Variedad de instrumentos',
    caption: 'Más de 15 años de experiencia en música'
  },
];

export const HomeCarousel: React.FC = () => (
  <Carousel className="home-carousel">
    {slides.map((s, i) => (
      <Carousel.Item key={i}>
        <img className="d-block w-100" src={s.src} alt={s.alt} />
        <Carousel.Caption>
          <h3>{s.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);
