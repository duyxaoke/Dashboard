using Dashboard.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Dashboard.Domain.Interfaces.Repositories
{
    public interface IMenuInRoleRepository : IRepositoryBase<MenuInRole>
    {
        IEnumerable<MenuInRole> GetMenuByRoleId(Guid roleId);
    }
}
