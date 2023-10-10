package com.sliit.eticket.dto;


import java.io.Serializable;


/*
 *  TicketDto class
 * */
public class TicketDto implements Serializable {
    private String _id;
    private String nic;
    private String bookingDate;
    private String reservationDate;
    private int noOfReservations;
    private ScheduleDto schedule;
    private long totAmount;
    private int status;

    public TicketDto() {

    }



    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public int getNoOfReservations() {
        return noOfReservations;
    }

    public void setNoOfReservations(int noOfReservations) {
        this.noOfReservations = noOfReservations;
    }

    public ScheduleDto getSchedule() {
        return schedule;
    }

    public void setSchedule(ScheduleDto schedule) {
        this.schedule = schedule;
    }

    public long getTotAmount() {
        return totAmount;
    }

    public void setTotAmount(long totAmount) {
        this.totAmount = totAmount;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
