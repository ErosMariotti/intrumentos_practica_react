package com.parcial.react.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "instrumento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Instrumentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private String precio;
    private String costoEnvio;
    private String cantidadVendida;

    @Column(length = 2000)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name="categoria_id", nullable=false)
    private CategoriaInstrumento categoria;

}