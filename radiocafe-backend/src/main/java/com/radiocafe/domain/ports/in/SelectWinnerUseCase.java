package com.radiocafe.domain.ports.in;

import com.radiocafe.domain.model.IlustracionKappu;

public interface SelectWinnerUseCase {
    IlustracionKappu seleccionarGanador(Long idIlustracion);
}