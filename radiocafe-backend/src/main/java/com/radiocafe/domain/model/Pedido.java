package com.radiocafe.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Pedido {

    private Long idPedido;
    private Long idUsuario;
    private EstadoPedido estadoPedido;
    private TipoEntrega tipoEntrega;
    private String direccionEntrega;
    private Double latitud;
    private Double longitud;
    private BigDecimal subtotal;
    private BigDecimal costoEnvio;
    private BigDecimal total;
    private LocalDateTime fechaCreacion;
    private List<DetallePedido> detalles;

    public Pedido() {
        this.detalles = new ArrayList<>();
        this.estadoPedido = EstadoPedido.PENDIENTE;
        this.fechaCreacion = LocalDateTime.now();
        this.subtotal = BigDecimal.ZERO;
        this.costoEnvio = BigDecimal.ZERO;
        this.total = BigDecimal.ZERO;
    }

    public void agregarDetalle(DetallePedido detalle) {
        this.detalles.add(detalle);
        recalcularTotales();
    }

    public void recalcularTotales() {
        this.subtotal = detalles.stream()
                .map(DetallePedido::getSubtotalLinea)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Regla de Negocio: Envío Gratis si Subtotal >= $50.00
        if (this.tipoEntrega == TipoEntrega.DELIVERY) {
            if (this.subtotal.compareTo(new BigDecimal("50.00")) >= 0) {
                this.costoEnvio = BigDecimal.ZERO;
            } else {
                this.costoEnvio = new BigDecimal("5.00"); // Costo fijo estándar
            }
        } else {
            this.costoEnvio = BigDecimal.ZERO; // PICKUP no cobra envío
        }

        this.total = this.subtotal.add(this.costoEnvio);
    }

    // Getters y Setters
    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public EstadoPedido getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; }

    public TipoEntrega getTipoEntrega() { return tipoEntrega; }
    public void setTipoEntrega(TipoEntrega tipoEntrega) { 
        this.tipoEntrega = tipoEntrega; 
        recalcularTotales();
    }

    public String getDireccionEntrega() { return direccionEntrega; }
    public void setDireccionEntrega(String direccionEntrega) { this.direccionEntrega = direccionEntrega; }

    public Double getLatitud() { return latitud; }
    public void setLatitud(Double latitud) { this.latitud = latitud; }

    public Double getLongitud() { return longitud; }
    public void setLongitud(Double longitud) { this.longitud = longitud; }

    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getCostoEnvio() { return costoEnvio; }
    public BigDecimal getTotal() { return total; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public List<DetallePedido> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedido> detalles) { 
        this.detalles = detalles; 
        recalcularTotales();
    }
}