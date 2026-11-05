package com.radiocafe.application.usecases;

import com.radiocafe.domain.model.IlustracionKappu;
import com.radiocafe.domain.ports.in.RedeemPrizeUseCase;
import com.radiocafe.domain.ports.out.IllustrationRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class RedeemPrizeUseCaseImpl implements RedeemPrizeUseCase {

    private final IllustrationRepositoryPort illustrationRepositoryPort;

    public RedeemPrizeUseCaseImpl(IllustrationRepositoryPort illustrationRepositoryPort) {
        this.illustrationRepositoryPort = illustrationRepositoryPort;
    }

    @Override
    public IlustracionKappu canjearPremioPorCodigo(String codigoPremio) {
        IlustracionKappu ilustracion = illustrationRepositoryPort.buscarPorCodigoPremio(codigoPremio)
                .orElseThrow(() -> new IllegalArgumentException("Código de premio no encontrado o inválido: " + codigoPremio));

        // Aplica las validaciones de dominio y cambia el estado a RECLAMADO
        ilustracion.canjearPremio();

        return illustrationRepositoryPort.guardar(ilustracion);
    }
}