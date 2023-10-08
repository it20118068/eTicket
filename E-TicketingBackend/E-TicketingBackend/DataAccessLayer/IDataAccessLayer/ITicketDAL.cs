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
        public Task<TicketResponseDTO> addReservation(TicketRequestDTO request);
        public Task<TicketResponseDTO> getAllReservation();
        public Task<TicketResponseDTO> updateReservationById(TicketRequestDTO request);
        public Task<TicketResponseDTO> getReservationById(string _id);


    }
}

