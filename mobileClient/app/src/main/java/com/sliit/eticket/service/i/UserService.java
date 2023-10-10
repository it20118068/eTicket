package com.sliit.eticket.service.i;

import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

/*
 *  User Service APIs
 * */
public interface UserService {
    @Headers("Content-Type: application/json")
    @POST("User/getAccountById")
    Call<ResponseDto> getAccountById(@Header("Authorization") String bearerToken, @Body RequestDto requestDto);

    @Headers("Content-Type: application/json")
    @POST("User/updateAccountById")
    Call<ResponseDto> updateUserProfileById(@Header("Authorization") String bearerToken, @Body RequestDto requestDto);
}
