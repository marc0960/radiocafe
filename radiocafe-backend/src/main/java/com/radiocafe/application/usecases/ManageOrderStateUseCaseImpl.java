package com.radiocafe.application.usecases;

import com.radiocafe.domain.model.EstadoPedido;
import com.radiocafe.domain.model.Pedido;
import com.radiocafe.domain.ports.in.ManageOrderStateUseCase;
import com.radiocafe.domain.ports.out.OrderRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class ManageOrderStateUseCaseImpl implements ManageOrderStateUseCase {

    private final OrderRepositoryPort orderRepositoryPort;

    public ManageOrderStateUseCaseImpl(OrderRepositoryPort orderRepositoryPort) {
        this.orderRepositoryPort = orderRepositoryPort;
    }

    @Override
    public Pedido cambiarEstadoPedido(Long idPedido, EstadoPedido nuevoEstado) {
        Pedido pedido = orderRepositoryPort.buscarPorId(idPedido)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con ID: " + idPedido));

        pedido.setEstadoPedido(nuevoEstado);

        return orderRepositoryPort.guardar(pedido);
    }
}