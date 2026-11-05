package com.radiocafe.infrastructure.adapters.out.persistence.repository;

import com.radiocafe.infrastructure.adapters.out.persistence.entity.IlustracionKappuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpringDataIllustrationRepository extends JpaRepository<IlustracionKappuEntity, Long> {
    Optional<IlustracionKappuEntity> findByCodigoPremio(String codigoPremio);

    @Query("SELECT i FROM IlustracionKappuEntity i ORDER BY i.votosCount DESC")
    List<IlustracionKappuEntity> findTopByOrderByVotosCountDesc();
}