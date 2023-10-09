﻿using E_TicketingBackend.enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace E_TicketingBackend.Model
{
    //Ticket DTO class
    public class TicketDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string nic { get; set; }
        public string bookingDate { get; set; }
        public string reservationDate { get; set; }
        public int noOfReservations { get; set; }
        public ScheduleDTO schedule { get; set; }
        public long totAmount { get; set; }
        public int status { get; set; }
    }
}
