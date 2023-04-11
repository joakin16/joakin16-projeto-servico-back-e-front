package com.servico.backservico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.servico.backservico.entity.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    @Query("SELECT s FROM Servico s WHERE (s.valorPago IS NULL OR s.valorPago = 0) and s.status != 'cancelado'")
    List<Servico> buscarServicosPagamentoPendente();

    @Query("SELECT s FROM Servico s WHERE s.status = 'cancelado'")
    List<Servico> buscarServicosPagamentoCancelados();
}
