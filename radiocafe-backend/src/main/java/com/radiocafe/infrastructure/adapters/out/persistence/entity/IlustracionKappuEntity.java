package com.radiocafe.infrastructure.adapters.out.persistence.entity;

import com.radiocafe.domain.model.EstadoPremio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "ilustraciones_kappu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IlustracionKappuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ilustracion")
    private Long idIlustracion;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(name = "titulo_obra", nullable = false, length = 150)
    private String tituloObra;

    @Column(name = "imagen_url", nullable = false, columnDefinition = "TEXT")
    private String imagenUrl;

    @Column(name = "votos_count")
    private Integer votosCount = 0;

    @Column(name = "es_finalista")
    private Boolean esFinalista = false;

    @Column(name = "es_ganador")
    private Boolean esGanador = false;

    @Column(name = "codigo_premio", unique = true, length = 50)
    private String codigoPremio;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_premio", length = 20)
    private EstadoPremio estadoPremio = EstadoPremio.SIN_PREMIO;

    @Column(name = "fecha_subida", updatable = false)
    private LocalDateTime fechaSubida;

    @Column(name = "fecha_canje")
    private LocalDateTime fechaCanje;

    @PrePersist
    protected void onCreate() {
        this.fechaSubida = LocalDateTime.now();
    }
}