using Dashboard.Domain.Entities;
using Dashboard.Infra.Data.Repositories;

namespace Dashboard.Domain.Interfaces.Repositories
{
    public class CommercialRepository : RepositoryBase<Commercial>, ICommercialRepository
    {
    }
}
