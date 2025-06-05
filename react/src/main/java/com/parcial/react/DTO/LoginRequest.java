package com.parcial.react.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String nombreUsuario;
    private String clave;
}