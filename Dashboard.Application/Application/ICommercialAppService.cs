using Dashboard.Application.ViewModels.Dashboard;
using Dashboard.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dashboard.Application.Application.IDashboard
{
    public interface ICommercialAppService : IApplication<CommercialViewModel, Commercial>
    {
        List<CommercialSummaryViewModel> ReadAllCOT(int pairId);
    }
}
