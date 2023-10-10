package com.sliit.eticket.dto;



import java.io.Serializable;

/*
 *  TrainDto class
 * */
public class TrainDto implements Serializable {
    private String _id;
    private String trainName;
    private String trainCode;
    private Integer status;

    public TrainDto() {

    }

    public TrainDto(String _id, String trainName, String trainCode, Integer status) {
        this._id = _id;
        this.trainName = trainName;
        this.trainCode = trainCode;
        this.status = status;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getTrainCode() {
        return trainCode;
    }

    public void setTrainCode(String trainCode) {
        this.trainCode = trainCode;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
