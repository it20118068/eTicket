using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    public class TrainDAL : ITrainDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<TrainDTO> _booksCollection;
        private readonly IMongoCollection<ScheduleDTO> _trainCollection;
        public TrainDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _booksCollection = MongoDataBase.GetCollection<TrainDTO>(_configuration["BookStoreDatabase:TrainCollectionName"]);
            _trainCollection = MongoDataBase.GetCollection<ScheduleDTO>(_configuration["BookStoreDatabase:trainScheduleCollaction"]);

        }


        public async Task<ResponseDTO> addTrain(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                var res = await _booksCollection.Find(x => x.TrainCode == request.trainDTO.TrainCode).ToListAsync();

                if (res.Count == 0)
                {
                    await _booksCollection.InsertOneAsync(request.trainDTO);
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

        public async Task<ResponseDTO> addSchedule(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                //var res = await _booksCollection.Find(x => x.id == request.).ToListAsync();

                    var res = _trainCollection.InsertOneAsync(request.scheduleDTO);
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

        public async Task<ResponseDTO> GetAllSchedule()
        {
            ResponseDTO response = new ResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.scheduleDTOs = new List<ScheduleDTO>();
                response.scheduleDTOs = await _trainCollection.Find(x => true).ToListAsync();
                if (response.scheduleDTOs.Count == 0)
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

        public async Task<ResponseDTO> updateScheduleById(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                var Result = await _trainCollection.ReplaceOneAsync(x => x._id == request.scheduleDTO._id, request.scheduleDTO);

                var res1 = await _trainCollection.Find(x => x._id == request.scheduleDTO._id).ToListAsync();

                response.scheduleDTOs = res1;
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

        public async Task<ResponseDTO> getSheduleById(string _id)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.scheduleDTOs = new List<ScheduleDTO>();
                response.scheduleDTOs = await _trainCollection.Find(x => x._id == _id).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.scheduleDTOs == null)
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

        public async Task<ResponseDTO> cancelTrainReservation(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                var Result = await _trainCollection.ReplaceOneAsync(x => x._id == request.scheduleDTO._id, request.scheduleDTO);

                var res1 = await _trainCollection.Find(x => x._id == request.scheduleDTO._id).ToListAsync();

                response.scheduleDTOs = res1;
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
