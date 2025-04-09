# Contributing to datatables.mark.js

These are the contributing guidelines of datatables.mark.js. If you are
interested in contributing to mark.js itself, please head over to the
[mark.js][markjs-gh] repository.

## 1. Issues

If you have a question, problem, feature request or found a bug please open an
[issue][issue].

### 1.1 Questions, Problems and Bugs

For each issue please provide:
- What kind of browser and version you are using
- What kind of mark.js version you are using
- A detailed description
- The exact steps to reproduce (bugs and problems)
- A [fiddle][jsfiddle] that demonstrates your issue (if possible)

### 1.2 Feature Requests

Please provide the following information:
- Your use case, why your enhancement is necessary
- How to solve it in your opinion

## 2. Development

### 2.1 General

_Requirements: Latest [NodeJS][nodejs] (including npm) and [Bower][bower] installed._

Before you start developing, you should clone or download this repository and run:

```bash
$ bower install && npm install
```

Now you are ready to develop.

### 2.2 Source Code Documentation

[JSDOC][jsdoc] is being used as an API documentation generator. If you want to
extend this plugin it might be helpful for you to view the documentation first,
to learn more about the internal structure. Simply run:

```bash
$ grunt dist
```

and open the file `./build/doc/index.html`.

### 2.3 ES6 (ES2015) Information

datatables.mark.js was developed in ECMAScript 6. But as most browsers don't
fully support ES6 yet, it has only those features implemented that can be
converted "locally" to ES5 using [Babel][babel] without making a
[polyfill][babel-polyfill] necessary. This means to forgo using generators, Set,
Map, for...of loops etc..  

### 2.4 Grunt Tasks

The project is using [Grunt][grunt] as a base, [Karma][karma] as a task runner
and [Jasmine][jasmine] (with [jasmine-jquery][jasmine-jquery]) as a testing
framework.

| Grunt task | Description                                                      |
|------------|------------------------------------------------------------------|
| dev        | For development. Will run `test` on file changes                 |
| dist       | Triggers `compile`, `test` and creates a JSDOC documentation     |
| compile    | Generates all files in `./dist`                                  |
| lint       | Runs ESLint lint                                                 |
| test       | Runs the test, `lint` and creates test coverage                  |

_Note: Run tasks with `$ grunt [task]` (Replace "[task]" with the actual task name)._

### 2.5 Pull Requests

Pull requests are very much appreciated! :thumbsup:

Please note the following things when doing a pull request:
- Do not change any version
- Add a test if possible
- Reference related issues in the pull request description
- Describe your changes and why they are necessary
  (if not stated in referenced issues)
- When changing the code, please run `$ grunt dist` at the end to generate files
  in `dist/`
- Make sure that you format code to fit the [code style][code-style]

### 2.6 Contribution and License Agreement

If you contribute to this project, you are implicitly allowing your code to be
distributed under [this license][license]. You are also implicitly verifying
that all code is your original work.

__Thank you for contributing!__

[markjs-gh]: https://github.com/julmot/mark.js/
[issue]: https://github.com/julmot/datatables.mark.js/issues/new
[jsfiddle]: https://jsfiddle.net
[nodejs]: https://nodejs.org/en/
[bower]: http://bower.io/
[grunt]: http://gruntjs.com/
[karma]: http://karma-runner.github.io/latest/index.html
[jasmine]: http://jasmine.github.io/
[jasmine-jquery]: https://github.com/velesin/jasmine-jquery
[jsdoc]: http://usejsdoc.org/about-getting-started.html
[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[babel]: https://babeljs.io/
[code-style]: https://github.com/julmot/datatables.mark.js/blob/master/.jsbeautifyrc
[license]: https://github.com/julmot/datatables.mark.js/blob/master/LICENSE
