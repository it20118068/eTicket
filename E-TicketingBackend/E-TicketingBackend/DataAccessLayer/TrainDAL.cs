using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    public class TrainDAL : ITrainDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<TrainRequestDTO> _booksCollection;
        private readonly IMongoCollection<ScheduleRequestDTO> _trainCollection;
        public TrainDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _booksCollection = MongoDataBase.GetCollection<TrainRequestDTO>(_configuration["BookStoreDatabase:TrainCollectionName"]);
            _trainCollection = MongoDataBase.GetCollection<ScheduleRequestDTO>(_configuration["BookStoreDatabase:trainScheduleCollaction"]);

        }


        public async Task<TrainResponseDTO> addTrain(TrainRequestDTO request)
        {
            TrainResponseDTO response = new TrainResponseDTO();

            try
            {
                var res = await _booksCollection.Find(x => x.TrainCode == request.TrainCode).ToListAsync();

                if (res.Count == 0)
                {
                    _booksCollection.InsertOneAsync(request);
                    response.IsSuccess = true;
                    response.Message = "Successfull create train";
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "already created train";
                }    
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }
            return response;
        }

        public async Task<ScheduleResponseDTO> addSchedule(ScheduleRequestDTO request)
        {

            ScheduleResponseDTO response = new ScheduleResponseDTO();

            try
            {
                //var res = await _booksCollection.Find(x => x.id == request.).ToListAsync();

                    var res = _trainCollection.InsertOneAsync(request);
                    response.IsSuccess = true;
                    response.Message = "Successfull create schedule";

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;

        }

        public async Task<ScheduleResponseDTO> GetAllSchedule()
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.data = new List<ScheduleRequestDTO>();
                response.data = await _trainCollection.Find(x => true).ToListAsync();
                if (response.data.Count == 0)
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

        public async Task<ScheduleResponseDTO> updateScheduleById(ScheduleRequestDTO request)
        {

            ScheduleResponseDTO response = new ScheduleResponseDTO();

            try
            {
                var Result = await _trainCollection.ReplaceOneAsync(x => x._id == request._id, request);

                var res1 = await _trainCollection.Find(x => x._id == request._id).ToListAsync();

                response.data = res1;
                response.IsSuccess = true;
                response.Message = "Successfull update schedule";
                

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;

        }

        public async Task<ScheduleResponseDTO> getSheduleById(string _id)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();

            try
            {
                response.data = new List<ScheduleRequestDTO>();
                response.data = await _trainCollection.Find(x => x._id == _id).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.data == null)
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

        public async Task<ScheduleResponseDTO> cancelTrainReservation(ScheduleRequestDTO request)
        {

            ScheduleResponseDTO response = new ScheduleResponseDTO();

            try
            {
                var Result = await _trainCollection.ReplaceOneAsync(x => x._id == request._id, request);

                var res1 = await _trainCollection.Find(x => x._id == request._id).ToListAsync();

                response.data = res1;
                response.IsSuccess = true;
                response.Message = "Successfull update schedule";


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
