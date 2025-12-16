package com.Erp.demo.controller;

import com.Erp.demo.model.Produto;
import com.Erp.demo.service.ProdutoService;
import com.Erp.demo.exception.EstoqueInsuficienteException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    private final ProdutoService produtoService;

    // --- Operações CRUD Básicas ---

    /**
     * Cadastra um novo produto no catálogo (Acesso da administração/funcionário).
     */
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@Valid @RequestBody Produto produto) {
        Produto novoProduto = produtoService.criarProduto(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    /**
     * Lista todos os produtos (incluindo inativos e sem estoque) para gestão interna.
     */
    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        List<Produto> produtos = produtoService.listarProdutos();
        return ResponseEntity.ok(produtos);
    }

    /**
     * Busca um produto específico por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Produto produto = produtoService.buscarPorId(id);
            return ResponseEntity.ok(produto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Atualiza os dados de um produto existente (nome, preço, descrição, etc.).
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarProduto(@PathVariable Long id, @Valid @RequestBody Produto novoProduto) {
        try {
            Produto produto = produtoService.atualizarProduto(id, novoProduto);
            return ResponseEntity.ok(produto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // --- Operações de Status e Estoque ---

    /**
     * Endpoint para listar apenas produtos ativos e com quantidade > 0 (Catálogo do Cliente).
     */
    @GetMapping("/disponiveis")
    public ResponseEntity<List<Produto>> listarProdutosDisponiveis() {
        List<Produto> produtos = produtoService.listarProdutosDisponiveis();
        return ResponseEntity.ok(produtos);
    }

    /**
     * Desativa logicamente um produto (sai do catálogo de vendas, mas mantém o registro).
     */
    @PatchMapping("/{id}/desativar")
    public ResponseEntity<?> desativarProduto(@PathVariable Long id) {
        try {
            produtoService.desativarProduto(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Adiciona itens ao estoque (Entrada de estoque).
     */
    @PatchMapping("/{id}/estoque/entrada")
    public ResponseEntity<?> reporEstoque(@PathVariable Long id, @RequestParam @NotNull Integer quantidade) {
        try {
            Produto produtoAtualizado = produtoService.reporEstoque(id, quantidade);
            return ResponseEntity.ok(produtoAtualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    /**
     * Remove itens do estoque (Saída manual, fora do fluxo de pedidos).
     */
    @PatchMapping("/{id}/estoque/saida")
    public ResponseEntity<?> baixarEstoque(@PathVariable Long id, @RequestParam @NotNull Integer quantidade) {
        try {
            Produto produtoAtualizado = produtoService.baixarEstoque(id, quantidade);
            return ResponseEntity.ok(produtoAtualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (EstoqueInsuficienteException e) {
            // 400 Bad Request ou 409 Conflict
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}