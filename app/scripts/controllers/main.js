'use strict';

angular.module('fridagarApp')
  .controller('MainCtrl', function ($rootScope, $scope, holidays, holidayservice) {
    //
    // scope variables
    //
    var _today = moment().format('YYYY-MM-DD');
    $scope.holidays = holidays.result;
    $scope.daysToNextHoliday = holidayservice.daysToNextHoliday(_today, $scope.holidays);
    $scope.holidaysInCurrentMonth = holidayservice.holidaysInMonth(_today, $scope.holidays);

    //
    // register to events
    //

    /**
     * Everytime the calendar changes month, this grabs the event
     * and updates the 'holidaysInCurrentMonth' object.
     */
    $rootScope.$on('click:monthchange', function (event, month) {
      $scope.$apply(function () {
        $scope.holidaysInCurrentMonth = holidayservice.holidaysInMonth(month, $scope.holidays);
      });
    });
  });
