package com.radiocafe.domain.ports.in;

import com.radiocafe.domain.model.Pedido;

public interface CreateOrderUseCase {
    Pedido crearPedido(Pedido pedido);
}