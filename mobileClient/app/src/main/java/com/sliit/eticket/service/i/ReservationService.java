package com.sliit.eticket.service.i;

import com.sliit.eticket.dto.AuthRequestDto;
import com.sliit.eticket.dto.AuthResponseDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

/*
 *  Reservation Service APIs
 * */
public interface ReservationService {
    @GET("Train/GetAllSchedule")
    Call<ResponseDto> getAllSchedules(@Header("Authorization") String bearerToken);

    @Headers("Content-Type: application/json")
    @POST("Ticket/addReservation")
    Call<ResponseDto> addReservation(@Header("Authorization") String bearerToken,@Body RequestDto requestDto);

    @Headers("Content-Type: application/json")
    @POST("Ticket/getReservationByNic")
    Call<ResponseDto> getTicketsByNIC(@Header("Authorization") String bearerToken,@Body RequestDto requestDto);

    @Headers("Content-Type: application/json")
    @POST("Ticket/updateReservationById")
    Call<ResponseDto> updateReservationById(@Header("Authorization") String bearerToken,@Body RequestDto requestDto);
}
