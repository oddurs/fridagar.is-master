'use strict';

describe('Service: holidayservice', function () {

  // load the service's module
  beforeEach(module('fridagarApp'));

  // instantiate service
  var holidayservice,
      datafetcher,
      API_URL = 'http://127.0.0.1:5000/api/';

  beforeEach(inject(function (_holidayservice_, $injector) {
    holidayservice = _holidayservice_;
    datafetcher = $injector.get('$datafetcher');
  }));

  describe('Intialization', function () {
    it('should have \'getHolidays\' function', function () {
      expect(holidayservice.getHolidays).toBeDefined();
    });
    it('should have a \'holidaysInMonth\' function', function () {
      expect(holidayservice.holidaysInMonth).toBeDefined();
    });
    it('should have a \'daysToNextHoliday\' function', function () {
      expect(holidayservice.daysToNextHoliday).toBeDefined();
    });
  });

  describe('Getting holidays', function () {
    var route = 'holidays/isl/';

    beforeEach(function () {
      spyOn(datafetcher, 'get');
    });

    it('should get holidays for the current year if the \'until\' date is not provided', function () {
      var year = moment().year();
      holidayservice.getHolidays();
      expect(datafetcher.get).toHaveBeenCalled();
      expect(datafetcher.get).toHaveBeenCalledWith(API_URL + route + year + '/' + year);
    });

    it('should get holidays until the \'range.to\' date', function () {
      var fromYear = 2013,
          toYear = 2014;
      holidayservice.getHolidays(fromYear, toYear);
      expect(datafetcher.get).toHaveBeenCalled();
      expect(datafetcher.get).toHaveBeenCalledWith(API_URL + route + fromYear + '/' + toYear);
    });
  });

  describe('Counting and countdown to holidays', function () {
    var currDate, holidays;

    beforeEach(function () {
      currDate = moment('2014-06-06');
      holidays = [
        { holidayDate: '2014-01-17' },
        { holidayDate: '2014-06-17' },
        { holidayDate: '2014-06-18' },
        { holidayDate: '2014-07-18' }
      ];
    });

    it('should return the holidays in a given month', function () {
      var result = holidayservice.holidaysInMonth(currDate, holidays);
      expect(result.length).toBe(2);
    });

    it('should count down to holidays correctly', function () {
      expect(holidayservice.daysToNextHoliday(currDate, holidays)).toBe(11);
    });
  });
});
