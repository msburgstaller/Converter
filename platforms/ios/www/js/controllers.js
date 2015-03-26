/**
 *
 *
 * @file:
 * @author: Severin Burgstaller
 */

angular.module("sbc.controllers", [])

        .controller('ConversionSelectionCtrl', function ($scope, Currencies)
        {

            $scope.conversion = {
                baseCurrency: "",
                baseValue: 1,
                rate: 1,
                targetCurrency: "",
                targetValue: null
            };

            $scope.currencies = Currencies.getCurrencies();

            $scope.currencies.then(function (data)
            {
                $scope.currencies = data;

                $scope.conversion.baseCurrency = data[0];
                $scope.conversion.targetCurrency = data[1];

                $scope.convert();
            });

            $scope.updateCurrency = function (to, currency)
            {
                switch (to)
                {
                    case 'base':
                        $scope.conversion.baseCurrency = currency;

                        break;

                    case 'target':
                    default:
                        $scope.conversion.targetCurrency = currency;

                        break;
                }

                $scope.convert();
            };

            $scope.convert = function ()
            {
                Currencies.convert($scope.conversion.baseValue, $scope.conversion.targetCurrency, $scope.conversion.baseCurrency)
                        .then(function (data)
                        {
                            $scope.conversion = data;
                        });
            };

        })
;