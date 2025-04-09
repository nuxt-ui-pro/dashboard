/*!***************************************************
 * datatables.mark.js
 * https://github.com/julmot/datatables.mark.js
 * Copyright (c) 2016–2018, Julian Kühnel
 * Released under the MIT license https://git.io/voRZ7
 *****************************************************/
'use strict';
describe('basic', function() {

  describe('with boolean option', function() {
    var $ctx, dtInstance;
    beforeEach(function() {
      loadFixtures('basic.html');

      $ctx = $('#context');
      dtInstance = $ctx.find('table').DataTable({
        mark: true
      });
      // simulate filter search term "a"
      $ctx.find('.dataTables_filter input[type=\'search\']')
        .focus()
        .val('a')
        .trigger('keyup');
    });
    afterEach(function() {
      dtInstance.destroy();
    });
    it('should wrap matches', function() {
      expect($ctx.find('mark')).toHaveLength(34);
      var textOpts = ['A', 'a'];
      $ctx.find('mark').each(function() {
        expect($.inArray($(this).text(), textOpts)).toBeGreaterThan(-1);
      });
    });
    it('should not wrap matches in the not found row', function() {
      dtInstance.search('no matching').draw();
      expect($ctx.find('mark')).toHaveLength(0);
    });
  });

  describe('with default boolean option', function() {
    var $ctx, dtInstance;
    beforeEach(function() {
      loadFixtures('basic.html');

      $ctx = $('#context');
      $.extend(true, $.fn.dataTable.defaults, {
        mark: true
      });
      dtInstance = $ctx.find('table').DataTable();
      // simulate filter search term "a"
      $ctx.find('.dataTables_filter input[type=\'search\']')
        .focus()
        .val('a')
        .trigger('keyup');
    });
    afterEach(function() {
      dtInstance.destroy();
      delete $.fn.dataTable.defaults.mark;
    });
    it('should wrap matches', function() {
      expect($ctx.find('mark')).toHaveLength(34);
      var textOpts = ['A', 'a'];
      $ctx.find('mark').each(function() {
        expect($.inArray($(this).text(), textOpts)).toBeGreaterThan(-1);
      });
    });
  });

  describe('with object option', function() {
    var $ctx, dtInstance;
    beforeEach(function() {
      loadFixtures('basic.html');

      $ctx = $('#context');
      dtInstance = $ctx.find('table').DataTable({
        mark: {
          element: 'span',
          className: 'highlight'
        }
      });
      // simulate filter search term "a"
      $ctx.find('.dataTables_filter input[type=\'search\']')
        .focus()
        .val('a')
        .trigger('keyup');
    });
    afterEach(function() {
      dtInstance.destroy();
    });
    it('should wrap matches and forward specified options', function() {
      expect($ctx.find('span.highlight')).toHaveLength(34);
      expect($ctx.find('mark')).toHaveLength(0);
      var textOpts = ['A', 'a'];
      $ctx.find('mark').each(function() {
        expect($.inArray($(this).text(), textOpts)).toBeGreaterThan(-1);
      });
    });
  });

  describe('with boolean option, column and global search', function() {
    var $ctx, dtInstance;
    beforeEach(function() {
      loadFixtures('basic.html');

      $ctx = $('#context');
      dtInstance = $ctx.find('table').DataTable({
        mark: true
      });
      // simulate filter search term
      dtInstance.column(0).search('A').draw();
      dtInstance.search('Lon').draw();
    });
    afterEach(function() {
      dtInstance.destroy();
    });
    it('should wrap column specific search term matches', function() {
      var $colMark = $ctx.find('table tbody td:first-child mark'),
        textOpts = ['A', 'a'];
      expect($colMark).toHaveLength(16);
      $colMark.each(function() {
        expect($.inArray($(this).text(), textOpts)).toBeGreaterThan(-1);
      });
    });
    it('should wrap global search term matches', function() {
      var $colMark = $ctx.find('table tbody td:not(:first-child) mark');
      expect($colMark).toHaveLength(9);
      $colMark.each(function() {
        expect($(this).text()).toBe('Lon');
      });
    });
  });

  describe('with no option', function() {
    var $ctx, dtInstance;
    beforeEach(function() {
      loadFixtures('basic.html');

      $ctx = $('#context');
      dtInstance = $ctx.find('table').DataTable();
      // simulate filter search term "a"
      $ctx.find('.dataTables_filter input[type=\'search\']')
        .focus()
        .val('a')
        .trigger('keyup');
    });
    afterEach(function() {
      dtInstance.destroy();
    });
    it('should not wrap matches', function() {
      expect($ctx.find('mark')).toHaveLength(0);
    });
  });

  describe('document init trigger not called from DataTables', function() {
    var errThrown = false;
    beforeEach(function() {
      try {
        $(document).trigger('init');
      } catch (e) {
        errThrown = true;
      }
    });
    it('should not throw an exception', function() {
      expect(errThrown).toBe(false);
    });
  });

});
