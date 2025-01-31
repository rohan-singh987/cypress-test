// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands index which contains all command imports
import "./commands/index"

Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  return false
})

// Global beforeEach hook if needed
// beforeEach(() => {
//   // Clear cookies, localStorage etc if needed
//   cy.clearCookies()
//   cy.clearLocalStorage()
// })
