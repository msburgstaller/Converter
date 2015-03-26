/**
 * @ngdoc overview
 * @name sbc.services
 * @module sbconverter
 * @description
 * API services for sbconverter.
 */
angular.module("sbc.services", [])

        /**
         * @ngdoc overview
         * @name sbc.services:API
         * @module sbc.services
         *
         * @description
         * Base API services for sbconverter.
         */
        .factory("API", function ()
        {
            var baseURL = 'https://api.fixer.io/';

            /**
             * @ngdoc service
             * @name sbc.services.API:getRatesURL
             * @module sbc.services.API
             *
             * @description Provides access to API URL
             */
            this.getRatesURL = function (base, from, to, date)
            {
                from = from || false;
                base = base || false;
                to = to || false;
                date = date || 'latest';

                var returnURL = baseURL + date;

                if (date !== false)
                {

                }

                if (base !== false)
                {
                    returnURL += '?base=' + base
                }

                if (from !== false)
                {
                    returnURL += '?symbols=' + from
                }

                if (from !== false && to !== false)
                {
                    returnURL += ',' + to
                }

                return returnURL
            };

            return this;
        })

        /**
         * @ngdoc overview
         * @name sbc.services:Fixr
         * @module Fixr
         *
         * @requires API
         * @requires $http
         * @requires $q
         *
         * @description
         * Fixr API implementation (needs API.getRatesURL)
         */
        .factory("Fixr", function (API, $http, $q)
        {
            var currencies = {};

            return {
                /**
                 * @ngdoc service
                 * @name sbc.services.Fixr:getExchangeRates
                 * @module Fixr
                 * @description Load exchange rates
                 * @param {string} baseCurrency base currency to query for
                 */
                getExchangeRates: function (baseCurrency)
                {
                    var deferred = $q.defer();

                    if (typeof currencies[baseCurrency] !== 'undefined')
                    {
                        deferred.resolve(currencies[baseCurrency]);
                    }
                    else
                    {
                        $http.get(API.getRatesURL(baseCurrency))
                                .success(function (data, status, headers, config)
                                {
                                    currencies = data;

                                    deferred.resolve(currencies);
                                });
                    }

                    return deferred.promise;
                }
            };


        })

        /**
         * @ngdoc overview
         * @name sbc.services:Currencies
         * @module Currencies
         *
         * @requires Fixr
         * @requires $http
         * @requires $q
         *
         * @description
         * Currency conversion implementation (based on Fixr API)
         */
        .factory("Currencies", function (Fixr, $http, $q)
        {
            return {
                /**
                 * @ngdoc service
                 * @name sbc.services.Currencies:convert
                 * @description Converts currencies
                 * @module Currencies
                 *
                 * @param {number} baseValue base value from which to convert
                 * @param {string} targetCurrency target currency to convert to
                 * @param {string} baseCurrency base currency to convert from
                 */
                convert: function (baseValue, targetCurrency, baseCurrency)
                {
                    baseCurrency = baseCurrency || 'EUR';

                    if (typeof baseValue === 'undefined') throw "Currencies.convert: Base value missing.";
                    if (typeof targetCurrency === 'undefined') throw "Currencies.convert: Target currency missing.";

                    var deferred = $q.defer();

                    Fixr.getExchangeRates(baseCurrency).then(function (data)
                    {
                        var ret = {
                            rate: null,
                            baseValue: baseValue,
                            baseCurrency: null,
                            targetValue: null,
                            targetCurrency: targetCurrency
                        };

                        if (data.base != targetCurrency)
                        {
                            ret.rate = data.rates[targetCurrency];
                            ret.targetValue = ret.rate * baseValue;
                            ret.baseCurrency = baseCurrency;
                        }
                        else
                        {
                            ret.rate = 1;
                            ret.baseCurrency = targetCurrency;
                            ret.targetValue = baseValue;
                        }

                        deferred.resolve(ret);
                    });

                    return deferred.promise;
                },

                /**
                 * @ngdoc service
                 * @name sbc.services.Currencies:getCurrencies
                 * @description Load all convertable currencies
                 * @module Currencies
                 */
                getCurrencies: function ()
                {
                    var deferred = $q.defer();

                    Fixr.getExchangeRates().then(function (data)
                    {
                        var ret = [data.base];

                        for (var i in data.rates)
                        {
                            ret[ret.length] = i;
                        }

                        deferred.resolve(ret);
                    });

                    return deferred.promise;
                }
            };
        });