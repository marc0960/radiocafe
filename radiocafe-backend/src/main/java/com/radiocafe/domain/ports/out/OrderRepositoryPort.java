package com.radiocafe.domain.ports.out;

import com.radiocafe.domain.model.EstadoPedido;
import com.radiocafe.domain.model.Pedido;

import java.util.List;
import java.util.Optional;

public interface OrderRepositoryPort {
    
    Pedido guardar(Pedido pedido);
    
    Optional<Pedido> buscarPorId(Long idPedido);
    
    List<Pedido> buscarPorUsuario(Long idUsuario);
    
    List<Pedido> buscarPorEstado(EstadoPedido estado);
    
    List<Pedido> obtenerTodos();
}