package com.ideaco.ewallet.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class RegisterDTO {
    private int userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userPicture;
}
