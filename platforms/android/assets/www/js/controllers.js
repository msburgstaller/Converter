/**
 * @ngdoc overview
 * @name sbc.controllers
 * @module sbconverter
 * @description
 * Controller of MVC pattern for sbconverter
 */
angular.module("sbc.controllers", [])

        /**
         * @ngdoc controller
         * @name sbc.controllers:ConversionSelectionCtrl
         *
         * @requires $scope
         * @requires Currencies
         *
         * @description
         * Root controller which handels API calls and data handling for conversion and conversion itself
         */
        .controller('ConversionSelectionCtrl', function ($scope, Currencies)
        {

            /**
             * @ngdoc object
             * @name sbc.controllers:ConversionSelectionCtrlh#conversion
             *
             * @methodOf sbc.controllers:ConversionSelectionCtrl
             *
             * @description
             * Conversion model used for all conversion operations (mirrors to convert result found in Currencies service)
             */
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

            /**
             * @ngdoc method
             * @name sbc.controllers:ConversionSelectionCtrlh#updateCurrency
             *
             * @param {string} to which (target or base) to update
             * @param {string} currency with which currency to update
             *
             * @methodOf sbc.controllers:ConversionSelectionCtrl
             *
             * @description
             * Updates currency for conversion in $scope.conversion
             */
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

            /**
             * @ngdoc method
             * @name sbc.controllers:ConversionSelectionCtrlh#convert
             *
             * @methodOf sbc.controllers:ConversionSelectionCtrl
             *
             * @description
             * Queries conversion service and updates $scope.conversion
             */
            $scope.convert = function ()
            {
                Currencies
                        .convert($scope.conversion.baseValue, $scope.conversion.targetCurrency, $scope.conversion.baseCurrency)
                        .then(function (data)
                        {
                            $scope.conversion = data;
                        });
            };

        });