using Dashboard.Domain.Validations;
using System;

namespace Dashboard.Domain.Entities
{
    public class MenuInRole
    {
        public int Id { get; set; }
        public Guid RoleId { get; set; }
        public int MenuId { get; set; }
    }
}
