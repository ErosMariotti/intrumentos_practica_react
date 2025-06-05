package com.parcial.react.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categoria_instrumento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaInstrumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "denominacion", nullable = false, length = 128)
    private String denominacion;

}