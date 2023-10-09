﻿using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

//This is a Ticket Data Access Layer
namespace E_TicketingBackend.DataAccessLayer
{
    public class TicketDAL : ITicketDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<TicketDTO> _ticketCollection;

        //This method use to create a DB Connection
        public TicketDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _ticketCollection = MongoDataBase.GetCollection<TicketDTO>(_configuration["BookStoreDatabase:ticketCollaction"]);
        }

        //This method use to add new reservation for train
        public async Task<ResponseDTO> addReservation(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                //var res = await _ticketCollection.Find(x => x.TrainCode == request._id).ToListAsync();

                //if (res.Count == 0)
                //{
                await _ticketCollection.InsertOneAsync(request.ticketDto);
                response.IsSuccess = true;
                response.Message = "Successfull create reservation";
                //}
                //else
                //{
                //    response.IsSuccess = true;
                //    response.Message = "already created train";
                //}
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }
            return response;
        }

        //This method use to get all reservations 
        public async Task<ResponseDTO> getAllReservation()
        {
            ResponseDTO response = new ResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.ticketDTOs = new List<TicketDTO>();
                response.ticketDTOs = await _ticketCollection.Find(x => true).ToListAsync();
                if (response.ticketDTOs.Count == 0)
                {
                    response.Message = "No Record Found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }

        //This method use to update reservation by id 
        public async Task<ResponseDTO> updateReservationById(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                var Result = await _ticketCollection.ReplaceOneAsync(x => x._id == request.ticketDto._id, request.ticketDto);

                //var res1 = await _ticketCollection.Find(x => x._id == request.ticketDto._id).ToListAsync();

               // response.ticketDTOs = res1;
                response.IsSuccess = true;
                response.Message = "Successfull update Ticket";


            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;

        }

        //This method use to get reservation by id 
        public async Task<ResponseDTO> getReservationById(string _id)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.ticketDTOs = new List<TicketDTO>();
                response.ticketDTOs = await _ticketCollection.Find(x => x._id == _id).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.ticketDTOs == null)
                {
                    response.IsSuccess = true;
                    response.Message = "No Record found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }

        //This method use to get get reservation by NIC 
        public async Task<ResponseDTO> getReservationByNic(string nic)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.ticketDTOs = new List<TicketDTO>();
                response.ticketDTOs = await _ticketCollection.Find(x => x.nic == nic).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.ticketDTOs == null)
                {
                    response.IsSuccess = true;
                    response.Message = "No Record found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }
    }
}
