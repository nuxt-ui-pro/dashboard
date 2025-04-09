# datatables.mark.js

##### A DataTables plugin for mark.js to highlight search terms in tables

[![Build Status][build-status-image]][build-status]
[![Greenkeeper][greenkeeper-image]][greenkeeper]
[![npm Version][npm-version-image]][npm-version]
[![Bower Version][bower-version-image]][bower-version]
[![License][license-image]][license]

## Examples

- [DataTables global search highlighting][jsfiddle-datatables]
- [DataTables column search highlighting][jsfiddle-datatables-column]

## Getting Started

datatables.mark.js is a plugin to integrate [mark.js][markjs-website] – a JavaScript keyword highlighter – into DataTables. It detects column specific or global searches and highlights the search term in the table.

### Download

Either clone or [download][zip-download] this plugin manually, or with [npm][npm]:

```bash
$ npm install datatables.mark.js --save-dev
```

Or with [Bower][bower] using:

```bash
$ bower install datatables.mark.js --save-dev
```

### CDN

Alternatively the plugin is also available on the following CDN's:

- [jsDelivr][markjs-jsdelivr]
- [DataTables CDN][datatables-plugins-cdn] listed under plugins -> features. For example the links for DataTables v1.10.13 can be found [here][datatables-plugins-cdn-latest]

Because the DataTables CDN only updates plugins at own releases and you can't specify an explicit plugin version, it's recommended to use jsDelivr.

### Dependencies

This plugin depends on:

- DataTables v1.10.6+
- jQuery v1.7+ (necessary by DataTables)
- mark.js v6.2+ (the [jQuery version][markjs-jquery])

When using a module loader like CommonJS (e.g. Webpack) or AMD (e.g. RequireJS) they will be loaded automatically.

### Integration

Finally, you'll have to embed one of these files:

- _datatables.mark.es6.js_: Uncompressed ES6
- _datatables.mark.es6.min.js_: Compressed ES6 (__recommended when using ES6__)
- _datatables.mark.js_: Uncompressed ES5
- _datatables.mark.min.js_: Compressed ES5 (__recommended when using ES5__)

into your application, by either referencing the file manually using e.g.:

```html
<script src="vendor/datatables.mark.js/dist/datatables.mark.js"></script>
```

or loading it with AMD or CommonJS.

When using RequireJS you should configure the names of dependent modules as
following:

- jQuery must be named "jquery"
- DataTables must be named "datatables.net" (defined by DataTables itself)
- mark.js must be named "markjs"

This is important as datatables.mark.js will load these modules as dependencies.
You might have a look at [this example][jsfiddle-requirejs].

## Usage

### Activation

Activation in the DataTables options:

```javascript
$(".myTable").DataTable({
    mark: true
});
```

Activation by default for all DataTables instances:

```javascript
$.extend(true, $.fn.dataTable.defaults, {
    mark: true
});
```

Activation with custom mark.js options:

```javascript
$(".myTable").DataTable({
    mark: {
        // ... custom option properties, e.g.
        // className: "highlight"
    }
});
```

Please head over to the [mark.js website][markjs-website-mark] for an overview
of possible options.

### Styling

Now that you've activated the plugin you just need to define your custom styles
for the highlighted elements. If you haven't defined a custom `element` or
`className` in the mark.js options the default element will be `mark` without
having a class assigned. If you don't want to have custom styles, you can embed
one of the default CSS files:

- [datatables.mark.css][datatables-mark-css]
- [datatables.mark.min.css][datatables-mark-min-css]

## Contributing

See the [contribution guidelines][contributing].

## Changelog
Changes are documented in [release][releases] descriptions.  

---

Happy hacking!

[build-status]: https://travis-ci.org/julmot/datatables.mark.js
[greenkeeper]: https://github.com/julmot/datatables.mark.js
[bower-version]: https://github.com/julmot/datatables.mark.js
[npm-version]: https://www.npmjs.com/package/datatables.mark.js
[license]: https://raw.githubusercontent.com/julmot/datatables.mark.js/master/LICENSE

[build-status-image]: https://img.shields.io/travis/julmot/datatables.mark.js/master.svg?label=test
[greenkeeper-image]: https://badges.greenkeeper.io/julmot/datatables.mark.js.svg
[npm-version-image]: https://img.shields.io/npm/v/datatables.mark.js.svg
[bower-version-image]: https://img.shields.io/bower/v/datatables.mark.js.svg
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

[zip-download]: https://cdn.jsdelivr.net/gh/julmot/datatables.mark.js/dist/
[npm]: https://www.npmjs.com/
[bower]: https://bower.io/
[markjs-jsdelivr]: https://www.jsdelivr.com/package/npm/datatables.mark.js?path=dist
[datatables-plugins-cdn]: https://cdn.datatables.net/plug-ins/
[datatables-plugins-cdn-latest]: https://cdn.datatables.net/plug-ins/1.10.13/features/
[markjs-jquery]: https://github.com/julmot/mark.js/blob/master/dist/jquery.mark.min.js
[markjs-website]: https://markjs.io/
[markjs-website-mark]: https://markjs.io/#mark
[datatables-mark-css]: https://github.com/julmot/datatables.mark.js/blob/master/dist/datatables.mark.css
[datatables-mark-min-css]: https://github.com/julmot/datatables.mark.js/blob/master/dist/datatables.mark.min.css
[contributing]: https://github.com/julmot/datatables.mark.js/blob/master/CONTRIBUTING.md
[releases]: https://github.com/julmot/datatables.mark.js/releases

[jsfiddle-datatables]: https://jsfiddle.net/julmot/buh9h2r8/
[jsfiddle-datatables-column]: https://jsfiddle.net/julmot/c2am6zfr/
[jsfiddle-requirejs]: https://jsfiddle.net/julmot/5bhpwc8h/
