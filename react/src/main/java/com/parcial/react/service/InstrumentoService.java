package com.parcial.react.service;

import com.parcial.react.models.Instrumentos;

import java.util.List;
import java.util.Optional;

public interface InstrumentoService {
    List<Instrumentos> findAll();
    Optional<Instrumentos> findById(Long id);
    Instrumentos create(Instrumentos instrumento);
    Instrumentos update(Long id, Instrumentos instrumento);
    void delete(Long id);
}