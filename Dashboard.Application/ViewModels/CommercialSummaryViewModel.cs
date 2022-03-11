using System;

namespace Dashboard.Application.ViewModels.Dashboard
{
    public class CommercialSummaryViewModel
    {
        public string PairName { get; set; }
        public DateTime Date { get; set; }
        public decimal COT_Com { get; set; }
        public decimal COT_Non { get; set; }
    }
}
