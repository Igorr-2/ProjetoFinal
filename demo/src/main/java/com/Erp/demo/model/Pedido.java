package com.Erp.demo.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @ManyToOne
    @JoinColumn(name = "fk_usuario_cliente", nullable = false)
    @NotNull(message = "O pedido deve estar associado a um cliente")
    private Usuario usuario; 

    @NotNull(message = "A data é obrigatória")
    @CreationTimestamp
    private LocalDateTime data;

    @NotNull(message = "A forma de pagamento é obrigatória")
    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;
    
    @NotNull(message = "O status inicial do pedido é obrigatório")
    @Enumerated(EnumType.STRING)
    private StatusPedido statusPedido;

    @NotNull(message = "O valor total do pedido é obrigatório")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal valorTotal;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itens;

    private String codigoRetirada;
}