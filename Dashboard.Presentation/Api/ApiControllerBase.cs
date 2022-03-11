using System.Web.Http;

namespace Dashboard.Presentation.Controllers.Api
{
    //[EnableCors(origins: "https://Dashboard.vn,https://localhost:44345", headers: "*", methods: "*")]
    //[AutoInvalidateCacheOutput]
    //[CacheOutput(ServerTimeSpan = 84000, ExcludeQueryStringFromCacheKey = true)]
    public class ApiControllerBase : ApiController
    {
    }
}
