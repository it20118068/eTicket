using Authentication_System.DataAccessLayer;
using Authentication_System.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentication_System.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]

    public class AuthenticationController : ControllerBase
    {

        public readonly IAuthenticationDataAccess _authenticationDataAccess;

        public AuthenticationController(IAuthenticationDataAccess authenticationDataAccess)
        {
            _authenticationDataAccess = authenticationDataAccess;
        }

        //This method use to user registration
        [HttpPost]
        public async Task<IActionResult> RegisterUser(RegisterUserRequest request)
        {
            RegisterUserResponse response = new RegisterUserResponse();
            try
            {
                response = await _authenticationDataAccess.RegisterUser(request);

            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to user Login
        [HttpPost]
        public async Task<IActionResult> UserLogin(UserLoginRequest request)
        {
            UserLoginResponse response = new UserLoginResponse();
            try
            {
                response = await _authenticationDataAccess.UserLogin(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

    }
}
