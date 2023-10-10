package com.sliit.eticket.service.i;
import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.AuthRequestDto;
import com.sliit.eticket.dto.AuthResponseDto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/*
 *  Authentication Service APIs
 * */
public interface AuthService {
    @POST("Authentication/UserLogin")
    Call<AuthResponseDto> authenticateUser(@Body AuthRequestDto authRequest);

    @POST("Authentication/RegisterUser")
    Call<AuthResponseDto> register(@Body AppUserDto userDto);

}
