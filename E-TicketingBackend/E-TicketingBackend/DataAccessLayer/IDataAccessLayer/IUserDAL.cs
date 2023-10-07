using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface IUserDAL
    {
        public Task<UserResponseDTO> getAccountById(string nic);
        public Task<UserResponseDTO> deletAccountById(string nic);
        public Task<UserResponseDTO> updateAccountById(UserRequestDTO request);
        public Task<UserResponseDTO> GetAllUsers();
    }
}
