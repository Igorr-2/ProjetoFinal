package com.Erp.demo.service;

import com.Erp.demo.exception.EstoqueInsuficienteException;
import com.Erp.demo.model.ItemPedido;
import com.Erp.demo.model.Pedido;
import com.Erp.demo.model.Produto;
import com.Erp.demo.model.StatusPedido;
import com.Erp.demo.repository.PedidoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional; 
import lombok.RequiredArgsConstructor; 
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
@RequiredArgsConstructor 
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoService produtoService;

    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado com ID: " + id));
    }
    
    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> buscarPorIdOptional(Long id) {
         return pedidoRepository.findById(id);
    }

    @Transactional
    public Pedido criarPedido(Pedido pedido) {
        BigDecimal valorTotal = BigDecimal.ZERO;
        
        pedido.setStatusPedido(StatusPedido.PENDENTE_PAGAMENTO);
        pedido.setCodigoRetirada(UUID.randomUUID().toString().substring(0, 6).toUpperCase());

        for (ItemPedido item : pedido.getItens()) {
            
            Produto produtoOriginal = produtoService.buscarPorId(item.getProduto().getIdProduto());

            produtoService.baixarEstoque(produtoOriginal.getIdProduto(), item.getQuantidade());

            BigDecimal precoUnitario = produtoOriginal.getPreco();
            item.setPrecoUnitario(precoUnitario);

            BigDecimal subtotal = precoUnitario.multiply(BigDecimal.valueOf(item.getQuantidade()));
            valorTotal = valorTotal.add(subtotal);

            item.setPedido(pedido);
        }

        pedido.setValorTotal(valorTotal);
        
        return pedidoRepository.save(pedido);
    }
    
    @Transactional
    public Pedido atualizarStatus(Long id, StatusPedido novoStatus) {
        Pedido pedido = buscarPorId(id);
        
        pedido.setStatusPedido(novoStatus);
        return pedidoRepository.save(pedido);
    }
}