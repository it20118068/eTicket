using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface ITrainDAL
    {
        public Task<TrainResponseDTO> addTrain(TrainRequestDTO request);
        public Task<ScheduleResponseDTO> addSchedule(ScheduleRequestDTO request);
        public Task<ScheduleResponseDTO> GetAllSchedule();
        public  Task<ScheduleResponseDTO> updateScheduleById(ScheduleRequestDTO request);
        public  Task<ScheduleResponseDTO> getSheduleById(string _id);
        public Task<ScheduleResponseDTO> cancelTrainReservation(ScheduleRequestDTO request);

    }
}
