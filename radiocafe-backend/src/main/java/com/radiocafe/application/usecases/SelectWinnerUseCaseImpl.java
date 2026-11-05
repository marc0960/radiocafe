package com.radiocafe.application.usecases;

import com.radiocafe.domain.model.EstadoPremio;
import com.radiocafe.domain.model.IlustracionKappu;
import com.radiocafe.domain.ports.in.SelectWinnerUseCase;
import com.radiocafe.domain.ports.out.IllustrationRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SelectWinnerUseCaseImpl implements SelectWinnerUseCase {

    private final IllustrationRepositoryPort illustrationRepositoryPort;

    public SelectWinnerUseCaseImpl(IllustrationRepositoryPort illustrationRepositoryPort) {
        this.illustrationRepositoryPort = illustrationRepositoryPort;
    }

    @Override
    public IlustracionKappu seleccionarGanador(Long idIlustracion) {
        IlustracionKappu ilustracion = illustrationRepositoryPort.buscarPorId(idIlustracion)
                .orElseThrow(() -> new IllegalArgumentException("Ilustración no encontrada con ID: " + idIlustracion));

        ilustracion.setEsGanador(true);
        ilustracion.setEstadoPremio(EstadoPremio.PENDIENTE_RECOJO);
        
        // Genera el código único que se convertirá en la imagen del QR
        String codigoGenerado = "KAPPU-WIN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        ilustracion.setCodigoPremio(codigoGenerado);

        return illustrationRepositoryPort.guardar(ilustracion);
    }
}