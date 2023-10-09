using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//Ticket Controller
namespace E_TicketingBackend.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]

    public class TicketController : ControllerBase
    {
        private readonly ITicketDAL _ticketDAL;
        public TicketController(ITicketDAL ticketDAL)
        {
            _ticketDAL = ticketDAL;
        }

        //This method use to add new reservation for train
        [HttpPost]
        public async Task<IActionResult> addReservation(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _ticketDAL.addReservation(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get all reservations 
        [HttpGet]
        public async Task<IActionResult> getAllReservation()
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _ticketDAL.getAllReservation();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);

        }

        //This method use to update reservation by id 
        [HttpPost]
        public async Task<IActionResult> updateReservationById(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _ticketDAL.updateReservationById(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get reservation by id 
        [HttpPost]
        public async Task<IActionResult> getReservationById([FromQuery] string _id)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _ticketDAL.getReservationById(_id);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get get reservation by NIC 
        [HttpPost]
        public async Task<IActionResult> getReservationByNic([FromQuery] string nic)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _ticketDAL.getReservationByNic(nic);
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
