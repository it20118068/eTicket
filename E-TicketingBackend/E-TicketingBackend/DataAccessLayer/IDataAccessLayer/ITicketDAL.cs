//namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
//{
//    public interface ITicketDAL
//    {
//    }
//}
using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface ITicketDAL
    {
        public Task<ResponseDTO> addReservation(RequestDTO request);
        public Task<ResponseDTO> getAllReservation();
        public Task<ResponseDTO> updateReservationById(RequestDTO request);
        public Task<ResponseDTO> getReservationById(string _id);


    }
}

