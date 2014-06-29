'use strict';

describe('Filter: momentdate', function () {

  // load the filter's module
  beforeEach(module('fridagarApp'));

  // initialize a new instance of the filter before each test
  var momentdate;
  beforeEach(inject(function ($filter) {
    momentdate = $filter('momentdate');
  }));

  it('should return the input prefixed with "momentdate filter:"', function () {
    var date = moment('2014-06-06');
    var format = 'DD';
    expect(momentdate(date, format)).toBe('06');
  });

});
