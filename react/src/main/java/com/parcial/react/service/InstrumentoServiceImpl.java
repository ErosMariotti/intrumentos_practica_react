package com.parcial.react.service;

import com.parcial.react.models.Instrumentos;
import com.parcial.react.repository.InstrumentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoServiceImpl implements InstrumentoService {

    private final InstrumentoRepository repo;

    public InstrumentoServiceImpl(InstrumentoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Instrumentos> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Instrumentos> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Instrumentos create(Instrumentos instrumento) {
        return repo.save(instrumento);
    }

    @Override
    public Instrumentos update(Long id, Instrumentos instrumento) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setInstrumento(instrumento.getInstrumento());
                    existing.setMarca(instrumento.getMarca());
                    existing.setModelo(instrumento.getModelo());
                    existing.setImagen(instrumento.getImagen());
                    existing.setPrecio(instrumento.getPrecio());
                    existing.setCostoEnvio(instrumento.getCostoEnvio());
                    existing.setCantidadVendida(instrumento.getCantidadVendida());
                    existing.setDescripcion(instrumento.getDescripcion());
                    existing.setCategoria(instrumento.getCategoria()); // aquí se toma la nueva
                    return repo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado con id " + id));
    }


    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
