/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      assert_general_settings_elements_exists(configureSidebarItems: {
        general: { description: string }
      }): Chainable<void>

      // Assert Commands
      assert_general_settings_chatbot_title(title: string): Chainable<void>
      assert_general_settings_chatbot_subdomain(
        subdomain: string
      ): Chainable<void>
      assert_general_settings_chatbot_description(
        description: string
      ): Chainable<void>

      // Update Commands
      update_general_settings_chatbot_title(title: string): Chainable<void>
      update_general_settings_chatbot_subdomain(
        subdomain: string
      ): Chainable<void>
      update_general_settings_chatbot_description(
        description: string
      ): Chainable<void>
    }
  }
}

const assert_general_settings_elements_exists = (configureSidebarItems: {
  general: { description: string }
}) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureSectionGeneralTitle"]')
    .should("exist")
    .should("have.value", "Chatbot")
  cy.get('[data-test="ConfigureSectionGeneralChatbotTitle"]').should("exist")
  cy.get('[data-test="ConfigureSectionGeneralDescription"]')
    .should("exist")
    .should("have.value", configureSidebarItems.general.description)
  cy.get('[data-test="ConfigureSectionSaveButton"]').should("exist")
}

const assert_general_settings_chatbot_title = (TestChatbotName: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotTitle"]')
    .should("be.visible")
    .find("input")
    .should("have.value", TestChatbotName)
}

const assert_general_settings_chatbot_subdomain = (subdomain: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotURL"]')
    .should("be.visible")
    .find("input")
    .should("have.value", subdomain)
}

const assert_general_settings_chatbot_description = (description: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotDescription"]')
    .should("be.visible")
    .find("input")
    .should("have.value", description)
}

const update_general_settings_chatbot_title = (title: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotTitle"]')
    .find("input")
    .clear()
    .type(title)
    .should("have.value", title)
}

const update_general_settings_chatbot_subdomain = (subdomain: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotURL"]')
    .find("input")
    .clear()
    .type(subdomain)
    .should("have.value", subdomain)
}

const update_general_settings_chatbot_description = (description: string) => {
  cy.get(
    '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
  ).click()
  cy.get('[data-test="ConfigureGeneralSettingsChatbotDescription"]')
    .find("input")
    .clear()
    .type(description)
    .should("have.value", description)
}

Cypress.Commands.add(
  "assert_general_settings_elements_exists",
  assert_general_settings_elements_exists
)

Cypress.Commands.add(
  "assert_general_settings_chatbot_title",
  assert_general_settings_chatbot_title
)
Cypress.Commands.add(
  "assert_general_settings_chatbot_subdomain",
  assert_general_settings_chatbot_subdomain
)
Cypress.Commands.add(
  "assert_general_settings_chatbot_description",
  assert_general_settings_chatbot_description
)

Cypress.Commands.add(
  "update_general_settings_chatbot_title",
  update_general_settings_chatbot_title
)
Cypress.Commands.add(
  "update_general_settings_chatbot_subdomain",
  update_general_settings_chatbot_subdomain
)
Cypress.Commands.add(
  "update_general_settings_chatbot_description",
  update_general_settings_chatbot_description
)

export {}
