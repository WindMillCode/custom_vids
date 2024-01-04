package com.ideaco.ewallet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {
    private int userId;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String userPicture;
    private int balance;
}
