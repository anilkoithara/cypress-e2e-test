# API and UI Test Using Cypress

Simple UI and integration feature using cypress, for more information about cypress and documentation, go to https://docs.cypress.io

## Prerequisites 

If you’re using npm to install Cypress, please install Node.js 8 or above

Install 

`Node.js`

## Setup and start running the test

### clone the repository

```shell
git clone git@github.com:anilkoithara/cypress-e2e-test.git
```

### Installation

cd into the project folder and run the install command

```shell
npm install
```

### Start Cypress

```shell
npm run cy:open
```
Cypress window will open and then click on the test you want to run

## Tests

| Type | Location                                 |
| ---- | ---------------------------------------- |
| api  | [cypress/tests/api](./cypress/tests/api) |
| ui   | [cypress/tests/ui](./cypress/tests/ui)   |

`heroku-app.spec.js` 
- Contains two scenario - first scenario covers `Test 1:`, and second scenario covers `Test 2:`

`employee-update.spec.js`
- Contains two scenario - first scenario covers `Test 3:` and second scenario cover an unhappy path.

- Base URL and other configuration can viewed inside `cypress.json` file

- You can select the browser to run the test, default browser is `Electron 80 (headless)`

### Run all the tests in headless mode and generate reports follow this steps

```shell
npm install
npm run cy:run
```
- Test will start running one by one and generate xml reports and results files will be available in `\results` folder.
- In case of test failure screenshot will capture automatically and placed in the `cypress\screenshots` folder, and test run `videos` also will be available in the `cypress\videos` folder.


## Framework and Feature improvements

Improvement suggestions and options 

### UI feature improvements 

- We can load the element locators from `support\locators.js` file, 

`export default {
  //Dashboard
  link: "a[href="/challenging_dom"]",
  plus_icon: "[data-testid=new-search-icon]"
  }`

then in test file we can import the file 

`import locators from "../../support/element_locators";`
..........
..........
`cy.(locators.link).should("contain", "Challenging DOM")`

- cucumber

To make test scenarios more readable for products team and stake holder we can add test scenario in `cucumber BDD` format,depends on the need and test clarity.

- more Unhappy test scenario can also be included 

- `Code Coverage` matrix can be also be generated after test completions

- mochawesome reporter can be added to generate nice html reports

- Can add config file to run the test against different environment and url like stage,dev etc.

- Can add test run in mobile browser 
 

 ### API feature improvements

 - `Schema` validation can be added to verify the API response format and structure return from the API calls.
 - Configure to test to load the test data from a `fixture` file.


## Technical debates

- No specific elements identifer for automation for some of the elements.
- Test should also include to verify the results getting updated after clicking on the red button but its a canvas elements unable to verify the text results. May be we can use screen shot testing.
- Under `Test 2:` in the technical test document `click on the Dynamic Loading` step is missing after Navigate to https://the-internet.herokuapp.com/ step.