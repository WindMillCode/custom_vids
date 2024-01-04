package com.ideaco.ewallet.controller;

import com.ideaco.ewallet.dto.BalanceDTO;
import com.ideaco.ewallet.dto.EditEmailDTO;
import com.ideaco.ewallet.exception.UserNotFoundException;
import com.ideaco.ewallet.response.BalanceResponse;
import com.ideaco.ewallet.response.EditEmailResponse;
import com.ideaco.ewallet.service.BalanceService;
import com.ideaco.ewallet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BalanceService balanceService;

    @PatchMapping("/{user_id}/email")
    public ResponseEntity<EditEmailResponse> editEmail(@PathVariable("user_id") int userId,
                                                       @RequestParam("user_email") String userEmail) {
        EditEmailResponse editEmailResponse = new EditEmailResponse();
        try {
            EditEmailDTO editEmailDTO = userService.editUserEmail(userId, userEmail);

            editEmailResponse.setSuccess(true);
            editEmailResponse.setMessage("Successfully changed user email");
            editEmailResponse.setErrorCode("");
            editEmailResponse.setData(editEmailDTO);

            return ResponseEntity.ok().body(editEmailResponse);
        } catch (UserNotFoundException e) {
            editEmailResponse.setSuccess(false);
            editEmailResponse.setMessage("Failed to changed user email");
            editEmailResponse.setErrorCode("400");

            return ResponseEntity.badRequest().body(editEmailResponse);
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<BalanceResponse> showBalance(@RequestParam("user_id") int userId) {
        BalanceResponse balanceResponse = new BalanceResponse();
        try {
            BalanceDTO balanceDTO = balanceService.showBalance(userId);

            balanceResponse.setSuccess(true);
            balanceResponse.setMessage("Successfully show balance");
            balanceResponse.setErrorCode("");
            balanceResponse.setData(balanceDTO);

            return ResponseEntity.ok().body(balanceResponse);
        } catch (UserNotFoundException e) {
            balanceResponse.setSuccess(false);
            balanceResponse.setMessage("Failed to show balance");
            balanceResponse.setErrorCode("110");

            return ResponseEntity.badRequest().body(balanceResponse);
        }
    }
}
