using MultilanguageJHipsterDotNet.Crosscutting.Constants;

namespace MultilanguageJHipsterDotNet.Crosscutting.Exceptions
{
    public class InternalServerErrorException : BaseException
    {
        public InternalServerErrorException(string message) : base(ErrorConstants.DefaultType, message)
        {
        }
    }
}
