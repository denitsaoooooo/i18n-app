(function() {
    'use strict';

var app = angular.module('App', ["pascalprecht.translate", "tmh.dynamicLocale", "ngCookies"]);

app.config(['$translateProvider',
    function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
        $translateProvider.useSanitizeValueStrategy('escape');
    }]);

app.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.min.js');
    });
})();