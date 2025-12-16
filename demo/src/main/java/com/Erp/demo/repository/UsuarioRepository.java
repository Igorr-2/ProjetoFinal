package com.Erp.demo.repository;

import com.Erp.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByMatricula(String matricula);
    Optional<Usuario> findByEmail(String email);
}
