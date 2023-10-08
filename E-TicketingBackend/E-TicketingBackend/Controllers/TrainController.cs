using E_TicketingBackend.DataAccessLayer.IDataAccessLayer;
using E_TicketingBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> addTrain(TrainRequestDTO request)
        {
            TrainResponseDTO response = new TrainResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> addSchedule(ScheduleRequestDTO request)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
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

        [HttpGet]
        public async Task<IActionResult> GetAllSchedule()
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> updateScheduleById(ScheduleRequestDTO request)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> getSheduleById([FromQuery] string _id)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
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

        [HttpPost]
        public async Task<IActionResult> cancelTrainReservation(ScheduleRequestDTO request)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();
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

    }
}
