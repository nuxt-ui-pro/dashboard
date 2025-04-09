/*!***************************************************
 * datatables.mark.js
 * https://github.com/julmot/datatables.mark.js
 * Copyright (c) 2016–2018, Julian Kühnel
 * Released under the MIT license https://git.io/voRZ7
 *****************************************************/
'use strict';
describe('interval', function() {

  describe('with 500 rows per page', function() {
    var $ctx;
    beforeEach(function() {
      loadFixtures('interval.html');

      $ctx = $('#context');
      $ctx.find('table').DataTable({
        lengthMenu: [
          [500, 1000, -1],
          [500, 1000, 'All']
        ],
        mark: true
      });

      // simulate filter search term "a"
      $ctx.find('.dataTables_filter input[type=\'search\']')
        .focus()
        .val('a')
        .trigger('keyup');
    });
    it('should only mark after a certain interval', function(done) {
      expect($ctx.find('mark')).toHaveLength(0);
      setTimeout(function() {
        expect($ctx.find('mark')).toExist();
        done();
      }, 1000);
    });
  });

});
