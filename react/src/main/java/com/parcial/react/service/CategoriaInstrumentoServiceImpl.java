package com.parcial.react.service;

import com.parcial.react.models.CategoriaInstrumento;
import com.parcial.react.repository.CategoriaInstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaInstrumentoServiceImpl implements CategoriaInstrumentoService {

    private final CategoriaInstrumentoRepository repo;

    @Autowired
    public CategoriaInstrumentoServiceImpl(CategoriaInstrumentoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<CategoriaInstrumento> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<CategoriaInstrumento> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public CategoriaInstrumento save(CategoriaInstrumento categoria) {
        categoria.setId(null); // para estar seguro de que sea un insert
        return repo.save(categoria);
    }

    @Override
    public CategoriaInstrumento update(Long id, CategoriaInstrumento categoriaActualizada) {
        return repo.findById(id)
                .map(c -> {
                    c.setDenominacion(categoriaActualizada.getDenominacion());
                    return repo.save(c);
                })
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id " + id));
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}