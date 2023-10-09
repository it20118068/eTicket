using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    //Train Data Access Layer 
    public class TrainDAL : ITrainDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<TrainDTO> _trainCollection;
        private readonly IMongoCollection<ScheduleDTO> _trainScheduleCollection;
        
        //This method use to create a DB Connection
        public TrainDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _trainCollection = MongoDataBase.GetCollection<TrainDTO>(_configuration["BookStoreDatabase:TrainCollectionName"]);
            _trainScheduleCollection = MongoDataBase.GetCollection<ScheduleDTO>(_configuration["BookStoreDatabase:trainScheduleCollaction"]);

        }

        //This method use to add a new Train 
        public async Task<ResponseDTO> addTrain(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                var res = await _trainCollection.Find(x => x.TrainCode == request.trainDTO.TrainCode).ToListAsync();

                if (res.Count == 0)
                {
                    await _trainCollection.InsertOneAsync(request.trainDTO);
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

        //This method use to Get all Trains
        public async Task<ResponseDTO> GetAllTrain()
        {
            ResponseDTO response = new ResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.trainDTOs = new List<TrainDTO>();
                response.trainDTOs = await _trainCollection.Find(x => true).ToListAsync();
                if (response.trainDTOs.Count == 0)
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

        //This method use to Add new train schedule
        public async Task<ResponseDTO> addSchedule(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                    var res = _trainScheduleCollection.InsertOneAsync(request.scheduleDTO);
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

        //This method use to get all train schedule
        public async Task<ResponseDTO> GetAllSchedule()
        {
            ResponseDTO response = new ResponseDTO();
            response.IsSuccess = true;
            response.Message = "Data Fetch Successfully";

            try
            {
                response.scheduleDTOs = new List<ScheduleDTO>();
                response.scheduleDTOs = await _trainScheduleCollection.Find(x => true).ToListAsync();
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

        //This method use to update train schedule by ID 
        public async Task<ResponseDTO> updateScheduleById(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                var Result = await _trainScheduleCollection.ReplaceOneAsync(x => x._id == request.scheduleDTO._id, request.scheduleDTO);

                var res1 = await _trainScheduleCollection.Find(x => x._id == request.scheduleDTO._id).ToListAsync();

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

        //This method use to get train schedule by ID
        public async Task<ResponseDTO> getSheduleById(string _id)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.scheduleDTOs = new List<ScheduleDTO>();
                response.scheduleDTOs = await _trainScheduleCollection.Find(x => x._id == _id).ToListAsync();

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

        //This method use to cancel Train reservation schedule
        public async Task<ResponseDTO> cancelTrainReservation(RequestDTO request)
        {

            ResponseDTO response = new ResponseDTO();

            try
            {
                var Result = await _trainScheduleCollection.ReplaceOneAsync(x => x._id == request.scheduleDTO._id, request.scheduleDTO);

                var res1 = await _trainScheduleCollection.Find(x => x._id == request.scheduleDTO._id).ToListAsync();

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

        //This method use to get a schedule by train code
        public async Task<ResponseDTO> getSheduleByTrainId(string TrainCode)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.scheduleDTOs = new List<ScheduleDTO>();
                response.scheduleDTOs = await _trainScheduleCollection.Find(x => x.train.TrainCode == TrainCode).ToListAsync();

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

    }
}
