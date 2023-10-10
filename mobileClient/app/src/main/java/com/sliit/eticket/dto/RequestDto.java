package com.sliit.eticket.dto;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/*
 *  This class is use to create request object
 * */
public class RequestDto implements Serializable {

    private  String nic;
    @SerializedName("ticketDto")
    private TicketDto ticketDto;
    @SerializedName("userDTO")
    private AppUserDto userDTO;
    @SerializedName("scheduleDTO")
    private ScheduleDto scheduleDTO;
    @SerializedName("trainDTO")
    private TrainDto trainDTO;

    public RequestDto() {

    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public TicketDto getTicketDto() {
        return ticketDto;
    }

    public void setTicketDto(TicketDto ticketDto) {
        this.ticketDto = ticketDto;
    }

    public AppUserDto getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(AppUserDto userDTO) {
        this.userDTO = userDTO;
    }

    public ScheduleDto getScheduleDTO() {
        return scheduleDTO;
    }

    public void setScheduleDTO(ScheduleDto scheduleDTO) {
        this.scheduleDTO = scheduleDTO;
    }

    public TrainDto getTrainDTO() {
        return trainDTO;
    }

    public void setTrainDTO(TrainDto trainDTO) {
        this.trainDTO = trainDTO;
    }
}
