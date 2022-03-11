using Dashboard.Domain.Entities;
using System.Collections.Generic;

namespace Dashboard.Domain.Interfaces.Repositories
{
    public interface IMenuRepository : IRepositoryBase<Menu>
    {
        IEnumerable<Menu> GetParent();
        IEnumerable<Menu> GetChildren(int parentId);
    }
}
