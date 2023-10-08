//namespace E_TicketingBackend.DataAccessLayer
//{
//    public class TicketDAL
//    {
//    }
//}
using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    public class TicketDAL : ITicketDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        //private readonly IMongoCollection<TrainRequestDTO> _booksCollection;
        private readonly IMongoCollection<TicketRequestDTO> _ticketCollection;
        public TicketDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            //_booksCollection = MongoDataBase.GetCollection<TrainRequestDTO>(_configuration["BookStoreDatabase:TrainCollectionName"]);
            _ticketCollection = MongoDataBase.GetCollection<TicketRequestDTO>(_configuration["BookStoreDatabase:ticketCollaction"]);

        }


        public async Task<TicketResponseDTO> addReservation(TicketRequestDTO request)
        {
            TicketResponseDTO response = new TicketResponseDTO();

            try
            {
                //var res = await _ticketCollection.Find(x => x.TrainCode == request._id).ToListAsync();

                //if (res.Count == 0)
                //{
                _ticketCollection.InsertOneAsync(request);
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

        public async Task<TicketResponseDTO> getAllReservation()
        {
            TicketResponseDTO response = new TicketResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.ticketData = new List<TicketRequestDTO>();
                response.ticketData = await _ticketCollection.Find(x => true).ToListAsync();
                if (response.ticketData.Count == 0)
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

        public async Task<TicketResponseDTO> updateReservationById(TicketRequestDTO request)
        {

            TicketResponseDTO response = new TicketResponseDTO();

            try
            {
                var Result = await _ticketCollection.ReplaceOneAsync(x => x._id == request._id, request);

                var res1 = await _ticketCollection.Find(x => x._id == request._id).ToListAsync();

                response.ticketData = res1;
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

        public async Task<TicketResponseDTO> getReservationById(string _id)
        {
            TicketResponseDTO response = new TicketResponseDTO();

            try
            {
                response.ticketData = new List<TicketRequestDTO>();
                response.ticketData = await _ticketCollection.Find(x => x._id == _id).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.ticketData == null)
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
