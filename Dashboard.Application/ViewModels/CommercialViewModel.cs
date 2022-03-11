using System;

namespace Dashboard.Application.ViewModels.Dashboard
{
    public class CommercialViewModel
    {
        public Guid Id { get; set; }
        public int PairId { get; set; }
        public DateTime Date { get; set; }
        public int OI { get; set; }
        public decimal OIChange { get; set; }
        public int Long { get; set; }
        public decimal LongChange { get; set; }
        public int Short { get; set; }
        public decimal ShortChange { get; set; }
        public int Net { get; set; }
        public decimal NetChange { get; set; }
        public decimal NetChangePercent { get; set; }
        public decimal COT { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
