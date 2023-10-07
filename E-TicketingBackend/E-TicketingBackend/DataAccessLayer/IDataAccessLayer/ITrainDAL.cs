using Authentication_System.Model;
using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface ITrainDAL
    {
        public Task<TrainResponseDTO> addTrain(TrainRequestDTO request);
        public Task<ScheduleResponseDTO> addSchedule(ScheduleRequestDTO request);
        public Task<ScheduleResponseDTO> GetAllSchedule();
        public  Task<ScheduleResponseDTO> updateScheduleById(ScheduleRequestDTO request);
        
    }
}
