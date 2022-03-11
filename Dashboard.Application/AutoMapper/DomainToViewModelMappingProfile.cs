using AutoMapper;
using Dashboard.Application.ViewModels;
using Dashboard.Application.ViewModels.Dashboard;
using Dashboard.Domain.Entities;

namespace Dashboard.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<Menu, MenuViewModel>();

            // Dashboard
            CreateMap<Commercial, CommercialViewModel>();
        }
    }
}