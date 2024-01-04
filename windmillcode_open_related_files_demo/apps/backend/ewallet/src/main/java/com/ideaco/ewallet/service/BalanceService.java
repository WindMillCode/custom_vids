package com.ideaco.ewallet.service;

import com.ideaco.ewallet.dto.BalanceDTO;
import com.ideaco.ewallet.exception.UserNotFoundException;
import com.ideaco.ewallet.model.BalanceModel;
import com.ideaco.ewallet.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceService {
    @Autowired
    private BalanceRepository balanceRepository;

    public BalanceDTO showBalance(int userId) throws UserNotFoundException {
        Optional<BalanceModel> balanceModelOptional = balanceRepository.findById(userId);

        if(balanceModelOptional.isEmpty()){
            throw new UserNotFoundException("User not found");
        }

        BalanceModel balanceModel = balanceModelOptional.get();

        return convertDTO(balanceModel);
    }

    public BalanceDTO topupBalance(int userId, int amount) throws UserNotFoundException {
        Optional<BalanceModel> balanceModelOptional = balanceRepository.findById(userId);

        if(balanceModelOptional.isEmpty()){
            throw new UserNotFoundException("User not found");
        }

        BalanceModel balanceModel = balanceModelOptional.get();

        int currentBalance = balanceModel.getBalance();
        int newBalance = currentBalance + amount;
        balanceModel.setBalance(newBalance);

        balanceRepository.save(balanceModel);

        return convertDTO(balanceModel);
    }

    private BalanceDTO convertDTO(BalanceModel item) {
        BalanceDTO balanceDTO = new BalanceDTO();
        balanceDTO.setUserId(item.getUserId());
        balanceDTO.setBalance(item.getBalance());

        return balanceDTO;
    }
}
