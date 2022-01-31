using System.Threading.Tasks;
using MultilanguageJHipsterDotNet.Domain;

namespace MultilanguageJHipsterDotNet.Domain.Services.Interfaces
{
    public interface IMailService
    {
        Task SendPasswordResetMail(User user);
        Task SendActivationEmail(User user);
        Task SendCreationEmail(User user);
    }
}
