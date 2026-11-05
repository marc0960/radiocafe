package com.radiocafe.domain.model;

import java.time.LocalDateTime;

public class IlustracionKappu {

    private Long idIlustracion;
    private Long idUsuario;
    private String tituloObra;
    private String imagenUrl;
    private Integer votosCount;
    private Boolean esFinalista;
    private Boolean esGanador;
    private String codigoPremio;
    private EstadoPremio estadoPremio;
    private LocalDateTime fechaSubida;
    private LocalDateTime fechaCanje;

    public IlustracionKappu() {
        this.votosCount = 0;
        this.esFinalista = false;
        this.esGanador = false;
        this.estadoPremio = EstadoPremio.SIN_PREMIO;
        this.fechaSubida = LocalDateTime.now();
    }

    // Regla de Negocio: Canjear el premio mediante QR en el local
    public void canjearPremio() {
        if (!Boolean.TRUE.equals(this.esGanador)) {
            throw new IllegalStateException("Esta ilustración no ha sido marcada como ganadora.");
        }
        if (this.estadoPremio == EstadoPremio.RECLAMADO) {
            throw new IllegalStateException("Este premio ya ha sido canjeado anteriormente.");
        }
        this.estadoPremio = EstadoPremio.RECLAMADO;
        this.fechaCanje = LocalDateTime.now();
    }

    // Getters y Setters
    public Long getIdIlustracion() { return idIlustracion; }
    public void setIdIlustracion(Long idIlustracion) { this.idIlustracion = idIlustracion; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public String getTituloObra() { return tituloObra; }
    public void setTituloObra(String tituloObra) { this.tituloObra = tituloObra; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Integer getVotosCount() { return votosCount; }
    public void setVotosCount(Integer votosCount) { this.votosCount = votosCount; }

    public Boolean getEsFinalista() { return esFinalista; }
    public void setEsFinalista(Boolean esFinalista) { this.esFinalista = esFinalista; }

    public Boolean getEsGanador() { return esGanador; }
    public void setEsGanador(Boolean esGanador) { this.esGanador = esGanador; }

    public String getCodigoPremio() { return codigoPremio; }
    public void setCodigoPremio(String codigoPremio) { this.codigoPremio = codigoPremio; }

    public EstadoPremio getEstadoPremio() { return estadoPremio; }
    public void setEstadoPremio(EstadoPremio estadoPremio) { this.estadoPremio = estadoPremio; }

    public LocalDateTime getFechaSubida() { return fechaSubida; }
    public void setFechaSubida(LocalDateTime fechaSubida) { this.fechaSubida = fechaSubida; }

    public LocalDateTime getFechaCanje() { return fechaCanje; }
    public void setFechaCanje(LocalDateTime fechaCanje) { this.fechaCanje = fechaCanje; }
}