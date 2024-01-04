package com.ideaco.ewallet.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BaseResponse {
    private boolean success;
    private String message;
    private String errorCode;
}
