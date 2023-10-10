package com.sliit.eticket.dto;

import java.util.List;

/*
 *  This class is use to create response object
 * */
public class ResponseDto {
    private boolean isSuccess;
    private String Message;

    private List<ScheduleDto> scheduleDTOs;
    private List<TrainDto> trainDTOs;
    private List<TicketDto> ticketDTOs;

    private List<AppUserDto> userDTOs;

    public ResponseDto() {
    }

    public List<AppUserDto> getUserDTOs() {
        return userDTOs;
    }

    public void setUserDTOs(List<AppUserDto> userDTOs) {
        this.userDTOs = userDTOs;
    }

    public List<TicketDto> getTicketDTOs() {
        return ticketDTOs;
    }

    public void setTicketDTOs(List<TicketDto> ticketDTOs) {
        this.ticketDTOs = ticketDTOs;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public List<ScheduleDto> getScheduleDTOs() {
        return scheduleDTOs;
    }

    public void setScheduleDTOs(List<ScheduleDto> scheduleDTOs) {
        this.scheduleDTOs = scheduleDTOs;
    }

    public List<TrainDto> getTrainDTOs() {
        return trainDTOs;
    }

    public void setTrainDTOs(List<TrainDto> trainDTOs) {
        this.trainDTOs = trainDTOs;
    }
}
