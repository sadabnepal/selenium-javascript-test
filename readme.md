# Selenium Webdriver Test Framework
This is a sample project that uses selenium, typescript, mocha and chai.

### Requirements
[![NodeJs](https://img.shields.io/badge/-NodeJS%20v%20>=%2016-white?logo=node.js)](https://nodejs.org/en/download/)
[![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?logo=visual-studio-code)](https://code.visualstudio.com/download)

### Getting Started

Clone Repository

```bash
git clone https://github.com/sadabnepal/selenium-javascript-test.git
cd selenium-javascript-test
```

Install packages:

```bash
npm install
```

Setup husky:

```bash
npm run prepare
```

Run tests:

```bash
npm run test
```

Lint & fix

```bash
npm run lint
npm run lint:fix
```

Sample Report
![SampleReport](./assets/report.png)

### Key Features
- Custom types for browser
- Support to run test with all major browser
- Parallel execution with mocha framework
- dotenv to support multiple environment
- eslint linting tools integrated
- husky git hooks for pre-commit checks (eslint)

### learning references:
| topic           | references                                                  |
|-----------------|-------------------------------------------------------------|
| selenium        | https://www.npmjs.com/package/selenium-webdriver            |
| mocha           | https://ricostacruz.com/mocha/                              |
| mocha config    | https://github.com/mochajs/mocha/tree/master/example/config |
| chai            | https://www.chaijs.com                                      |
| report          | https://github.com/adamgruber/mochawesome                   |
| dotenv          | https://www.npmjs.com/package/dotenv                        |
| eslint          | https://eslint.org/docs/latest/use/getting-started          |
| vscode settings | https://code.visualstudio.com/docs/getstarted/settings      |