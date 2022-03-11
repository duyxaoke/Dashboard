using AutoMapper;
using CoC.Core.DataAccess.Interface;
using Dapper;
using Dashboard.Application.Application;
using Dashboard.Application.Application.IDashboard;
using Dashboard.Application.ViewModels.Dashboard;
using Dashboard.Domain.Entities;
using Dashboard.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard.Application.Dashboard
{
    public class CommercialAppService : ICommercialAppService
    {
        ICommercialRepository _repository;
        private readonly Lazy<IReadOnlyRepository> _readOnlyRepository;
        public CommercialAppService(ICommercialRepository repository, Lazy<IReadOnlyRepository> readOnlyRepository)
        {
            _repository = repository;
            _readOnlyRepository = readOnlyRepository;
        }
        public List<CommercialSummaryViewModel> ReadAllCOT(int pairId)
        {
            var param = new DynamicParameters();
            param.Add("@PairId", pairId);
            var result = _readOnlyRepository.Value.Connection.Query<CommercialSummaryViewModel>("[ReadAllCOT]", param, commandType: CommandType.StoredProcedure, commandTimeout: 300).ToList();
            return result;
        }

        public async Task<CommercialViewModel> GetByIdAsync(object id)
        {
            return Mapper.Map<Commercial, CommercialViewModel>(await _repository.GetByIdAsync(id));
        }

        public IQueryable<Commercial> GetAllPaging()
        {
            return _repository.GetAllPaging();
        }

        public async Task<IEnumerable<CommercialViewModel>> GetAllAsync()
        {
            return Mapper.Map<IEnumerable<Commercial>, IEnumerable<CommercialViewModel>>(await _repository.GetAllAsync());
        }


        public void Add(CommercialViewModel entity)
        {
            var entityAdd = Mapper.Map<CommercialViewModel, Commercial>(entity);
            _repository.Add(entityAdd);
        }

        public void Update(CommercialViewModel entity)
        {
            var entityUpdt = Mapper.Map<CommercialViewModel, Commercial>(entity);
            _repository.Update(entityUpdt);
        }

        public void Remove(object id)
        {
            _repository.Remove(id);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}
