package com.sliit.eticket.dto;

/*
 *  This class is use to send authentication requests
 * */
public class AuthRequestDto {
    private String username;
    private String password;

    public AuthRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
