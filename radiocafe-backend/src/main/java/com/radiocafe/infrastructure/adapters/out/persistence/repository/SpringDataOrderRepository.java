package com.radiocafe.infrastructure.adapters.out.persistence.repository;

import com.radiocafe.domain.model.EstadoPedido;
import com.radiocafe.infrastructure.adapters.out.persistence.entity.PedidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpringDataOrderRepository extends JpaRepository<PedidoEntity, Long> {
    List<PedidoEntity> findByIdUsuario(Long idUsuario);
    List<PedidoEntity> findByEstadoPedido(EstadoPedido estadoPedido);
}