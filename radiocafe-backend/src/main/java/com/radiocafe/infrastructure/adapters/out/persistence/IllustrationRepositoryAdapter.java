package com.radiocafe.infrastructure.adapters.out.persistence;

import com.radiocafe.domain.model.IlustracionKappu;
import com.radiocafe.domain.ports.out.IllustrationRepositoryPort;
import com.radiocafe.infrastructure.adapters.out.persistence.entity.IlustracionKappuEntity;
import com.radiocafe.infrastructure.adapters.out.persistence.repository.SpringDataIllustrationRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class IllustrationRepositoryAdapter implements IllustrationRepositoryPort {

    private final SpringDataIllustrationRepository repository;

    public IllustrationRepositoryAdapter(SpringDataIllustrationRepository repository) {
        this.repository = repository;
    }

    @Override
    public IlustracionKappu guardar(IlustracionKappu ilustracion) {
        IlustracionKappuEntity entity = toEntity(ilustracion);
        IlustracionKappuEntity saved = repository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<IlustracionKappu> buscarPorId(Long idIlustracion) {
        return repository.findById(idIlustracion).map(this::toDomain);
    }

    @Override
    public Optional<IlustracionKappu> buscarPorCodigoPremio(String codigoPremio) {
        return repository.findByCodigoPremio(codigoPremio).map(this::toDomain);
    }

    @Override
    public List<IlustracionKappu> obtenerTodas() {
        return repository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<IlustracionKappu> obtenerTopFinalistas(int limite) {
        return repository.findTopByOrderByVotosCountDesc().stream()
                .limit(limite)
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private IlustracionKappuEntity toEntity(IlustracionKappu domain) {
        IlustracionKappuEntity entity = new IlustracionKappuEntity();
        entity.setIdIlustracion(domain.getIdIlustracion());
        entity.setIdUsuario(domain.getIdUsuario());
        entity.setTituloObra(domain.getTituloObra());
        entity.setImagenUrl(domain.getImagenUrl());
        entity.setVotosCount(domain.getVotosCount());
        entity.setEsFinalista(domain.getEsFinalista());
        entity.setEsGanador(domain.getEsGanador());
        entity.setCodigoPremio(domain.getCodigoPremio());
        entity.setEstadoPremio(domain.getEstadoPremio());
        entity.setFechaCanje(domain.getFechaCanje());
        return entity;
    }

    private IlustracionKappu toDomain(IlustracionKappuEntity entity) {
        IlustracionKappu domain = new IlustracionKappu();
        domain.setIdIlustracion(entity.getIdIlustracion());
        domain.setIdUsuario(entity.getIdUsuario());
        domain.setTituloObra(entity.getTituloObra());
        domain.setImagenUrl(entity.getImagenUrl());
        domain.setVotosCount(entity.getVotosCount());
        domain.setEsFinalista(entity.getEsFinalista());
        domain.setEsGanador(entity.getEsGanador());
        domain.setCodigoPremio(entity.getCodigoPremio());
        domain.setEstadoPremio(entity.getEstadoPremio());
        domain.setFechaSubida(entity.getFechaSubida());
        domain.setFechaCanje(entity.getFechaCanje());
        return domain;
    }
}