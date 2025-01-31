/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      selectTestBot(botName: string): Chainable<void>
    }
  }
}

Cypress.Commands.add("selectTestBot", (botName: string) => {
  if (!botName) {
    throw new Error("Bot name is missing. Make sure botName fixture is loaded.")
  }

  cy.visit("/home")
  cy.get(`[data-test="MyChatbotsCard-${botName}"]`).should("exist")
  cy.get(`[data-test="MyChatbotsCard-${botName}"]`).first().click()
})

export {}
