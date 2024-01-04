package com.ideaco.ewallet.service;

import com.ideaco.ewallet.dto.LoginDTO;
import com.ideaco.ewallet.dto.RegisterDTO;
import com.ideaco.ewallet.exception.LoginException;
import com.ideaco.ewallet.exception.RegisterException;
import com.ideaco.ewallet.model.BalanceModel;
import com.ideaco.ewallet.model.UserModel;
import com.ideaco.ewallet.repository.BalanceRepository;
import com.ideaco.ewallet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private FileService fileService;

    public LoginDTO login(String userPhone, String password) throws LoginException {
        Optional<UserModel> userModelOptional = userRepository.findByUserPhone(userPhone);
        if(userModelOptional.isEmpty()){
            throw new LoginException("User not found");
        }

        UserModel userModel = userModelOptional.get();
        if(userModel.getUserPassword().equals(password)){
            int balance = 0;
            Optional<BalanceModel> balanceModelOptional = balanceRepository.findByUserId(userModel.getUserId());
            if(balanceModelOptional.isPresent()){
                balance = balanceModelOptional.get().getBalance();
            }

            return convertDTO(userModel, balance);
        }else {
            throw new LoginException("login failed");
        }
    }

    public RegisterDTO register(String userName, String userPhone, String userEmail,
                                String userPassword, MultipartFile userPicture) throws RegisterException {
        Optional<UserModel> userModelOptional = userRepository.findByUserPhone(userPhone);
        if(userModelOptional.isPresent()){
            throw new RegisterException("Phone already registered");
        }

        UserModel newUser = new UserModel();
        newUser.setUserName(userName);
        newUser.setUserPhone(userPhone);
        newUser.setUserEmail(userEmail);
        newUser.setUserPassword(userPassword);

        String picture = fileService.saveFile(userPicture);
        newUser.setUserPicture(picture);

        UserModel userModel = userRepository.save(newUser);

        BalanceModel balanceModel = new BalanceModel();
        balanceModel.setUserId(userModel.getUserId());
        balanceModel.setBalance(0);

        balanceRepository.save(balanceModel);

        return convertDTO(userModel);

    }

    private LoginDTO convertDTO(UserModel userModel, int balance){
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserId(userModel.getUserId());
        loginDTO.setUserName(userModel.getUserName());
        loginDTO.setUserPhone(userModel.getUserPhone());
        loginDTO.setUserEmail(userModel.getUserEmail());
        loginDTO.setUserPicture(userModel.getUserPicture());
        loginDTO.setBalance(balance);

        return loginDTO;
    }

    private RegisterDTO convertDTO(UserModel userModel){
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setUserId(userModel.getUserId());
        registerDTO.setUserName(userModel.getUserName());
        registerDTO.setUserPhone(userModel.getUserPhone());
        registerDTO.setUserEmail(userModel.getUserEmail());
        registerDTO.setUserPicture(userModel.getUserPicture());
        return registerDTO;
    }
}
