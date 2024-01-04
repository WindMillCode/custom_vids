package com.ideaco.ewallet.repository;

import com.ideaco.ewallet.model.TransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<TransactionModel, Integer> {
}
