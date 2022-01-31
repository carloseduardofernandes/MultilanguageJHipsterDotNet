using MultilanguageJHipsterDotNet.Crosscutting.Constants;

namespace MultilanguageJHipsterDotNet.Crosscutting.Exceptions
{
    public class EmailNotFoundException : BaseException
    {
        public EmailNotFoundException() : base(ErrorConstants.EmailNotFoundType, "Email address not registered")
        {
        }
    }
}
