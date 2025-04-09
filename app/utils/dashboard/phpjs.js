/**
 * PHP extensions in JavaScript
 *
 * http://phpjs.org/functions
 */

export function php_number_format(number, decimals, decPoint, thousandsSep) { // eslint-disable-line camelcase
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''

  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k)
      .toFixed(prec)
  }

  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }

  return s.join(dec)
}

export function php_bytesToSize(bytes) {
  if (bytes == 0) return '0';
  var k = 1024;
  var sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export function php_str_pad(input, pad_length, pad_string, pad_type) {

  var half = '',
    pad_to_go;

  var str_pad_repeater = function (s, len) {
    var collect = '',
      i;

    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);

    return collect;
  };

  input += '';
  pad_string = pad_string !== undefined ? pad_string : ' ';

  if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
    pad_type = 'STR_PAD_RIGHT';
  }
  if ((pad_to_go = pad_length - input.length) > 0) {
    if (pad_type === 'STR_PAD_LEFT') {
      input = str_pad_repeater(pad_string, pad_to_go) + input;
    } else if (pad_type === 'STR_PAD_RIGHT') {
      input = input + str_pad_repeater(pad_string, pad_to_go);
    } else if (pad_type === 'STR_PAD_BOTH') {
      half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
      input = half + input + half;
      input = input.substr(0, pad_length);
    }
  }

  return input;
}

export function php_sprintf() {
  var regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g
  var args = arguments
  var i = 0
  var format = args[i++]

  var _pad = function (str, len, chr, leftJustify) {
    if (!chr) {
      chr = ' '
    }
    var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr)
    return leftJustify ? str + padding : padding + str
  }

  var justify = function (value, prefix, leftJustify, minWidth, padChar) {
    var diff = minWidth - value.length
    if (diff > 0) {
      // when padding with zeros
      // on the left side
      // keep sign (+ or -) in front
      if (!leftJustify && padChar === '0') {
        value = [
          value.slice(0, prefix.length),
          _pad('', diff, '0', true),
          value.slice(prefix.length)
        ].join('')
      } else {
        value = _pad(value, minWidth, padChar, leftJustify)
      }
    }
    return value
  }

  var _formatBaseX = function (value, base, leftJustify, minWidth, precision, padChar) {
    // Note: casts negative numbers to positive ones
    var number = value >>> 0
    value = _pad(number.toString(base), precision || 0, '0', false)
    return justify(value, '', leftJustify, minWidth, padChar)
  }

  // _formatString()
  var _formatString = function (value, leftJustify, minWidth, precision, customPadChar) {
    if (precision !== null && precision !== undefined) {
      value = value.slice(0, precision)
    }
    return justify(value, '', leftJustify, minWidth, customPadChar)
  }

  // doFormat()
  var doFormat = function (substring, argIndex, modifiers, minWidth, precision, specifier) {
    var number, prefix, method, textTransform, value

    if (substring === '%%') {
      return '%'
    }

    // parse modifiers
    var padChar = ' ' // pad with spaces by default
    var leftJustify = false
    var positiveNumberPrefix = ''
    var j, l

    for (j = 0, l = modifiers.length; j < l; j++) {
      switch (modifiers.charAt(j)) {
        case ' ':
        case '0':
          padChar = modifiers.charAt(j)
          break
        case '+':
          positiveNumberPrefix = '+'
          break
        case '-':
          leftJustify = true
          break
        case "'":
          if (j + 1 < l) {
            padChar = modifiers.charAt(j + 1)
            j++
          }
          break
      }
    }

    if (!minWidth) {
      minWidth = 0
    } else {
      minWidth = +minWidth
    }

    if (!isFinite(minWidth)) {
      throw new Error('Width must be finite')
    }

    if (!precision) {
      precision = (specifier === 'd') ? 0 : 'fFeE'.indexOf(specifier) > -1 ? 6 : undefined
    } else {
      precision = +precision
    }

    if (argIndex && +argIndex === 0) {
      throw new Error('Argument number must be greater than zero')
    }

    if (argIndex && +argIndex >= args.length) {
      throw new Error('Too few arguments')
    }

    value = argIndex ? args[+argIndex] : args[i++]

    switch (specifier) {
      case '%':
        return '%'
      case 's':
        return _formatString(value + '', leftJustify, minWidth, precision, padChar)
      case 'c':
        return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar)
      case 'b':
        return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar)
      case 'o':
        return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar)
      case 'x':
        return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar)
      case 'X':
        return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar)
          .toUpperCase()
      case 'u':
        return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar)
      case 'i':
      case 'd':
        number = +value || 0
        // Plain Math.round doesn't just truncate
        number = Math.round(number - number % 1)
        prefix = number < 0 ? '-' : positiveNumberPrefix
        value = prefix + _pad(String(Math.abs(number)), precision, '0', false)

        if (leftJustify && padChar === '0') {
          // can't right-pad 0s on integers
          padChar = ' '
        }
        return justify(value, prefix, leftJustify, minWidth, padChar)
      case 'e':
      case 'E':
      case 'f': // @todo: Should handle locales (as per setlocale)
      case 'F':
      case 'g':
      case 'G':
        number = +value
        prefix = number < 0 ? '-' : positiveNumberPrefix
        method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(specifier.toLowerCase())]
        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(specifier) % 2]
        value = prefix + Math.abs(number)[method](precision)
        return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]()
      default:
        // unknown specifier, consume that char and return empty
        return ''
    }
  }

  try {
    return format.replace(regex, doFormat)
  } catch (err) {
    return false
  }
}

export function php_array_keys(ary) {
  return $.map(ary, function (element, index) {
    return index;
  });
}

export function php_array_values(ary) {
  return $.map(ary, function (element, index) {
    return element;
  });
}

export function php_array_sum(ary) {
  var t = 0;
  $.map(ary, function (element, index) {
    t += element;
  });
  return t;
}

export function php_array_column(ary, column_key) {
  var t = [];
  $.map(ary, function (element, index) {
    t.push(element[column_key]);
  });
  return t;
}

export function php_unique(ary) {
  return $.unique(ary);
}

//function php_substr_count2(str,seq){
//    return str.split(seq).length - 1;
//}
export function php_substr_count(haystack, needle, offset, length) {
  var cnt = 0

  haystack += ''
  needle += ''
  if (isNaN(offset)) {
    offset = 0
  }
  if (isNaN(length)) {
    length = 0
  }
  if (needle.length == 0) {
    return false
  }
  offset--

  while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
    if (length > 0 && (offset + needle.length) > length) {
      return false
    }
    cnt++
  }

  return cnt
}

export function php_trim(str, charlist) {
  var whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000'
  ].join('')
  var l = 0
  var i = 0
  str += ''

  if (charlist) {
    whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
  }

  l = str.length
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }

  l = str.length
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1)
      break
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

export function php_parse_url(str, component) {

  try {
    globalThis.php_js = globalThis.php_js || {}
  } catch (e) {
    globalThis.php_js = {}
  }

  var query
  var ini = (globalThis.php_js && globalThis.php_js.ini) || {}
  var mode = (ini['phpjs.parse_url.mode'] && ini['phpjs.parse_url.mode'].local_value) || 'php'
  var key = [
    'source',
    'scheme',
    'authority',
    'userInfo',
    'user',
    'pass',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'fragment'
  ]
  var parser = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
  }

  var m = parser[mode].exec(str)
  var uri = {}
  var i = 14

  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i]
    }
  }

  if (component) {
    return uri[component.replace('PHP_URL_', '')
      .toLowerCase()]
  }

  if (mode !== 'php') {
    var name = (ini['phpjs.parse_url.queryKey'] &&
      ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey'
    parser = /(?:^|&)([^&=]*)=?([^&]*)/g
    uri[name] = {}
    query = uri[key[12]] || ''
    query.replace(parser, function ($0, $1, $2) {
      if ($1) {
        uri[name][$1] = $2
      }
    })
  }

  delete uri.source
  return uri
}

export function php_parse_str(str, array) {

  var strArr = String(str)
      .replace(/^&/, '')
      .replace(/&$/, '')
      .split('&'),
    sal = strArr.length,
    i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
    postLeftBracketPos, keys, keysLen,
    fixStr = function (str) {
      return decodeURIComponent(str.replace(/\+/g, '%20'))
    }

  if (!array) {
    array = globalThis.window
  }

  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=')
    key = fixStr(tmp[0])
    value = (tmp.length < 2) ? '' : fixStr(tmp[1])

    while (key.charAt(0) === ' ') {
      key = key.slice(1)
    }
    if (key.indexOf('\x00') > -1) {
      key = key.slice(0, key.indexOf('\x00'))
    }
    if (key && key.charAt(0) !== '[') {
      keys = []
      postLeftBracketPos = 0
      for (j = 0; j < key.length; j++) {
        if (key.charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1
        } else if (key.charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push(key.slice(0, postLeftBracketPos - 1))
            }
            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos))
            postLeftBracketPos = 0
            if (key.charAt(j + 1) !== '[') {
              break
            }
          }
        }
      }
      if (!keys.length) {
        keys = [key]
      }
      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j)
        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1)
        }
        if (chr === '[') {
          break
        }
      }

      obj = array
      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '')
          .replace(/['"]$/, '')
        lastIter = j !== keys.length - 1
        lastObj = obj
        if ((key !== '' && key !== ' ') || j === 0) {
          if (obj[key] === undef) {
            obj[key] = {}
          }
          obj = obj[key]
        } else {
          // To insert new dimension
          ct = -1
          for (p in obj) {
            if (obj.hasOwnProperty(p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p
              }
            }
          }
          key = ct + 1
        }
      }
      lastObj[key] = value
    }
  }
}

export function php_http_build_query(formdata, numeric_prefix, arg_separator) {

  var value, key, tmp = [],
    that = this

  var _http_build_query_helper = function (key, val, arg_separator) {
    var k, tmp = []
    if (val === true) {
      val = '1'
    } else if (val === false) {
      val = '0'
    }
    if (val != null) {
      if (typeof val === 'object') {
        for (k in val) {
          if (val[k] != null) {
            tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator))
          }
        }
        return tmp.join(arg_separator)
      } else if (typeof val !== 'function') {
        //return that.urlencode(key) + '=' + that.urlencode(val)
        return encodeURI(key) + '=' + encodeURI(val);
      } else {
        throw new Error('There was an error processing for http_build_query().')
      }
    } else {
      return ''
    }
  }

  if (!arg_separator) {
    arg_separator = '&'
  }
  for (key in formdata) {
    value = formdata[key]
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key
    }
    var query = _http_build_query_helper(key, value, arg_separator)
    if (query !== '') {
      tmp.push(query)
    }
  }

  return tmp.join(arg_separator)
}

//===========================================================================
export function url_append_param(uri, params) {
  var out = {};
  let parse_url = php_parse_url(uri);
  if (parse_url['query'] != undefined) {
    php_parse_str(parse_url['query'], out);
  }
  $.extend(true, out, params);//out=array_merge( out, params );
  return parse_url['path'] + ($.isEmptyObject(out) ? '' : '?') + php_http_build_query(out) + (parse_url.fragment ? '#' + parse_url.fragment : '');
}

export function url_append_param_CI(url_ci, params) {
  //url_append_param()は'?'が必要なので　最後の'/'を'?'にしてCALL
  var m = url_ci.match(/^(.+)\/(.+)$/);
  if (m && m.length == 3) {
    var url = m[1] + '?' + m[2];
    url = url_append_param(url, params).replace('?', '/');
  }
  return url;
}

export function url_remove_param(uri, params) {
  let parse_url = php_parse_url(uri);
  let out = {};
  php_parse_str(parse_url['query'], out);
  delete out.undefined;
  for (var i = 0; i < params.length; i++) {
    delete out[params[i]];
  }
  return parse_url['path'] + ($.isEmptyObject(out) ? '' : '?') + php_http_build_query(out) + (parse_url.fragment ? '#' + parse_url.fragment : '');
}

export function url_remove_param_CI(url_ci, params) {
  //url_append_param()は'?'が必要なので　最後の'/'を'?'にしてCALL
  var m = url_ci.match(/^(.+)\/(.+)$/);
  if (m && m.length == 3) {
    var url = m[1] + '?' + m[2];
    url = url_remove_param(url, params).replace('?', '/');
  }
  return url;
}

//===========================================================================
export function words_split(value, is_or) {
  if (is_or) {
    //左右の空白除去し、全角・半角空白スペース半角につめる
    var words = jQuery.trim(value).replace(/( |　)+/g, ' ');
    words = words.replace(/\|/g, ' ');//'|'削除
  } else {
    //左右の空白除去し、全角・半角空白スペース半角につめる
    var words = jQuery.trim(value).replace(/( &　)+/g, ' ');
    words = words.replace(/\&/g, ' ');//'|'削除
  }
  jQuery.trim(words).replace(/( )+/g, ' ');
  return words.split(" ");
}

export function sscanf(str, format) {
  //  discuss at: http://phpjs.org/functions/sscanf/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Since JS does not support scalar reference variables, any additional arguments to the function will
  //        note: only be allowable here as strings referring to a global variable (which will then be set to the value
  //        note: found in 'str' corresponding to the appropriate conversion specification in 'format'
  //        note: I am unclear on how WS is to be handled here because documentation seems to me to contradict PHP behavior
  //   example 1: sscanf('SN/2350001', 'SN/%d');
  //   returns 1: [2350001]
  //   example 2: var myVar; // Will be set by function
  //   example 2: sscanf('SN/2350001', 'SN/%d', 'myVar');
  //   returns 2: 1
  //   example 3: sscanf("10--20", "%2$d--%1$d"); // Must escape '$' in PHP, but not JS
  //   returns 3: [20, 10]

  // SETUP
  var retArr = [],
    num = 0,
    _NWS = /\S/,
    args = arguments,
    that = this,
    digit;

  var _setExtraConversionSpecs = function (offset) {
    // Since a mismatched character sets us off track from future legitimate finds, we just scan
    // to the end for any other conversion specifications (besides a percent literal), setting them to null
    // sscanf seems to disallow all conversion specification components (of sprintf) except for type specifiers
    // Do not allow % in last char. class
    //var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g);
    var matches = format.slice(offset)
      .match(/%[cdeEufgosxX]/g); // Do not allow % in last char. class;
    // b, F,G give errors in PHP, but 'g', though also disallowed, doesn't
    if (matches) {
      var lgth = matches.length;
      while (lgth--) {
        retArr.push(null);
      }
    }
    return _finish();
  };

  var _finish = function () {
    if (args.length === 2) {
      return retArr;
    }
    for (var i = 0; i < retArr.length; ++i) {
      that.window[args[i + 2]] = retArr[i];
    }
    return i;
  };

  var _addNext = function (j, regex, cb) {
    if (assign) {
      var remaining = str.slice(j);
      var check = width ? remaining.substr(0, width) : remaining;
      var match = regex.exec(check);
      var testNull = retArr[digit !== undefined ? digit : retArr.length] = match ? (cb ? cb.apply(null, match) :
        match[0]) : null;
      if (testNull === null) {
        throw 'No match in string';
      }
      return j + match[0].length;
    }
    return j;
  };

  if (arguments.length < 2) {
    throw 'Not enough arguments passed to sscanf';
  }

  // PROCESS
  for (var i = 0, j = 0; i < format.length; i++) {

    var width = 0,
      assign = true;

    if (format.charAt(i) === '%') {
      if (format.charAt(i + 1) === '%') {
        if (str.charAt(j) === '%') {
          // a matched percent literal
          // skip beyond duplicated percent
          ++i, ++j;
          continue;
        }
        // Format indicated a percent literal, but not actually present
        return _setExtraConversionSpecs(i + 2);
      }

      // CHARACTER FOLLOWING PERCENT IS NOT A PERCENT

      // We need 'g' set to get lastIndex
      var prePattern = new RegExp('^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)', 'g');

      var preConvs = prePattern.exec(format.slice(i + 1));

      var tmpDigit = digit;
      if (tmpDigit && preConvs[1] === undefined) {
        throw 'All groups in sscanf() must be expressed as numeric if any have already been used';
      }
      digit = preConvs[1] ? parseInt(preConvs[1], 10) - 1 : undefined;

      assign = !preConvs[2];
      width = parseInt(preConvs[3], 10);
      var sizeCode = preConvs[4];
      i += prePattern.lastIndex;

      // Fix: Does PHP do anything with these? Seems not to matter
      if (sizeCode) {
        // This would need to be processed later
        switch (sizeCode) {
          case 'h':
          // Treats subsequent as short int (for d,i,n) or unsigned short int (for o,u,x)
          case 'l':
          // Treats subsequent as long int (for d,i,n), or unsigned long int (for o,u,x);
          //    or as double (for e,f,g) instead of float or wchar_t instead of char
          case 'L':
            // Treats subsequent as long double (for e,f,g)
            break;
          default:
            throw 'Unexpected size specifier in sscanf()!';
            break;
        }
      }
      // PROCESS CHARACTER
      try {
        switch (format.charAt(i + 1)) {
          // For detailed explanations, see http://web.archive.org/web/20031128125047/http://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection=
          // Also http://www.mathworks.com/access/helpdesk/help/techdoc/ref/sscanf.html
          // p, S, C arguments in C function not available
          // DOCUMENTED UNDER SSCANF
          case 'F':
            // Not supported in PHP sscanf; the argument is treated as a float, and
            //  presented as a floating-point number (non-locale aware)
            // sscanf doesn't support locales, so no need for two (see %f)
            break;
          case 'g':
            // Not supported in PHP sscanf; shorter of %e and %f
            // Irrelevant to input conversion
            break;
          case 'G':
            // Not supported in PHP sscanf; shorter of %E and %f
            // Irrelevant to input conversion
            break;
          case 'b':
            // Not supported in PHP sscanf; the argument is treated as an integer, and presented as a binary number
            // Not supported - couldn't distinguish from other integers
            break;
          case 'i':
            // Integer with base detection (Equivalent of 'd', but base 0 instead of 10)
            j = _addNext(j, /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/, function (num, sign, hex,
                                                                                            oct, dec) {
              return hex ? parseInt(num, 16) : oct ? parseInt(num, 8) : parseInt(num, 10);
            });
            break;
          case 'n':
            // Number of characters processed so far
            retArr[digit !== undefined ? digit : retArr.length - 1] = j;
            break;
          // DOCUMENTED UNDER SPRINTF
          case 'c':
            // Get character; suppresses skipping over whitespace! (but shouldn't be whitespace in format anyways, so no difference here)
            // Non-greedy match
            j = _addNext(j, new RegExp('.{1,' + (width || 1) + '}'));
            break;
          case 'D':
          // sscanf documented decimal number; equivalent of 'd';
          case 'd':
            // Optionally signed decimal integer
            j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
              // Ignores initial zeroes, unlike %i and parseInt()
              var decInt = parseInt((sign || '') + dec, 10);
              if (decInt < 0) {
                // PHP also won't allow less than -2147483648
                // integer overflow with negative
                return decInt < -2147483648 ? -2147483648 : decInt;
              } else {
                // PHP also won't allow greater than -2147483647
                return decInt < 2147483647 ? decInt : 2147483647;
              }
            });
            break;
          case 'f':
          // Although sscanf doesn't support locales, this is used instead of '%F'; seems to be same as %e
          case 'E':
          // These don't discriminate here as both allow exponential float of either case
          case 'e':
            j = _addNext(j, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function (num, sign, dec) {
              if (dec === '.') {
                return null;
              }
              // Ignores initial zeroes, unlike %i and parseFloat()
              return parseFloat((sign || '') + dec);
            });
            break;
          case 'u':
            // unsigned decimal integer
            // We won't deal with integer overflows due to signs
            j = _addNext(j, /([+-])?(?:0*)(\d+)/, function (num, sign, dec) {
              // Ignores initial zeroes, unlike %i and parseInt()
              var decInt = parseInt(dec, 10);
              if (sign === '-') {
                // PHP also won't allow greater than 4294967295
                // integer overflow with negative
                return 4294967296 - decInt;
              } else {
                return decInt < 4294967295 ? decInt : 4294967295;
              }
            });
            break;
          case 'o':
            // Octal integer // Fix: add overflows as above?
            j = _addNext(j, /([+-])?(?:0([0-7]+))/, function (num, sign, oct) {
              return parseInt(num, 8);
            });
            break;
          case 's':
            // Greedy match
            j = _addNext(j, /\S+/);
            break;
          case 'X':
          // Same as 'x'?
          case 'x':
            // Fix: add overflows as above?
            // Initial 0x not necessary here
            j = _addNext(j, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function (num, sign, hex) {
              return parseInt(num, 16);
            });
            break;
          case '':
            // If no character left in expression
            throw 'Missing character after percent mark in sscanf() format argument';
          default:
            throw 'Unrecognized character after percent mark in sscanf() format argument';
        }
      } catch (e) {
        if (e === 'No match in string') {
          // Allow us to exit
          return _setExtraConversionSpecs(i + 2);
        }
        // Calculate skipping beyond initial percent too
      }
      ++i;
    } else if (format.charAt(i) !== str.charAt(j)) {
      // Fix: Double-check i whitespace ignored in string and/or formats
      _NWS.lastIndex = 0;
      if ((_NWS)
        .test(str.charAt(j)) || str.charAt(j) === '') {
        // Whitespace doesn't need to be an exact match)
        return _setExtraConversionSpecs(i + 1);
      } else {
        // Adjust strings when encounter non-matching whitespace, so they align in future checks above
        // Ok to replace with j++;?
        str = str.slice(0, j) + str.slice(j + 1);
        i--;
      }
    } else {
      j++;
    }
  }

  // POST-PROCESSING
  return _finish();
}

export function php_printf02d(i) {
  return ('0' + String(i)).substr(-2);
}

export function php_location_get_query() {
  let q;
  if (location.search === "") {
    if (location.pathname.indexOf('=') === -1) return {};
    let s = location.pathname.split('/');
    q = s[s.length - 1];
  } else {
    q = php_trim(location.search, "?");
  }
  let o = {};
  php_parse_str(q, o);
  return o;
}

