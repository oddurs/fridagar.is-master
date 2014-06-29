'use strict';

angular.module('fridagarApp')
  .filter('momentdate', function () {
    return function (input, formatString) {
      return moment(input).format(formatString);
    };
  });
