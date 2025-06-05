package com.parcial.react.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_usuario", unique = true, nullable = false, length = 50)
    private String nombreUsuario;

    @Column(nullable = false, length = 100)
    private String clave;      // (se almacenará hasheada)

    @Column(nullable = false, length = 20)
    private String rol;        // Ej. "Admin", "Operador", "Visor"
}