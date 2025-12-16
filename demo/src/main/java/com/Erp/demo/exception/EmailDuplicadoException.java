package com.Erp.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailDuplicadoException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EmailDuplicadoException(String mensagem) {
        super(mensagem);
    }
}