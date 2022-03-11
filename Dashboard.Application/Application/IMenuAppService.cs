using Dashboard.Application.ViewModels;
using Dashboard.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard.Application.Application
{
    public interface IMenuAppService
    {
        Task<MenuViewModel> GetByIdAsync(int id);
        Task<IEnumerable<Menu>> GetAllAsync();
        IQueryable<Menu> GetAllPaging();
        IEnumerable<Menu> GetParent();
        IEnumerable<Menu> GetChildren(int parentId);
        void Add(MenuViewModel model);
        void Update(MenuViewModel model);
        void Remove(int id);
        void Dispose();
    }
}
