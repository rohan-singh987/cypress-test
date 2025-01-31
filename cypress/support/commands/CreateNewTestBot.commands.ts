/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      createNewTestBot(botName: string): Chainable<void>
    }
  }
}

const formatDate = () => {
  const now = new Date()
  const day = now.getDate().toString().padStart(2, "0") // Ensures two-digit day
  const month = now.toLocaleString("en-US", { month: "short" }) // "Jan", "Feb", etc.
  const year = now.getFullYear()

  return `${day}${month}${year}`
}

export const generateBotTestData = () => {
  return {
    TestChatbotName: `Test_Bot_${formatDate()}`
  }
}

Cypress.Commands.add("createNewTestBot", (botName: string) => {
  if (!botName) {
    throw new Error("Bot name is missing. Make sure botName fixture is loaded.")
  }

  cy.get('[data-test="createNewChatbotCardButton"]').click()
  cy.wait(1000)
  cy.get('[data-test="createNewChatbotFromScratchButton"]').click()
  cy.wait(1000)
  cy.get('[data-test="createNewChatbotTitleInput"]')
    .find("input")
    .clear()
    .type(botName)
  cy.get('[data-test="createNewChatbotCreateButton"]').click()
  cy.wait(1000)
  const checkElements = () => {
    cy.get('[data-test="MenubarChatbotImage"]', { timeout: 10000 }).should(
      "be.visible"
    )
    cy.get('[data-test="MenubarChatbotTitle"]', { timeout: 10000 }).should(
      "be.visible"
    )
  }
  checkElements()

  cy.get('[data-test="MakeSectionAddGambitButton"]').click()
  cy.get('[data-test="GambitNode"]', { timeout: 10000 }).should("be.visible")

  cy.get('[data-test="MenuBarPublishButton"]')
    .should("exist") // Ensure the button exists
    .then(($btn) => {
      if (!$btn.prop("disabled")) {
        cy.wrap($btn).click() // Click if not disabled
      } else {
        cy.log("Publish button is disabled, cannot click.")
      }
    })

  cy.wait(1000)
  // cy.get('[data-test="MenuBarLaunchButton"]')
  //   .should("exist") // Ensure the button exists
  //   .then(($btn) => {
  //     if (!$btn.prop("disabled")) {
  //       cy.wrap($btn).click() // Click if not disabled
  //     } else {
  //       cy.log("Launch button is disabled, cannot click.")
  //     }
  //   })
})

export {}
