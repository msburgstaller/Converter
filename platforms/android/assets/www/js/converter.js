/**
 * @ngdoc overview
 * @name converter
 * @module converter
 *
 * @requires ionic
 * @requires sbc.controllers
 * @requires sbc.services
 *
 * @description
 * Represents the main application "converter".
 */
angular.module('converter', ["ionic", "sbc.controllers", "sbc.services"])

        .run(function ($ionicPlatform)
        {
            $ionicPlatform.ready(function ()
            {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard)
                {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar)
                {
                    StatusBar.styleDefault();
                }
            });
        });
