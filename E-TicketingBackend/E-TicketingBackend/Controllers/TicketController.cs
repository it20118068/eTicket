//using Microsoft.AspNetCore.Mvc;

//namespace E_TicketingBackend.Controllers
//{
//    public class TicketController : Controller
//    {
//        public IActionResult Index()
//        {
//            return View();
//        }
//    }
//}
using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> addReservation(TicketRequestDTO request)
        {
            TicketResponseDTO response = new TicketResponseDTO();
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


        [HttpGet]
        public async Task<IActionResult> getAllReservation()
        {
            TicketResponseDTO response = new TicketResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> updateReservationById(TicketRequestDTO request)
        {
            TicketResponseDTO response = new TicketResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> getReservationById([FromQuery] string _id)
        {
            TicketResponseDTO response = new TicketResponseDTO();
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
    }
}
