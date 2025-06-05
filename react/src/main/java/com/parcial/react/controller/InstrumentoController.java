package com.parcial.react.controller;

import com.parcial.react.models.Instrumentos;
import com.parcial.react.service.InstrumentoService;
import com.parcial.react.service.UsuarioService;
import com.parcial.react.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin(origins = "*")
public class InstrumentoController {

    private final InstrumentoService instrumentoService;
    private final UsuarioService usuarioService;

    @Autowired
    public InstrumentoController(InstrumentoService instrumentoService,
                                 UsuarioService usuarioService) {
        this.instrumentoService = instrumentoService;
        this.usuarioService = usuarioService;
    }

    // Método helper para verificar rol Admin
    private boolean esAdmin(String nombreUsuario) {
        if (nombreUsuario == null) return false;
        Usuario u = usuarioService.findByNombreUsuario(nombreUsuario).orElse(null);
        return u != null && "Admin".equalsIgnoreCase(u.getRol());
    }

    // Listar todos: cualquiera con sesión activa puede leer (Operador, Visor), no requiere Admin
    @GetMapping
    public ResponseEntity<?> getAll(@RequestHeader(value = "X-Usuario", required = false) String nombreUsuario) {
        if (nombreUsuario == null) {
            return ResponseEntity.status(401).body("Debe iniciar sesión");
        }
        // Usuarios con rol “Visor” u “Operador” o “Admin” pueden leer
        return ResponseEntity.ok(instrumentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@RequestHeader(value = "X-Usuario", required = false) String nombreUsuario,
                                     @PathVariable Long id) {
        if (nombreUsuario == null) {
            return ResponseEntity.status(401).body("Debe iniciar sesión");
        }
        return ResponseEntity.ok(instrumentoService.findById(id));
    }

    // Crear: solo Admin
    @PostMapping
    public ResponseEntity<?> create(@RequestHeader(value = "X-Usuario", required = false) String nombreUsuario,
                                    @RequestBody Instrumentos nuevo) {
        if (!esAdmin(nombreUsuario)) {
            return ResponseEntity.status(403).body("Acceso denegado: Solo Admin");
        }
        Instrumentos creado = instrumentoService.create(nuevo);
        return ResponseEntity.ok(creado);
    }

    // Editar: solo Admin
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestHeader(value = "X-Usuario", required = false) String nombreUsuario,
                                    @PathVariable Long id,
                                    @RequestBody Instrumentos actualizado) {
        if (!esAdmin(nombreUsuario)) {
            return ResponseEntity.status(403).body("Acceso denegado: Solo Admin");
        }
        Instrumentos editado = instrumentoService.update(id, actualizado);
        return ResponseEntity.ok(editado);
    }

    // Eliminar: solo Admin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestHeader(value = "X-Usuario", required = false) String nombreUsuario,
                                    @PathVariable Long id) {
        if (!esAdmin(nombreUsuario)) {
            return ResponseEntity.status(403).body("Acceso denegado: Solo Admin");
        }
        instrumentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}