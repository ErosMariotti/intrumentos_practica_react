package com.parcial.react.controller;

import com.parcial.react.models.CategoriaInstrumento;
import com.parcial.react.service.CategoriaInstrumentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")  // ajustar si necesitás restringir orígenes
public class CategoriaInstrumentoController {

    private final CategoriaInstrumentoService service;

    public CategoriaInstrumentoController(CategoriaInstrumentoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaInstrumento>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaInstrumento> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoriaInstrumento> create(@RequestBody CategoriaInstrumento nueva) {
        CategoriaInstrumento creada = service.save(nueva);
        return ResponseEntity.ok(creada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaInstrumento> update(
            @PathVariable Long id,
            @RequestBody CategoriaInstrumento actualizada) {
        CategoriaInstrumento updated = service.update(id, actualizada);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}