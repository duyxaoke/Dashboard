using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Dashboard.Application.ViewModels;

namespace Dashboard.Presentation.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() : base("name=DefaultConnection")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, DatabaseInitializer>());//initial database use test data            
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<RoleClaim> RoleClaims { get; set; }
    }

}