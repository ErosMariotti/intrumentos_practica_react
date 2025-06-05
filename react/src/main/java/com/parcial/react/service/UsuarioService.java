package com.parcial.react.service;

import com.parcial.react.models.Usuario;

import java.util.Optional;

public interface UsuarioService {
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    Usuario save(Usuario usuario);
}