using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using MongoDB.Driver;

namespace E_TicketingBackend.DataAccessLayer
{
    public class UserDAL : IUserDAL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<UserRequestDTO> _booksCollection;
        public UserDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _booksCollection = MongoDataBase.GetCollection<UserRequestDTO>(_configuration["BookStoreDatabase:BooksCollectionName"]);
        }

        public async Task<UserResponseDTO> getAccountById(string Username)
        {
            UserResponseDTO response = new UserResponseDTO();

            try
            {
                response.data = new List<UserRequestDTO>();
                response.data = await _booksCollection.Find(x => x.UserName == Username).ToListAsync();

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

        public async Task<UserResponseDTO> deletAccountById(string Username)
        {
            UserResponseDTO response = new UserResponseDTO();

            try
            {
                response.data = new List<UserRequestDTO>();
                response.data = await _booksCollection.Find(x => x.UserName == Username).ToListAsync();

                var result = await _booksCollection.DeleteOneAsync(x => x.UserName == Username);

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

        public async Task<UserResponseDTO> updateAccountById(UserRequestDTO request)
        {
            UserResponseDTO response = new UserResponseDTO();

            try
            {
               
                var res = await _booksCollection.Find(x => x.UserName == request.UserName).ToListAsync();
                request._id = res[0]._id;

                var Result = await _booksCollection.ReplaceOneAsync(x => x._id == res[0]._id, request);

                response.IsSuccess = true;
                response.Message = "Successfull updated";


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



