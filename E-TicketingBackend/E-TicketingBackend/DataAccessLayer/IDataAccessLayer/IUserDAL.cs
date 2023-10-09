using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface IUserDAL
    {
        public Task<ResponseDTO> getAccountById(string nic);
        public Task<ResponseDTO> deletAccountById(string nic);
        public Task<ResponseDTO> updateAccountById(RequestDTO request);
        public Task<ResponseDTO> GetAllUsers();
    }
}
