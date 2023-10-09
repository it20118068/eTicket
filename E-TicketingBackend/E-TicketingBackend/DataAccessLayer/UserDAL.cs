using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    public class UserDAL : IUserDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<UserDTO> _booksCollection;
        public UserDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _booksCollection = MongoDataBase.GetCollection<UserDTO>(_configuration["BookStoreDatabase:BooksCollectionName"]);
        }

        public async Task<ResponseDTO> getAccountById(string nic)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.userDTOs = new List<UserDTO>();
                response.userDTOs = await _booksCollection.Find(x => x.NIC == nic).ToListAsync();

                response.IsSuccess = true;
                response.Message = "Successfull";


                if (response.userDTOs == null)
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

        public async Task<ResponseDTO> deletAccountById(string nic)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                //response.userDTOs = new List<UserDTO>();
                //response.userDTOs = await _booksCollection.Find(x => x.NIC == nic).ToListAsync();

                var result = await _booksCollection.DeleteOneAsync(x => x.NIC == nic);

                response.IsSuccess = true;
                response.Message = "Successfull deleted";


            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }

        public async Task<ResponseDTO> updateAccountById(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                var res = await _booksCollection.Find(x => x.NIC == request.userDto.NIC).ToListAsync();

                if (res.Count == 0)
                {
                    response.IsSuccess = true;
                    response.Message = "No user";
                }
                else
                {
                    //request.userDto._id = res[0]._id;

                    var Result = await _booksCollection.ReplaceOneAsync(x => x._id == res[0]._id, request.userDto);

                    var res1 = await _booksCollection.Find(x => x.NIC == request.userDto.NIC).ToListAsync();

                    //response.userDTOs = res1;
                    response.IsSuccess = true;
                    response.Message = "Successfull updated";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }

        public async Task<ResponseDTO> GetAllUsers()
        {
            ResponseDTO response = new ResponseDTO();

            try
            {
                response.userDTOs = new List<UserDTO>();
                response.userDTOs = await _booksCollection.Find(x => true).ToListAsync();
                response.IsSuccess = true;
                response.Message = "Data Fetch Successfully";

                if (response.userDTOs.Count == 0)
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


    }
}



