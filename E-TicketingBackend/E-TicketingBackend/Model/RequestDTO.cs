﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_TicketingBackend.Model
{
    public class RequestDTO
    {

        public string? trainCode { get; set; }
        public string? nic { get; set; }
        public UserDTO? userDto { get; set; }
        public TicketDTO? ticketDto { get; set; }
        public ScheduleDTO? scheduleDTO { get; set; }
        public TrainDTO? trainDTO { get; set; }
    }
}
