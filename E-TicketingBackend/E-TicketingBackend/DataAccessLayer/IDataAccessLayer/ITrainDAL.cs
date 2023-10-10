using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface ITrainDAL
    {
        public Task<ResponseDTO> addTrain(RequestDTO request);
        public Task<ResponseDTO> GetAllTrain();
        public Task<ResponseDTO> addSchedule(RequestDTO request);
        public Task<ResponseDTO> GetAllSchedule();
        public  Task<ResponseDTO> updateScheduleById(RequestDTO request);
        public  Task<ResponseDTO> getSheduleById(string _id);
        public Task<ResponseDTO> cancelTrainReservation(RequestDTO request);
        public Task<ResponseDTO> getSheduleByTrainId(string TrainCode);
    }
}
