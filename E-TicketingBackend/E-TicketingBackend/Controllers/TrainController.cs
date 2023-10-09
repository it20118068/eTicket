using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//TrainDTO Controller
namespace CrudOperations.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]

    public class TrainController : ControllerBase
    {
        private readonly ITrainDAL _trainDAL;
        public TrainController(ITrainDAL trainDAL)
        {
            _trainDAL = trainDAL;
        }

        //This method use to add a new Train 
        [HttpPost]
        public async Task<IActionResult> addTrain(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.addTrain(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to Get all Trains
        [HttpGet]
        public async Task<IActionResult> GetAllTrain()
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.GetAllTrain();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);

        }

        //This method use to Add new train schedule
        [HttpPost]
        public async Task<IActionResult> addSchedule(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.addSchedule(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get all train schedule
        [HttpGet]
        public async Task<IActionResult> GetAllSchedule()
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.GetAllSchedule();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);

        }

        //This method use to update train schedule by ID 
        [HttpPost]
        public async Task<IActionResult> updateScheduleById(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.updateScheduleById(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get train schedule by ID
        [HttpPost]
        public async Task<IActionResult> getSheduleById([FromQuery] string _id)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.getSheduleById(_id);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);

        }

        //This method use to cancel Train reservation schedule
        [HttpPost]
        public async Task<IActionResult> cancelTrainReservation(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.cancelTrainReservation(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        //This method use to get a schedule by train code
        [HttpPost]
        public async Task<IActionResult> getSheduleByTrainId(RequestDTO request)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                response = await _trainDAL.getSheduleByTrainId(request.trainCode);
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
