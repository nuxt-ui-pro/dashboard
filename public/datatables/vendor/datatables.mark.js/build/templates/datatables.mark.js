/*!***************************************************
 * datatables.mark.js
 * https://github.com/julmot/datatables.mark.js
 * Copyright (c) 2016–2018, Julian Kühnel
 * Released under the MIT license https://git.io/voRZ7
 *****************************************************/
'use strict';
((factory, window, document) => {
  // start with CommonJS as Webpack will also work for AMD and the required name
  // for RequireJS (AMD) is "markjs" which would be invalid in Webpack (as the
  // node module name is mark.js). RequireJS doesn't support .js ending as it
  // thinks it's a real filename
  if (typeof exports === 'object') {
    const jquery = require('jquery');
    require('datatables.net');
    require('mark.js/dist/jquery.mark.js');
    module.exports = factory(window, document, jquery);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables.net', 'markjs'], jQuery => {
      return factory(window, document, jQuery);
    });
  } else {
    factory(window, document, jQuery);
  }
})((window, document, $) => {
  //<%= module %>
}, window, document);
