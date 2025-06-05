package com.parcial.react.controller;

import com.parcial.react.DTO.LoginRequest;
import com.parcial.react.config.HashUtil;
import com.parcial.react.models.Usuario;
import com.parcial.react.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;

    @Autowired
    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 1) Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return usuarioService.findByNombreUsuario(request.getNombreUsuario())
                .map(usuario -> {
                    // Comparar hash de la clave
                    String hashIngresado = HashUtil.sha256(request.getClave());
                    if (usuario.getClave().equals(hashIngresado)) {
                        // No devolvemos la clave en la respuesta
                        usuario.setClave(null);
                        return ResponseEntity.ok(usuario);
                    } else {
                        return ResponseEntity
                                .badRequest()
                                .body("Usuario y/o Clave incorrectos, vuelva a intentar");
                    }
                })
                .orElseGet(() ->
                        ResponseEntity
                                .badRequest()
                                .body("Usuario y/o Clave incorrectos, vuelva a intentar")
                );
    }

    // 2) (Opcional) Endpoint para registrar usuarios iniciales
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (usuarioService.findByNombreUsuario(request.getNombreUsuario()).isPresent()) {
            return ResponseEntity.badRequest().body("Nombre de usuario ya en uso");
        }
        Usuario nuevo = Usuario.builder()
                .nombreUsuario(request.getNombreUsuario())
                .clave(HashUtil.sha256(request.getClave()))
                // Para un registro simple, por defecto asignamos rol "Visor"
                .rol("Visor")
                .build();
        Usuario guardado = usuarioService.save(nuevo);
        guardado.setClave(null);
        return ResponseEntity.ok(guardado);
    }
}