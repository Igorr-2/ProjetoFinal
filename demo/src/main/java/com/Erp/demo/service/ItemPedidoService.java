package com.Erp.demo.service;
import com.Erp.demo.model.ItemPedido;
import com.Erp.demo.repository.ItemPedidoRepository;
import jakarta.transaction.Transactional; // Adicionar @Transactional, se necessário
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemPedidoService {

    private final ItemPedidoRepository itemPedidoRepository;
   
    public ItemPedidoService(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
    }
    
    @Transactional
    public ItemPedido salvar(ItemPedido itemPedido) {
        return itemPedidoRepository.save(itemPedido);
    }

    public List<ItemPedido> listarTodos() {
        return itemPedidoRepository.findAll();
    }

    public Optional<ItemPedido> buscarPorId(Long id) {
        return itemPedidoRepository.findById(id);
    }

    @Transactional
    public void deletar(Long id) {
        itemPedidoRepository.deleteById(id);
    }
}