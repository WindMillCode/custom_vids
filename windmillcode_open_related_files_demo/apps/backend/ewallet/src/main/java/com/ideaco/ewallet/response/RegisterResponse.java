package com.ideaco.ewallet.response;

import com.ideaco.ewallet.dto.RegisterDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterResponse extends BaseResponse{
    private RegisterDTO data;
}
