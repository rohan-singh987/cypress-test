/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      deleteTestBot(botName: string): Chainable<void>
    }
  }
}

Cypress.Commands.add("deleteTestBot", (botName: string) => {
  if (!botName) {
    throw new Error("Bot name is missing. Make sure botName fixture is loaded.")
  }

  cy.visit("/home")
  cy.get(`[data-test="MyChatbotsCard-${botName}"]`).should("exist")
  cy.get(`[data-test="MyChatbotsCardMenuButton"]`).should("exist").click()
  cy.get(`[data-test="Delete"]`).should("exist").click()
  cy.get(`[data-test="DeleteChatbotConfirmationInput"]`)
    .should("exist")
    .type("DELETE")
  cy.get(`[data-test="DeleteChatbotConfirmationButton"]`)
    .should("exist")
    .click()
})

export {}
