using Dashboard.Domain.Entities;
using Dashboard.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard.Infra.Data.Repositories
{
    public class MenuInRoleRepository : RepositoryBase<MenuInRole>, IMenuInRoleRepository
    {
        public IEnumerable<MenuInRole> GetMenuByRoleId(Guid roleId)
        {
            return Db.MenuInRole.Where(c => c.RoleId == roleId);
        }

    }
}
