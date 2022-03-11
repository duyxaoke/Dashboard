using AutoMapper;
using Dashboard.Application.ViewModels;
using Dashboard.Application.ViewModels.Dashboard;
using Dashboard.Domain.Entities;

namespace Dashboard.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<MenuViewModel, Menu>();

            // Dashboard
            CreateMap<CommercialViewModel, Commercial>();
        }
    }
}