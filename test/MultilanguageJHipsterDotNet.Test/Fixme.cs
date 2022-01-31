using MultilanguageJHipsterDotNet.Infrastructure.Data;
using MultilanguageJHipsterDotNet.Domain;
using MultilanguageJHipsterDotNet.Test.Setup;

namespace MultilanguageJHipsterDotNet.Test
{
    public static class Fixme
    {
        public static User ReloadUser<TEntryPoint>(AppWebApplicationFactory<TEntryPoint> factory, User user)
            where TEntryPoint : class
        {
            var applicationDatabaseContext = factory.GetRequiredService<ApplicationDatabaseContext>();
            applicationDatabaseContext.Entry(user).Reload();
            return user;
        }
    }
}
