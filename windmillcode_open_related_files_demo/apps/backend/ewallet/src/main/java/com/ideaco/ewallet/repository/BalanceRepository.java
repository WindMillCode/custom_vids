package com.ideaco.ewallet.repository;

import com.ideaco.ewallet.model.BalanceModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceRepository extends JpaRepository<BalanceModel, Integer> {
    Optional<BalanceModel> findByUserId(int userId);
}
