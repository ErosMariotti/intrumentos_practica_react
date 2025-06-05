package com.parcial.react.repository;


import com.parcial.react.models.Instrumentos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumentos, Long> {
}