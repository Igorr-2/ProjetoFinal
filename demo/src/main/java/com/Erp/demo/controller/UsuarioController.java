package com.Erp.demo.controller;

import com.Erp.demo.model.Usuario;
import com.Erp.demo.service.UsuarioService;
import com.Erp.demo.exception.EmailDuplicadoException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Endpoint para cadastrar um novo usuário (Cliente/Aluno).
     * Nota: O Service define o Perfil como CLIENTE e valida a Matrícula.
     */
    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.criarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (EmailDuplicadoException e) {
            // 409 Conflict
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            // 400 Bad Request (Ex: Matrícula inválida ou duplicada)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Lista todos os usuários cadastrados.
     */
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Busca um usuário por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.buscarPorId(id);
            return ResponseEntity.ok(usuario);
        } catch (EntityNotFoundException e) {
            // 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    /**
     * Atualiza os dados de um usuário existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuarioAtualizado) {
        try {
            Usuario usuario = usuarioService.atualizarUsuario(id, usuarioAtualizado);
            return ResponseEntity.ok(usuario);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (EmailDuplicadoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    /**
     * Desativa logicamente um usuário (não deleta do banco).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> desativarUsuario(@PathVariable Long id) {
        try {
            usuarioService.desativarUsuario(id);
            // 204 No Content para indicar sucesso na operação de exclusão/desativação
            return ResponseEntity.noContent().build(); 
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}