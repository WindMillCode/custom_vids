package com.ideaco.ewallet.repository;

import com.ideaco.ewallet.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByUserPhone(String userPhone);
}
