package com.radiocafe.domain.ports.out;

import com.radiocafe.domain.model.Usuario;

import java.util.Optional;

public interface UserRepositoryPort {

    Usuario guardar(Usuario usuario);

    Optional<Usuario> buscarPorId(Long idUsuario);

    Optional<Usuario> buscarPorCorreo(String correo);

    boolean existePorCorreo(String correo);
}