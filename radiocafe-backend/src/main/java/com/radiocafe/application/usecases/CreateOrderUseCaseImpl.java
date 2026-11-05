package com.radiocafe.application.usecases;

import com.radiocafe.domain.model.Pedido;
import com.radiocafe.domain.ports.in.CreateOrderUseCase;
import com.radiocafe.domain.ports.out.OrderRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class CreateOrderUseCaseImpl implements CreateOrderUseCase {

    private final OrderRepositoryPort orderRepositoryPort;

    public CreateOrderUseCaseImpl(OrderRepositoryPort orderRepositoryPort) {
        this.orderRepositoryPort = orderRepositoryPort;
    }

    @Override
    public Pedido crearPedido(Pedido pedido) {
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("Un pedido debe contener al menos un producto.");
        }

        // Ejecuta la regla de negocio del modelo (Cálculo de Envío Gratis si Subtotal >= $50)
        pedido.recalcularTotales();

        return orderRepositoryPort.guardar(pedido);
    }
}