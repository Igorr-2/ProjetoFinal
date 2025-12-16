package com.Erp.demo.service;

import com.Erp.demo.exception.EmailDuplicadoException;
import com.Erp.demo.model.Usuario;
import com.Erp.demo.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import com.Erp.demo.model.Perfil;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario criarUsuario(Usuario usuario) {
        usuario.setPerfil(Perfil.CLIENTE);
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new EmailDuplicadoException("O e-mail " + usuario.getEmail() + " já está cadastrado.");
        }
        if (usuario.getMatricula() == null || usuario.getMatricula().isBlank()) {
            throw new IllegalArgumentException("A matrícula é obrigatória para Clientes (Alunos).");
        }
        if (usuarioRepository.findByMatricula(usuario.getMatricula()).isPresent()) {
            throw new IllegalArgumentException("A matrícula " + usuario.getMatricula() + " já está em uso.");
        }
        usuario.setMatricula(usuario.getMatricula().trim());
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com e-mail: " + email));
    }

    @Transactional
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = buscarPorId(id);

        if (!usuarioExistente.getEmail().equals(usuarioAtualizado.getEmail())) {
            if (usuarioRepository.findByEmail(usuarioAtualizado.getEmail()).isPresent()) {
                throw new EmailDuplicadoException("O novo e-mail " + usuarioAtualizado.getEmail() + " já está em uso por outro usuário.");
            }
            usuarioExistente.setEmail(usuarioAtualizado.getEmail());
        }

        if (usuarioAtualizado.getNome() != null && !usuarioAtualizado.getNome().isBlank()) {
            usuarioExistente.setNome(usuarioAtualizado.getNome());
        }
        if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isBlank()) {
            usuarioExistente.setSenha(usuarioAtualizado.getSenha());
        }
        if (usuarioAtualizado.getTelefone() != null && !usuarioAtualizado.getTelefone().isBlank()) {
            usuarioExistente.setTelefone(usuarioAtualizado.getTelefone());
        }
        return usuarioRepository.save(usuarioExistente);
    }

    @Transactional
    public void desativarUsuario(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
    }
}
