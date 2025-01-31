const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3ofzwu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/index.js",
  },
});