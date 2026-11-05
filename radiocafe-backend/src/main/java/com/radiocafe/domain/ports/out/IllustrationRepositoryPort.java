package com.radiocafe.domain.ports.out;

import com.radiocafe.domain.model.IlustracionKappu;

import java.util.List;
import java.util.Optional;

public interface IllustrationRepositoryPort {

    IlustracionKappu guardar(IlustracionKappu ilustracion);

    Optional<IlustracionKappu> buscarPorId(Long idIlustracion);

    Optional<IlustracionKappu> buscarPorCodigoPremio(String codigoPremio);

    List<IlustracionKappu> obtenerTodas();

    List<IlustracionKappu> obtenerTopFinalistas(int limite);
}