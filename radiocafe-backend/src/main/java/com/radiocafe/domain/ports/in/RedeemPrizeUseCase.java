package com.radiocafe.domain.ports.in;

import com.radiocafe.domain.model.IlustracionKappu;

public interface RedeemPrizeUseCase {
    IlustracionKappu canjearPremioPorCodigo(String codigoPremio);
}