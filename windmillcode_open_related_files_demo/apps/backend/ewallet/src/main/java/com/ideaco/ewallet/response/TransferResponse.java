package com.ideaco.ewallet.response;

import com.ideaco.ewallet.dto.TransferDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TransferResponse extends BaseResponse {
    private TransferDTO data;
}
