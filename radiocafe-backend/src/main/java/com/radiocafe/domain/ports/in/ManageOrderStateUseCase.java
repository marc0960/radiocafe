package com.radiocafe.domain.ports.in;

import com.radiocafe.domain.model.EstadoPedido;
import com.radiocafe.domain.model.Pedido;

public interface ManageOrderStateUseCase {
    Pedido cambiarEstadoPedido(Long idPedido, EstadoPedido nuevoEstado);
}