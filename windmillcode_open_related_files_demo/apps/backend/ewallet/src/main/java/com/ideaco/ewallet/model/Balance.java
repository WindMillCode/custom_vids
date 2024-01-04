package com.ideaco.ewallet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tab_balance")
public class BalanceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "balance_id")
    private int balanceId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "balance")
    private int balance;
}
