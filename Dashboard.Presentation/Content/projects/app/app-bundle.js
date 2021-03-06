var MasterPageController = function ($scope, $rootScope, $timeout, $filter, $localstorage) {
    $rootScope.MasterPage = { IsLoading: false };
}
MasterPageController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "$localstorage"];
var formatMoney = function ($filter, $timeout) {
    return {
        require: '?ngModel',
        restrict: "A",
        scope: {
            myModel: "=",
            precision: "=",
            formatMoneyNoInput: "="
        },
        link: function (scope, elem, attrs, ctrl) {
            if (scope.precision == null || scope.precision == undefined)
                scope.precision = 0;
            elem.maskMoney({
                allowNegative: true, thousands: ',', decimal: '.', affixesStay: false, allowZero: true, precision: scope.precision
            });
            elem.keydown(function (event) {
                var c = String.fromCharCode(event.which);
                if (_.contains(scope.formatMoneyNoInput, c)) {
                    event.preventDefault();
                    return;
                }
                $timeout(function () {
                    scope.myModel = parseFloat(elem.val().replace(new RegExp(",", 'g'), ""));
                    elem.trigger("change");
                });
            });
            scope.$watch('myModel', function () {
                if ($.isNumeric(scope.myModel) && scope.myModel.toString().indexOf('.') > 0) {
                    elem.val(scope.myModel.toFixed(scope.precision)).trigger('mask.maskMoney');
                }
                else {
                    elem.val(scope.myModel).trigger('mask.maskMoney');
                }
            });
        }
    }
};
formatMoney.$inject = ['$filter', '$timeout'];
var getWidth = function ($timeout, $interval) {
    return {
        restrict: 'A',

        scope: {
            getWidth: "=",
        },

        link: function (scope, element, attrs) {
            $(function () {
                scope.getWidth = element[0].offsetWidth; 

                $interval(function () {
                    scope.getWidth = element[0].offsetWidth;
                }, 500); 
            });
        }
    };
};

getWidth.$inject = ["$timeout", "$interval"];

var getHeight = function ($timeout, $interval) {
    return {
        restrict: 'A',

        scope: {
            getHeight: "=",
        },

        link: function (scope, element, attrs) {
            $(function () { 
                scope.getHeight = element[0].offsetHeight; 

                $interval(function () {
                    scope.getHeight = element[0].offsetHeight;
                }, 500);
            });
        }
    };
};

getHeight.$inject = ["$timeout", "$interval"];
var lazyLoad = function ($timeout, $window) {
    return {
        restrict: 'A',
        scope: {
            fncallback: "&lazyLoad"
        },

        link: function (scope, element, attrs) {
            scope.IsLoaded = false;
            scope.raw = element[0];  
            angular.element($window).bind("scroll", function (e) {
                var IsVisible = $(scope.raw).is(':visible');
                if (!scope.IsLoaded && IsVisible) {
                    var PositionYofElement = $(scope.raw).position().top;
                    if (this.pageYOffset + this.innerHeight >= PositionYofElement) {
                        scope.fncallback();
                        scope.IsLoaded = true; 
                        scope.$apply();
                    }

                }
            });
        }
    };
};

lazyLoad.$inject = ["$timeout", "$window"];
 
var noInput = function () {
    return {
        restrict: 'A',

        scope: {
            noInput: "="
        }, 

        link: function (scope, element, attrs) {  
            element.bind("keydown keypress", function (event) { 
                var c = String.fromCharCode(event.which);
                if (_.contains(scope.noInput, c)) { 
                    event.preventDefault();
                } 
            });

            //scope.KeyCode = [];
            //scope.noInput.forEach(function (item) {
            //    scope.KeyCode.push(item.charCodeAt(0));
            //});

            //element.bind("keydown keypress", function (event) {
            //    if (_.contains(scope.KeyCode, event.which)) {
            //        event.preventDefault();
            //    }
            //});
        }
    }; 
};
noInput.$inject = [];
var whenEnter = function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.whenEnter);
                });

                event.preventDefault();
            }
        });
    };
};
whenEnter.$inject = [];
var compile = function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
          function (scope) {
              // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
          },
          function (value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
          }
      );
    };
};
compile.$inject = ["$compile"];
var inputFormat = function ($filter) {
    return {
        require: '?ngModel',
        restrict: "A",
        link: function (scope, elem, attrs, ctrl) {
            function isFloat(n) {
                return Number(n) === n && n % 1 !== 0;
            }
            var allowdecimal = (attrs["allowDecimal"] == 'true') ? true : false;
            scope.allowdecimal = allowdecimal;
            scope.defaultValue = attrs["defaultValue"] ? attrs["defaultValue"] : false;
            if (!ctrl) return;

            elem.bind("keypress", function (event) {
                var keyCode = event.which || event.keyCode;
                var allowdecimal = (attrs["allowDecimal"] == 'true') ? true : false;
                if (((keyCode > 47) && (keyCode < 58)) || (keyCode == 8) || (keyCode == 9) || (keyCode == 190) || (keyCode == 39) || (keyCode == 37) || (keyCode == 43) || (allowdecimal && keyCode == 46))
                    return true;
                else
                    event.preventDefault();
            });

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.inputFormat)(ctrl.$modelValue ? ctrl.$modelValue : 0);
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var allowdecimal = (attrs["allowDecimal"] == 'true') ? true : false;
                if (scope.defaultValue && !parseInt(viewValue)) {
                    viewValue = scope.defaultValue;
                }
                else if (!allowdecimal && isFloat(parseFloat(viewValue))) {
                    viewValue = scope.defaultValue;
                }
                var plainNumber = viewValue.replace(/[^\d|\.|\-]/g, '');
                plainNumber = plainNumber || 0;
                if (plainNumber == '') return;
                var dots = plainNumber.match(/\./g);
                var dotAF = plainNumber.match(/\.$/g);
                dots = (dots != null && dots.length == 1 && dotAF != null) ? '.' : '';
                var temp = $filter(attrs.inputFormat)(plainNumber);

                elem.val(temp + dots).trigger('change');

                return parseFloat(plainNumber);
            });
        }
    }
};
inputFormat.$inject = ['$filter'];
var $localstorage = function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) { return $window.localStorage[key] || defaultValue; },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            try {
                var temp = $window.localStorage[key];
                if (temp) {
                    return JSON.parse(temp || "{}");
                }
            } catch (e) {
                return JSON.parse("{}");
            }
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        clearAll: function () {
            $window.localStorage.clear();
        }
    };
};

$localstorage.$inject = ["$window"];


var ApiHelper = function ($rootScope, $localstorage, $timeout, $q, $http) {
    var service = {};
    service.CheckCacheExist = (CacheKeyClient) => {
        let version = DataCacheKey[CacheKeyClient];
        if (!version) {
            return false;
        }
        let storerage = $localstorage.getObject(CacheKeyClient);
        if (!storerage) {
            return false;
        }
        if (storerage.version != version) {
            return false;
        }
        if (!storerage.data) {
            return false;
        }
        return true;
    };
    service.GetCache = (CacheKeyClient) => {
        let storerage = $localstorage.getObject(CacheKeyClient);
        return storerage.data;
    };
    service.AddCache = (CacheKeyClient, data) => {
        let version = DataCacheKey[CacheKeyClient];
        if (!version) {
            //case n??y do view output c?? DataCacheKey ko ?????ng nh???t khai b??o v???i CacheKeyClient
            //vo set lai view cho ????ng, ho???c x??a cache render ra
            return;
        }
        let storerage = {};
        storerage.version = version;
        storerage.data = data;

        $localstorage.remove(CacheKeyClient);
        $localstorage.setObject(CacheKeyClient, storerage);
    };

    service.CodeStep = {
        Status: "",
        StatusCode: 0,
        ErrorStep: "",
        Message: "",
        ErrorMessage: "",
        Data: ""
    };

    service.JsonStatusCode = {
        Success: "Success",
        Error: "Error",
        Warning: "Warning",
        Info: "Info"
    };

    service.Status = {
        CreateSuccess: "T???o th??nh c??ng!",
        CreateFail: "T???o th???t b???i!",
        UpdateSuccess: "C???p nh???t th??nh c??ng!",
        UpdateFail: "C???p nh???t th???t b???i!",
        DeleteSuccess: "X??a th??nh c??ng!",
        DeleteFail: "X??a th???t b???i!"
    };

    service.GetMethod = function (url, data, header) {
        let defer = $q.defer();
        let codeStep = jQuery.extend({}, ApiHelper.CodeStep);
        var req = {
            method: 'GET',
            url: url,
            headers: header,
            data: data
        }
        $http(req).then(function (jqXHR) {
            if (jqXHR.status == 204) {
                codeStep = service.SetErrorAPI(jqXHR, url, data);
                defer.reject(codeStep);
            } else {
                codeStep.Status = service.JsonStatusCode.Success;
                codeStep.Data = jqXHR.data;
                defer.resolve(codeStep);
            }
        }, function (jqXHR) {
            codeStep = service.SetErrorAPI(jqXHR, url, data);
            defer.reject(codeStep);
        });
        return defer.promise;
    };


    service.PostMethod = function (url, data, header) {

        let codeStep = jQuery.extend({}, ApiHelper.CodeStep);
        let defer = $q.defer();

        var req = {
            method: 'POST',
            url: url,
            headers: header,
            data: data
        }
        $http(req).then(function (jqXHR) {
            if (jqXHR.status == 204) {
                codeStep = service.SetErrorAPI(jqXHR, url, data);
                defer.reject(codeStep);
            } else {
                codeStep.Status = service.JsonStatusCode.Success;
                codeStep.Data = jqXHR.data;
                defer.resolve(codeStep);
            }
        }, function (jqXHR) {
            codeStep = service.SetErrorAPI(jqXHR, url, data);
            defer.reject(codeStep);
        });
        return defer.promise;
    };

    service.PutMethod = function (url, data, header) {

        let codeStep = jQuery.extend({}, ApiHelper.CodeStep);
        let defer = $q.defer();

        var req = {
            method: 'PUT',
            url: url,
            headers: header,
            data: data
        }
        $http(req).then(function (jqXHR) {
            if (jqXHR.status == 204) {
                codeStep = service.SetErrorAPI(jqXHR, url, data);
                defer.reject(codeStep);
            } else {
                codeStep.Status = service.JsonStatusCode.Success;
                codeStep.Data = jqXHR.data;
                defer.resolve(codeStep);
            }
        }, function (jqXHR) {
            codeStep = service.SetErrorAPI(jqXHR, url, data);
            defer.reject(codeStep);
        });
        return defer.promise;
    };

    service.DeleteMethod = function (url, data, header) {

        let codeStep = jQuery.extend({}, ApiHelper.CodeStep);
        let defer = $q.defer();

        var req = {
            method: 'DELETE',
            url: url,
            headers: header,
            data: data
        }
        $http(req).then(function (jqXHR) {
            if (jqXHR.status == 204) {
                codeStep = service.SetErrorAPI(jqXHR, url, data);
                defer.reject(codeStep);
            } else {
                codeStep.Status = service.JsonStatusCode.Success;
                codeStep.Data = jqXHR.data;
                defer.resolve(codeStep);
            }
        }, function (jqXHR) {
            codeStep = service.SetErrorAPI(jqXHR, url, data);
            defer.reject(codeStep);
        });
        return defer.promise;
    };

    service.SetErrorAPI = function (jqXHR, ApiEndPoint) {
        var codeStep = jQuery.extend({}, service.CodeStep);
        if (jqXHR.status == 200 || jqXHR.status == 201) return;
        codeStep.Status = service.JsonStatusCode.Error;
        codeStep.StatusCode = jqXHR.status;
        codeStep.ErrorStep = "API error " + jqXHR.status + ", ApiEndPoint:" + ApiEndPoint;
        switch (jqXHR.status) {
            case 406:
                var errorLst = jqXHR.data;
                codeStep.Status = service.JsonStatusCode.Warning;
                codeStep.Message = errorLst;
                if (jQuery.type(errorLst) == "array") {
                    codeStep.Message = errorLst.join("</br>");
                }
                break;
            case 500:
                //var errorLst = jqXHR.data;
                codeStep.ErrorMessage = jqXHR.data;
                codeStep.Message = service.StatusCodeMessage(jqXHR.status);
                break;
            case 204:
                codeStep.Message = "Kh??ng c?? d??? li???u";
                codeStep.Status = service.JsonStatusCode.Warning;
                break;
            default:
                codeStep.Message = service.StatusCodeMessage(jqXHR.status);
                break;
        }
        return codeStep;
    }

    service.StatusCodeMessage = function (status) {
        var strMessage = '';
        switch (status) {
            case 400:
                strMessage = 'L???i d??? li???u kh??ng h???p l???';
                break;
            case 401:
                strMessage = 'Phi??n l??m vi???c ???? h???t h???n, vui l??ng ????ng nh???p l???i.';
                break;
            case 403:
                strMessage = 'B???n kh??ng c?? quy???n th???c hi???n thao t??c n??y.';
                break;
            case 404:
                strMessage = 'URL action kh??ng ch??nh x??c';
                break;
            case 405:
                strMessage = 'Ph????ng th???c kh??ng ???????c ch???p nh???n';
                break;
            case 429:
                strMessage = 'Thao t??c qu?? nhanh';
                break;
            case 500:
                strMessage = 'L???i h??? th???ng';
                break;
            case 502:
                strMessage = '???????ng truy???n k??m';
                break;
            case 503:
                strMessage = 'D???ch v??? kh??ng h???p l???';
                break;
            case 504:
                strMessage = 'H???t th???i gian ch???';
                break;
            case 440:
                strMessage = 'Phi??n ????ng nh???p ???? h???t h???n, vui l??ng ????ng nh???p l???i';
                break;
            default:
                strMessage = 'L???i ch??a x??c ?????nh';
                break;
        }
        return strMessage;
    };


    service.ConfirmRedirectLogin = function () {
        if ($rootScope.IsShowConfirmRedirectLogin) {
            return;
        }
        $rootScope.IsShowConfirmRedirectLogin = true;
        bootbox.alert({
            title: "Th??ng b??o",
            message: "Phi??n l??m vi???c ???? h???t h???n, vui l??ng ????ng nh???p l???i???",
            callback: function (result) {
                $rootScope.IsShowConfirmRedirectLogin = false;
                window.location.href = "/Home/Logout";
            }
        })
    }

    service.NotPermission = function () {
        bootbox.alert({
            title: "Th??ng b??o",
            message: "B???n kh??ng c?? quy???n th???c hi???n thao t??c n??y???",
            callback: function () {
            }
        })
    }

    return service;
};
ApiHelper.$inject = ["$rootScope", "$localstorage", "$timeout", "$q", "$http"];
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

var DataFactory = function ($rootScope, $localstorage, $timeout, UtilFactory, $q, $http, ApiHelper, CommonHelper) {
    var service = {};
    service.CheckCacheExist = (CacheKeyClient) => {
        let version = DataCacheKey[CacheKeyClient];
        if (!version) {
            return false;
        }
        let storerage = $localstorage.getObject(CacheKeyClient);
        if (!storerage) {
            return false;
        }
        if (storerage.version != version) {
            return false;
        }
        if (!storerage.data) {
            return false;
        }
        return true;
    };
    service.GetCache = (CacheKeyClient) => {
        let storerage = $localstorage.getObject(CacheKeyClient);
        return storerage.data;
    };
    service.AddCache = (CacheKeyClient, data) => {
        let version = DataCacheKey[CacheKeyClient];
        if (!version) {
            //case n??y do view output c?? DataCacheKey ko ?????ng nh???t khai b??o v???i CacheKeyClient
            //vo set lai view cho ????ng, ho???c x??a cache render ra
            return;
        }
        let storerage = {};
        storerage.version = version;
        storerage.data = data;

        $localstorage.remove(CacheKeyClient);
        $localstorage.setObject(CacheKeyClient, storerage);
    };

    service.Users_Get = () => {
        let defer = $q.defer();
        let strApiEndPoint = ApiEndPoint.UserResource;
        ApiHelper.GetMethod(strApiEndPoint)
            .then(function (response) {
                response.Data = response.Data.filter(x => x.Username && x.FullName);//.splice(0, 20);
                defer.resolve(response);
            })
            .catch(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };
    //#endregion
    
    //#region Ward
    service.Stores_Get = function () {
        let defer = $q.defer();
        let strApiEndPoint = ApiEndPoint.StoreResource;
        ApiHelper.GetMethod(strApiEndPoint)
            .then(function (response) {
                response.Data.forEach((x) => {
                    x.id = x.StoreID;
                    x.text = x.StoreName;
                    x.parent = "#";
                });
                defer.resolve(response);
            })
            .catch(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };

    //#endregion

    //#region Menu
    service.Menus_Get = function () {
        let defer = $q.defer();
        let strApiEndPoint = CommonHelper.MenuUrl;
        ApiHelper.GetMethod(strApiEndPoint)
            .then(function (response) {
                response.Data.forEach((x) => {
                    if (x.ParentId || x.ParentId > 0) {
                        x.ParentName = response.Data.filter(c => c.Id == x.ParentId)[0].Name;
                    };
                });
                defer.resolve(response);
            })
            .catch(function (response) {
                defer.reject(response);
            });
        return defer.promise;
    };
    //#endregion


    //#region Partner
    service.Partners_Get = function (roomId) {
        let strApiEndPoint = CommonHelper.PartnerUrl;
        return ApiHelper.GetMethod(strApiEndPoint);
    };
    //#endregion

    //#region Bank
    service.Banks_Get = function (roomId) {
        let strApiEndPoint = CommonHelper.BankUrl;
        return ApiHelper.GetMethod(strApiEndPoint);
    };
    //#endregion

    return service;
};
DataFactory.$inject = ["$rootScope", "$localstorage", "$timeout", "UtilFactory", "$q", "$http", "ApiHelper", "CommonHelper"];
var UtilFactory = function ($rootScope, $timeout, $q) {
    var service = {};

    service.WaitingLoadDirective = function (arrar) {
        clearInterval(service.myTimer);
        let defer = $q.defer();
        service.myTimer = setInterval(() => {
            let objNotReady = _.find(arrar, (x) => x.IsReady == undefined || x.IsReady == false);
            if (!objNotReady) {
                clearInterval(service.myTimer);
                defer.resolve();
            }
        }, 100);
        return defer.promise;
    };

    service.IsEquivalent = function (a, b) {
        values = (o) => Object.keys(o).sort().map(k => o[k]).join('|'),
            mapped1 = a.map(o => values(o)),
            mapped2 = b.map(o => values(o));
        var res = mapped1.every(v => mapped2.includes(v));
        return res;
    };

    service.InitArrayNoIndex = function (number) {
        var arr = new Array();
        for (var i = 1; i < number; i++) {
            arr.push(i);
        }
        return arr;
    };
    service.String = {};
    service.String.IsNullOrEmpty = function (str) {
        if (!str || str == null) {
            return true;
        }
        return false;
    };
    service.String.IsContain = function (strRoot, strRequest) {
        if (service.String.IsNullOrEmpty(strRoot)) {
            return false;
        }
        if (service.String.IsNullOrEmpty(strRequest)) {
            return true;
        }
        if (strRoot.indexOf(strRequest) < 0) {
            return false;
        }
        return true;
    };

    service.Alert = {};
    service.Alert.RequestError = function (e) {
        console.log(e);

        var strMessage = '';
        switch (e.status) {
            case 400:
                strMessage = 'L???i d??? li???u kh??ng h???p l???';
                break;
            case 401:
                strMessage = 'Phi??n l??m vi???c ???? h???t h???n, vui l??ng ????ng nh???p l???i.';
                break;
            case 403:
                strMessage = 'B???n kh??ng c?? quy???n th???c hi???n thao t??c n??y.';
                break;
            case 404:
                strMessage = 'URL action kh??ng ch??nh x??c';
                break;
            case 405:
                strMessage = 'Ph????ng th???c kh??ng ???????c ch???p nh???n';
                break;
            case 500:
                strMessage = 'L???i h??? th???ng';
                break;
            case 502:
                strMessage = '???????ng truy???n k??m';
                break;
            case 503:
                strMessage = 'D???ch v??? kh??ng h???p l???';
                break;
            case 504:
                strMessage = 'H???t th???i gian ch???';
                break;
            case 440:
                strMessage = 'Phi??n ????ng nh???p ???? h???t h???n, vui l??ng ????ng nh???p l???i';
                break;
            default:
                strMessage = 'L???i ch??a x??c ?????nh';
                break;
        }
        sys.Alert(false, strMessage);
    };
    return service;
};

UtilFactory.$inject = ["$rootScope", "$timeout", "$q"];
var dateFormat = function ($filter) {
    return function (input, optional) {

        if (!input) {
            return "";
        }
        if (optional == undefined || optional == '') optional = "dd/MM/yyyy";
        var resultDate;

        if (input instanceof Date) {
            resultDate = input;
        } else {
            var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "").replace("-0000", "");

            if (input.indexOf("Date") > -1) {
                resultDate = new Date(+temp);
            } else {
                resultDate = new Date(temp);
            }

            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            var resultDate = new Date(utc + (3600000 * 7));
        }

        return $filter("date")(resultDate, optional);
    };
};
dateFormat.$inject = ["$filter"];
var trustHtml = function ($sce) {
    return function (input) {
        if (!input) {
            return "";
        }
        return $sce.trustAsHtml(input);
    };
};
trustHtml.$inject = ["$sce"];
var ifEmpty = function () {
    return function (input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '' || input === 'Invalid date') {
            return defaultValue;
        }
        return input;
    }
};
var toFixedDecimal = function ($filter) {
    try {
        return function (value, optional) {
            if (!value)
                return 0;
            var decimal = value.toString().split('.')[1]; // 0 | 0123456
            if (decimal) {
                if (optional == undefined || optional === '') {
                    optional = decimal.length;
                }
                else {
                    decimal = decimal.toString().slice(0, optional);

                    for (var i = decimal.length; i > 0; i--) {
                        if (decimal.charAt(i - 1) != 0) {
                            break;
                        }
                        else {
                            decimal = decimal.substring(0, decimal.length - 1);
                        }
                    }
                    optional = decimal.length;
                }
                value = $filter('number')(parseFloat(value), optional);
            } else {
                value = $filter('number')(value);
            }
            return value;
        }
    } catch (e) {
        return 0;
    }
};
toFixedDecimal.$inject = ["$filter"];
var lstDependency = [];
lstDependency.push("ngRoute");


var MyApp = angular.module("MyApp", lstDependency);
////#region Khai b??o Factories

var addFactory = function (name, factory) {
    try {
        MyApp.factory(name, factory);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}
//#region EWorking
addFactory("$localstorage", $localstorage);
addFactory("ApiHelper", ApiHelper);
addFactory("CommonHelper", CommonHelper);
addFactory("UtilFactory", UtilFactory);
addFactory("DataFactory", DataFactory);

//#endregion

//#endregion

//#region Khai b??o Controllers

var addController = function (name, controller) {
    try {
        MyApp.controller(name, controller);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

//#region Index
addController("MasterPageController", MasterPageController);
//#endregion

//#region Khai b??o Directives

var addDirective = function (name, directive) {
    try {
        MyApp.directive(name, directive);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}
addDirective("compile", compile);
addDirective("formatMoney", formatMoney);
addDirective("getWidth", getWidth);
addDirective("inputFormat", inputFormat);
addDirective("lazyLoad", lazyLoad);
addDirective("noInput", noInput);
addDirective("whenEnter", whenEnter);

var addService = function (name, service) {
    try {
        MyApp.service(name, service);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

var addFilter = function (name, filter) {
    try {
        MyApp.filter(name, filter);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

addFilter("dateFormat", dateFormat);
addFilter("trustHtml", trustHtml);
addFilter("ifEmpty", ifEmpty);
addFilter("toFixedDecimal", toFixedDecimal);