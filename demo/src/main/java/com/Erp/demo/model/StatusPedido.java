package com.Erp.demo.model;
public enum StatusPedido {
    PENDENTE_PAGAMENTO,     // Pedido criado, aguardando a confirmação do pagamento
    PAGO_CONFIRMADO,        // Pagamento recebido e confirmado
    EM_PREPARACAO,          // O pedido está sendo montado pela cantina
    PRONTO_PARA_RETIRADA,   // O pedido está pronto e aguardando o cliente
    FINALIZADO,             // O cliente retirou o pedido
    CANCELADO               // O pedido foi cancelado
}