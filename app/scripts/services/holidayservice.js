'use strict';

angular.module('fridagarApp')
  .service('holidayservice', function Holidays(ENV, $datafetcher) {
    return {
      //
      // API communication
      //

      /**
       * Retrieves all holidays for the given year. If the 'from' parameter is not given, the default
       * value is the current year.
       * param: from - the year the result should cover from
       * param: to - the year the result should cover to
       * TODO: detect language
       */
      getHolidays: function (from, to) {
        var url = ENV.api + 'holidays/isl/';
        if (!angular.isDefined(from)) {
          var year = moment().year();
          url += year + '/' + year;
        } else {
          url += from + '/' + to;
        }
        return $datafetcher.get(url);
      },
      
      //
      // Service methods
      //

      /**
       * Returns the holidays in the given date of month.
       * param: currentDate - the current date. 
       * param: holidays - list of holidays that should be counted.
       */
      holidaysInMonth: function(currentDate, holidays) {
        var result = [];
        angular.forEach(holidays, function (holiday) {
          if (moment(holiday.holidayDate).isSame(currentDate, 'month')) {
            result.push(holiday);
          }
        });
        return result;
      },
      /**
       * Returns how many days there are until next holiday.
       * param: currentDate - the current date.
       * param: holidays - the list of holidays.
       */
      daysToNextHoliday: function (currentDate, holidays) {
        var days;
        angular.forEach(holidays, function (holiday) {
          if (moment(holiday.holidayDate).isAfter(currentDate)) {
            var temp = moment(holiday.holidayDate).diff(currentDate, 'days');
            if (angular.isUndefined(days) || temp < days) {
              days = temp;
            }
          }
        });
        return days;
      }
    };
  });
