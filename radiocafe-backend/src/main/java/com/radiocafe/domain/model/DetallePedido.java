package com.radiocafe.domain.model;

import java.math.BigDecimal;

public class DetallePedido {

    private Long idDetalle;
    private Long idProducto;
    private String nombreProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotalLinea;

    public DetallePedido() {}

    public DetallePedido(Long idProducto, String nombreProducto, Integer cantidad, BigDecimal precioUnitario) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotalLinea = precioUnitario.multiply(new BigDecimal(cantidad));
    }

    // Getters y Setters
    public Long getIdDetalle() { return idDetalle; }
    public void setIdDetalle(Long idDetalle) { this.idDetalle = idDetalle; }

    public Long getIdProducto() { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

    public String getNombreProducto() { return nombreProducto; }
    public void setNombreProducto(String nombreProducto) { this.nombreProducto = nombreProducto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { 
        this.cantidad = cantidad;
        if (this.precioUnitario != null) {
            this.subtotalLinea = this.precioUnitario.multiply(new BigDecimal(cantidad));
        }
    }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { 
        this.precioUnitario = precioUnitario;
        if (this.cantidad != null) {
            this.subtotalLinea = precioUnitario.multiply(new BigDecimal(this.cantidad));
        }
    }

    public BigDecimal getSubtotalLinea() { return subtotalLinea; }
}