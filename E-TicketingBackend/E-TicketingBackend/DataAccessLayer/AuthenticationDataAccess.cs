using Authentication_System.Model;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication_System.DataAccessLayer
{
    public class AuthenticationDataAccess : IAuthenticationDataAccess
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<RegisterUserRequest> _booksCollection;
        public AuthenticationDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _mongoConnection = new MongoClient(_configuration["BookStoreDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["BookStoreDatabase:DatabaseName"]);
            _booksCollection = MongoDataBase.GetCollection<RegisterUserRequest>(_configuration["BookStoreDatabase:BooksCollectionName"]);
        }

        public async Task<RegisterUserResponse> RegisterUser(RegisterUserRequest request)
        {

            RegisterUserResponse response = new RegisterUserResponse();

            try
            { 
                var res = await _booksCollection.Find(x => x.UserName == request.UserName).ToListAsync();

                if (res.Count == 0)
                {
                    _booksCollection.InsertOneAsync(request);
                    response.IsSuccess = true;
                    response.Message = "Successfull Registration";
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "User Already Registrated";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;

        }

        public async Task<UserLoginResponse> UserLogin(string Username,string Password)
        {
            UserLoginResponse response = new UserLoginResponse();
            

            try
            {
                response.data = new List<RegisterUserRequest>();
                response.data =  await _booksCollection.Find(x => x.UserName == Username && x.Password == Password).ToListAsync();

                if (response.data == null || response.data.Count == 0)
                {
                    response.IsSuccess = true;
                    response.Message = "Username or password Incorrect";

                }
                else 
                {
                    response.IsSuccess = true;
                    response.Message = "SuccessFull";

                    response.Token = GenerateJWT(Username);
                }
                


            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;

        }

        public string GenerateJWT(string Username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //claim is used to add identity to JWT token
            var claims = new[] {
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
             new Claim(JwtRegisteredClaimNames.Sid, Username),
             //new Claim(JwtRegisteredClaimNames.Email, Password),
             new Claim("Date", DateTime.Now.ToString()),
             };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audiance"],
              claims,    //null original value
              expires: DateTime.Now.AddMinutes(120),

              //notBefore:
              signingCredentials: credentials);

            string Data = new JwtSecurityTokenHandler().WriteToken(token); //return access token 
            return Data;
        }
    }
}
