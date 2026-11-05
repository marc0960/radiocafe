package com.radiocafe.infrastructure.adapters.in.web;

import com.radiocafe.domain.model.EstadoPedido;
import com.radiocafe.domain.model.Pedido;
import com.radiocafe.domain.ports.in.CreateOrderUseCase;
import com.radiocafe.domain.ports.in.ManageOrderStateUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final CreateOrderUseCase createOrderUseCase;
    private final ManageOrderStateUseCase manageOrderStateUseCase;

    public OrderController(CreateOrderUseCase createOrderUseCase, ManageOrderStateUseCase manageOrderStateUseCase) {
        this.createOrderUseCase = createOrderUseCase;
        this.manageOrderStateUseCase = manageOrderStateUseCase;
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        Pedido nuevoPedido = createOrderUseCase.crearPedido(pedido);
        return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
    }

    @PatchMapping("/{idPedido}/status")
    public ResponseEntity<Pedido> cambiarEstado(
            @PathVariable Long idPedido,
            @RequestParam EstadoPedido nuevoEstado) {
        Pedido pedidoActualizado = manageOrderStateUseCase.cambiarEstadoPedido(idPedido, nuevoEstado);
        return ResponseEntity.ok(pedidoActualizado);
    }
}