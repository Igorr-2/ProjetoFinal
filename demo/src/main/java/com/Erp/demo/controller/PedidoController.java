package com.Erp.demo.controller;

import com.Erp.demo.model.Pedido;
import com.Erp.demo.model.StatusPedido;
import com.Erp.demo.service.PedidoService;
import com.Erp.demo.exception.EstoqueInsuficienteException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {

    private final PedidoService pedidoService;

    // --- Operações de Cliente (Criação e Consulta) ---

    /**
     * Cria um novo pedido. Este endpoint processa o estoque e calcula o valor total.
     */
    @PostMapping
    public ResponseEntity<?> criarPedido(@Valid @RequestBody Pedido pedido) {
        try {
            Pedido novoPedido = pedidoService.criarPedido(pedido);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoPedido);
        } catch (EstoqueInsuficienteException e) {
            // 400 Bad Request: O pedido não pode ser concluído devido à falta de estoque.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            // 404 Not Found: Algum Produto ou Usuário no pedido não existe.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // 500 Internal Server Error para erros não esperados
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno ao criar pedido: " + e.getMessage());
        }
    }

    /**
     * Consulta um pedido específico por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Pedido pedido = pedidoService.buscarPorId(id);
            return ResponseEntity.ok(pedido);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // --- Operações de Funcionário (Gestão e Listagem) ---

    /**
     * Lista todos os pedidos (acesso de Funcionário).
     */
    @GetMapping
    public ResponseEntity<List<Pedido>> listarTodos() {
        List<Pedido> pedidos = pedidoService.listarTodos();
        return ResponseEntity.ok(pedidos);
    }

    /**
     * Atualiza o status do pedido (Ex: PENDENTE_PAGAMENTO -> EM_PREPARACAO).
     * Requer o novo status no corpo da requisição.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestParam StatusPedido novoStatus) {
        try {
            Pedido pedidoAtualizado = pedidoService.atualizarStatus(id, novoStatus);
            return ResponseEntity.ok(pedidoAtualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            // Pode ser usado se o status enviado for inválido.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}