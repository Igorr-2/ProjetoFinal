package com.Erp.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item_pedido")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Long idItem;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false) 
    @NotNull(message = "O item deve pertencer a um pedido.")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    @NotNull(message = "O item deve especificar um produto.")
    private Produto produto;

    @NotNull(message = "A quantidade é obrigatória")
    @Positive(message = "A quantidade deve ser maior que zero.")
    private Integer quantidade;

    @NotNull(message = "O preço unitário é obrigatório.")
    @DecimalMin(value = "0.0", message = "O preço não pode ser negativo.")
    @Column(precision = 10, scale = 2, nullable = false) 
    private BigDecimal precoUnitario;
   }
