package com.Erp.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduto;

    @NotBlank(message = "Nome do produto é obrigatório")
    @Column(length = 100, nullable = false)
    private String nome;
    @NotBlank(message = "A descrição do produto é obrigatória")
    @Column(nullable = false)
    private String descricao;

    @NotNull
    @Positive(message = "O preço deve ser maior que zero")
    @Column(precision = 10, scale = 2)
    private BigDecimal preco;

    @NotNull
    @Min(value = 0, message = "O estoque não pode ser negativo")
    private Integer quantidade;
    @NotBlank(message = "A URL da imagem é obrigatória")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String imagemUrl;
    private boolean ativo = true;
    @CreationTimestamp
    private LocalDateTime dataCadastro;
}