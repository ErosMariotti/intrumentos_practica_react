package com.parcial.react.service;

import com.parcial.react.models.Instrumentos;
import com.parcial.react.models.Pedido;
import com.parcial.react.models.PedidoDetalle;
import com.parcial.react.repository.InstrumentoRepository;
import com.parcial.react.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository repo;
    private final InstrumentoRepository instrumentoRepo;

    @Autowired
    public PedidoServiceImpl(PedidoRepository repo, InstrumentoRepository instrumentoRepo) {
        this.repo = repo;
        this.instrumentoRepo = instrumentoRepo;
    }

    @Override
    public List<Pedido> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Pedido> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Pedido save(Pedido pedido) {
        // Calcular totalPedido a partir de los detalles (opcional, según tu lógica):
        for (PedidoDetalle detalle : pedido.getDetalles()) {
            // getId() regresa un int primitivo; lo convertimos a long
            long instrIdPrim = detalle.getInstrumento().getId();
            Long instrId = Long.valueOf(instrIdPrim);
            // o también: Long instrId = new Long(instrIdPrim);

            Instrumentos instBD = instrumentoRepo.findById(instrId)
                    .orElseThrow(() -> new RuntimeException(
                            "Instrumento no encontrado con ID " + instrId));

            detalle.setInstrumento(instBD);
            detalle.setPedido(pedido);
        }

        double total = pedido.getDetalles()
                .stream()
                .mapToDouble(d -> {
                    String precioStr = d.getInstrumento().getPrecio();
                    return d.getCantidad() * Double.parseDouble(precioStr);
                })
                .sum();
        pedido.setTotalPedido(total);

        return repo.save(pedido);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
