package com.ideaco.ewallet.service;

import com.ideaco.ewallet.dto.TransferDTO;
import com.ideaco.ewallet.exception.BalanceNotAvailableException;
import com.ideaco.ewallet.exception.UserNotFoundException;
import com.ideaco.ewallet.model.BalanceModel;
import com.ideaco.ewallet.model.TransactionModel;
import com.ideaco.ewallet.model.UserModel;
import com.ideaco.ewallet.repository.BalanceRepository;
import com.ideaco.ewallet.repository.TransactionRepository;
import com.ideaco.ewallet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BalanceRepository balanceRepository;

    @Transactional
    public TransferDTO transfer(int userId, int transactionAmount, int transactionReceiver, String transactionType)
            throws UserNotFoundException, BalanceNotAvailableException {

        Optional<UserModel> userModelOptional = userRepository.findById(transactionReceiver);
        if(userModelOptional.isEmpty()){
            throw new UserNotFoundException("Receiver not exist");
        }

        Optional<BalanceModel> optionalBalanceModel = balanceRepository.findByUserId(userId);
        if(optionalBalanceModel.isEmpty() || optionalBalanceModel.get().getBalance() < transactionAmount){
            throw new BalanceNotAvailableException("Balance not available");
        }

        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setTransactionAmount(transactionAmount);
        transactionModel.setTransactionSender(userId);
        transactionModel.setTransactionReceiver(transactionReceiver);
        transactionModel.setTransactionType(transactionType);
        transactionModel.setTransactionTime(LocalDateTime.now());
        transactionModel.setTransactionStatus("PENDING");

        transactionRepository.save(transactionModel);

        Optional<BalanceModel> optBalanceReceiver = balanceRepository.findByUserId(transactionReceiver);
        int receiverInitialBalance = optBalanceReceiver.get().getBalance();
        optBalanceReceiver.get().setBalance(receiverInitialBalance + transactionAmount);
        balanceRepository.save(optBalanceReceiver.get());

        int senderInitialBalance = optionalBalanceModel.get().getBalance();
        optionalBalanceModel.get().setBalance(senderInitialBalance - transactionAmount);
        balanceRepository.save(optionalBalanceModel.get());

        transactionModel.setTransactionStatus("SUCCESS");
        TransactionModel transferModel = transactionRepository.save(transactionModel);

        return convertDTO(transferModel);

    }

    private TransferDTO convertDTO(TransactionModel transactionModel){
        TransferDTO transferDTO = new TransferDTO();
        transferDTO.setTransactionId(transactionModel.getTransactionId());
        transferDTO.setTransactionSender(transactionModel.getTransactionSender());
        transferDTO.setTransactionReceiver(transactionModel.getTransactionReceiver());
        transferDTO.setTransactionAmount(transactionModel.getTransactionAmount());
        transferDTO.setTransactionTime(transactionModel.getTransactionTime());
        transferDTO.setTransactionType(transactionModel.getTransactionType());
        transferDTO.setTransactionStatus(transactionModel.getTransactionStatus());

        Optional<UserModel> senderModelOptional = userRepository.findById(transactionModel.getTransactionSender());
        transferDTO.setSenderName(senderModelOptional.get().getUserName());
        Optional<UserModel> receiverModelOptional = userRepository.findById(transactionModel.getTransactionReceiver());
        transferDTO.setReceiverName(receiverModelOptional.get().getUserName());
        return transferDTO;
    }
}
