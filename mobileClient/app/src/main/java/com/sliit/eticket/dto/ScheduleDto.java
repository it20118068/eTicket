package com.sliit.eticket.dto;

import com.sliit.eticket.enums.CommonStatus;

import java.io.Serializable;

/*
 *  ScheduleDto class
 * */
public class ScheduleDto implements Serializable {
    private String _id;
    private String startingTime;
    private String arrivalTime;
    private  TrainDto train;
    private String startPoint;
    private String endPoint;
    private long ticketPrice;
    private int status;

    public ScheduleDto() {

    }


    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getStartingTime() {
        return startingTime;
    }

    public void setStartingTime(String startingTime) {
        this.startingTime = startingTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public TrainDto getTrain() {
        return train;
    }

    public void setTrain(TrainDto train) {
        this.train = train;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public long getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(long ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
