package com.sliit.eticket.dto;

import java.io.Serializable;
import java.util.List;

/*
 *  This class is use to create response object of authentication request
 * */
public class AuthResponseDto {
    private String token;
    private boolean success;
    private String message;
    private List<AppUserDto> data;

    public AuthResponseDto() {

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<AppUserDto> getData() {
        return data;
    }

    public void setData(List<AppUserDto> data) {
        this.data = data;
    }
}
