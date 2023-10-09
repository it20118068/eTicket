using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


//Ticket Controller
namespace CrudOperations.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]

    public class UserController : ControllerBase
    {
        private readonly IUserDAL _userDAL;
        public UserController(IUserDAL userDAL)
        {
            _userDAL = userDAL;
        }

        //This method use to get user account by NIC 
        [HttpPost]
        public async Task<IActionResult> getAccountById([FromQuery] string nic)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _userDAL.getAccountById(nic);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to Delete a user account by NIC
        [HttpDelete]
        public async Task<IActionResult> deletAccountById([FromQuery] string nic)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _userDAL.deletAccountById(nic);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to Update user account by nic
        [HttpPost]
        public async Task<IActionResult> updateAccountById(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _userDAL.updateAccountById(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get all user accounts
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _userDAL.GetAllUsers();
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
