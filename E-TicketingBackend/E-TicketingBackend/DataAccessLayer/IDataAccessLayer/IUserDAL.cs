using E_TicketingBackend.Model;

namespace E_TicketingBackend.DataAccessLayer.IDataAccessLayer
{
    public interface IUserDAL
    {
        public Task<UserResponseDTO> getAccountById(string Username);
        public Task<UserResponseDTO> deletAccountById(string Username);
        public Task<UserResponseDTO> updateAccountById(UserRequestDTO request);

    }
}
