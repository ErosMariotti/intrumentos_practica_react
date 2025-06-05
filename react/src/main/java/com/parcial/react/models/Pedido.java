package com.parcial.react.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Fecha en que se realizó el pedido
    @Column(name = "fecha_pedido", nullable = false)
    private LocalDate fechaPedido;

    // Total del pedido (suma de todos los subproductos * precio)
    @Column(name = "total_pedido", nullable = false)
    private Double totalPedido;

    // Relación uno-a-muchos hacia PedidoDetalle
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PedidoDetalle> detalles = new ArrayList<>();

    // Método de conveniencia para agregar un detalle
    public void addDetalle(PedidoDetalle detalle) {
        detalles.add(detalle);
        detalle.setPedido(this);
    }

    // Método de conveniencia para remover un detalle
    public void removeDetalle(PedidoDetalle detalle) {
        detalles.remove(detalle);
        detalle.setPedido(null);
    }
}
