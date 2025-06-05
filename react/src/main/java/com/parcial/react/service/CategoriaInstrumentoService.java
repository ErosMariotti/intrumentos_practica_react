package com.parcial.react.service;

import com.parcial.react.models.CategoriaInstrumento;

import java.util.List;
import java.util.Optional;

import java.util.List;
import java.util.Optional;

public interface CategoriaInstrumentoService {

    List<CategoriaInstrumento> findAll();

    Optional<CategoriaInstrumento> findById(Long id);

    CategoriaInstrumento save(CategoriaInstrumento categoria);

    CategoriaInstrumento update(Long id, CategoriaInstrumento categoriaActualizada);

    void deleteById(Long id);

}