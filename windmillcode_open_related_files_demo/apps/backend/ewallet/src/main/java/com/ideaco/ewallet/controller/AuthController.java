package com.ideaco.ewallet.controller;

import com.ideaco.ewallet.dto.LoginDTO;
import com.ideaco.ewallet.dto.RegisterDTO;
import com.ideaco.ewallet.exception.LoginException;
import com.ideaco.ewallet.exception.RegisterException;
import com.ideaco.ewallet.response.LoginResponse;
import com.ideaco.ewallet.response.RegisterResponse;
import com.ideaco.ewallet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestParam("phone_number") String phoneNumber,
                                               @RequestParam("password") String password){
        LoginResponse loginResponse = new LoginResponse();
        try {
            LoginDTO loginDTO = authService.login(phoneNumber, password);

            loginResponse.setSuccess(true);
            loginResponse.setMessage("Login succeed");
            loginResponse.setErrorCode("");
            loginResponse.setData(loginDTO);
            return ResponseEntity.ok().body(loginResponse);
        } catch (LoginException e) {
            loginResponse.setSuccess(false);
            loginResponse.setMessage("Login failed");
            loginResponse.setErrorCode("001");
            return ResponseEntity.badRequest().body(loginResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestParam("user_name") String userName,
                                                     @RequestParam("user_phone") String userPhone,
                                                     @RequestParam("user_email") String userEmail,
                                                     @RequestParam("user_password") String userPassword,
                                                     @RequestParam("user_picture") MultipartFile userPicture){
        RegisterResponse registerResponse = new RegisterResponse();

        try {
            RegisterDTO registerDTO = authService.register(userName, userPhone, userEmail, userPassword, userPicture);
            registerResponse.setSuccess(true);
            registerResponse.setMessage("Register success");
            registerResponse.setErrorCode("");
            registerResponse.setData(registerDTO);

            return ResponseEntity.ok().body(registerResponse);
        }catch (RegisterException e){
            registerResponse.setSuccess(false);
            registerResponse.setMessage("Register failed");
            registerResponse.setErrorCode("400");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerResponse);
        }

    }
}
