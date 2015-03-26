/**
 *
 *
 * @file:
 * @author: Severin Burgstaller
 */

angular.module("sbc.services", [])

        .factory("API", function ()
        {
            var baseURL = 'https://api.fixer.io/';

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

                console.log(returnURL);

                return returnURL
            };

            return this;
        })

        .factory("Fixr", function (API, $http, $q)
        {
            var currencies = {};

            return {
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

        .factory("Currencies", function (Fixr, $http, $q)
        {
            return {
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

        })
;