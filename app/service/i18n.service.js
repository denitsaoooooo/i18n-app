(function () {
    'use strict';
    angular.module('App').factory('LanguageService',  LanguageService);

    LanguageService.$inject = ['$rootScope','$window', '$translate', '$cookies', 'tmhDynamicLocale'];

    function LanguageService($rootScope, $window, $translate, $cookies, tmhDynamicLocale) {
        var service = {};
        service.listLangs = ['en', 'de', 'es', 'fr'];
        service.language = 'en';
        service.retrieveUserLanguage = retrieveUserLanguage;
        service.setLanguage = setLanguage;
        service.addChartToRedrawList = addChartToRedrawList;

        clearRedrawnChartsArray();

        $rootScope.$on('$localeChangeSuccess', function () {
            redrawChartsOnLocaleChange();
        })

        function retrieveUserLanguage() {

            //Check browser cookies
            var userLanguage = readCookie();
            var isInCookies = (userLanguage) ? true :false;

            //Check browser default language
            if(!isInCookies){
                userLanguage = detectBrowserLanguage();
            }

            if(service.listLangs.indexOf(userLanguage) == -1){
                userLanguage = 'en';
                isInCookies = false;
            }
            setLanguage(userLanguage);
        }

        function detectBrowserLanguage() {

            var browserLang = 'en';
            var browserLanguages = $window.navigator.languages;

            // Firefox
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            // Chrome
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            if(isFirefox || isChrome || isIE){
                browserLang = (browserLanguages && browserLanguages.length >=1)  ? browserLanguages[0] : browserLang;
                browserLang = (browserLang.indexOf('-') != -1) ? browserLang.substring(0,browserLang.indexOf('-')) : browserLang;
            }

            return browserLang;
        }

        function setLanguage(langKey){
            setUserLanguageLocale(langKey);
            writeCookie(langKey);
        }

        function setUserLanguageLocale(langKey){
            service.language = langKey;
            $translate.use(langKey);
            tmhDynamicLocale.set(langKey);
        }

        function writeCookie(langKey) {
            var now = new Date(),
                // this will set the expiration to 12 months
                exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

            $cookies.put('angular_app', langKey, {
                expires: exp
            });
        }

        function readCookie(){
            return $cookies.get('angular_app');
        }

        function addChartToRedrawList(chart){
            $rootScope.chartsToRedraw.push(chart);
        }

        function redrawChartsOnLocaleChange() {
            if ($rootScope.chartsToRedraw) {
                var i = 0;
                for (; i < $rootScope.chartsToRedraw.length; i++) {
                    $rootScope.chartsToRedraw[i].redraw();
                }
            }
        }

        function clearRedrawnChartsArray() {
            $rootScope.chartsToRedraw = [];
        }
        return service;
    }
})();
