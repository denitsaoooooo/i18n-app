(function() {
    'use strict';
    angular.module('App').controller('AppController', ['$scope', 'ChartService',
        'LanguageService',function ($scope, ChartService, LanguageService) {

    $scope.topMerchants = loadTopMerchantsData();
    loadTotalChargeCountData();

    $scope.listLangs = LanguageService.listLangs;
    $scope.language = LanguageService.language;
    $scope.changeLanguage = function (lang) {
        LanguageService.setLanguage(lang);
    };

    LanguageService.retrieveUserLanguage();

    function loadTopMerchantsData() {
        var merchant1 = {merchantName:"Cool Team Ltd. ", revenue:"146000.90 ", rankNumber: "1", start_date: "1288323623006" };
        var merchant2 = {merchantName:"Susex Bol ", 	revenue:"135000.00 ", rankNumber: "2", start_date: "1401008007" };
        var merchant3 = {merchantName:"Boli Macroon. ", revenue:"89990.34 ", rankNumber: "3" , start_date: "1425380117000" };
        var merchant4 = {merchantName:"Moon Lights Ltd. ", revenue:"45000.90 ", rankNumber: "4" , start_date: "534423317" };
        var merchant5 = {merchantName:"Prisoners ", revenue:"32800 ", rankNumber: "5", start_date: "1301277007" };
        return [merchant1, merchant2, merchant3, merchant4, merchant5];
    }

    function loadTotalChargeCountData() {
        var data =
            {
                "xAxis":["2017-04-01","2017-04-02","2017-04-03","2017-04-04","2017-04-05","2017-04-06","2017-04-07"],
                "series":[[
                    {"y":4009,"tooltip":"2017-04-01"},
                    {"y":3808,"tooltip":"2017-04-02"},
                    {"y":5541,"tooltip":"2017-04-03"},
                    {"y":4525,"tooltip":"2017-04-04"},
                    {"y":1114,"tooltip":"2017-04-05"},
                    {"y":0,"tooltip":"2017-04-06"},
                    {"y":6091,"tooltip":"2017-04-07"}
                    ]]}
        ChartService.populateDateChart(data);
    }
}]);
})();