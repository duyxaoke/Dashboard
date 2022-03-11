var CommonHelper = function ($rootScope, $localstorage, $timeout, $q, $http) {
    let urlApi = "/api/";
    let urlExternalApi = 'https://api.accesstrade.vn/v1/';
    let service = {};

    service.ConfigUrl = urlApi + "Configs/";
    service.MenuUrl = urlApi + "Menus/";
    service.RoleUrl = urlApi + "Roles/";
    service.UserUrl = urlApi + "Users/";
    service.ServiceUrl = urlApi + "Services/";
    service.CategoryUrl = urlApi + "Categories/";
    service.HistoryUrl = urlApi + "Histories/";
    service.PartnerUrl = urlApi + "Partners/";
    service.PromotionUrl = urlApi + "Promotions/";
    service.WithdrawUrl = urlApi + "Withdraws/";
    service.BankUrl = urlApi + "Banks/";
    service.WalletUrl = urlApi + "Wallets/";
    service.ShortenerUrl = urlApi + "Shorteners/";
    service.CommercialUrl = urlApi + "commercials/";

    // External Api
    service.OffersUrl = urlExternalApi + "offers_informations?";

    service.DepWithType = {};
    service.DepWithType.Deposit = 0;
    service.DepWithType.Withdraw = 1;

    service.StatusTransaction = {};
    service.StatusTransaction.Pending = 0;
    service.StatusTransaction.Confirmed = 1;
    service.StatusTransaction.Cancel = 2;

    return service;
}
CommonHelper.$inject = ["$rootScope", "$localstorage", "$timeout", "$q", "$http"];
